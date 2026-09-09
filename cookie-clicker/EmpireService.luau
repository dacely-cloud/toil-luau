-- A saved player outbox makes empire donations retryable without a second charge.
local EmpireService={}
function EmpireService.new(empireStore,persistence,onChanged)
    local service={}
    local function stale(session,record)
        return record and session.empire and record.owner==session.empire.owner and (record.revision or 0)<(session.empire.revision or 0)
    end
    local function apply(session,record)
        if stale(session,record) then return end
        session.empire=record
        session.state.economy.empireLevel=record and record.level or 0
    end
    function service.acceptRecord(session,userId,record)
        local e=session.state.economy
        if session.closing or not session.ready or e.empireMembership or not record or e.empireId~=record.owner or stale(session,record) then return false end
        local member=record.members[tostring(userId)]
        if member and member.active then
            apply(session,record)
            e.empireSequence=math.max(e.empireSequence or 0,member.lastSequence or 0)
        else
            if not e.empireDonation then e.empireId=nil end
            apply(session,nil)
        end
        return true
    end
    function service.refresh(session,userId)
        local e=session.state.economy
        local id=e.empireId
        if e.empireMembership then return end
        if not id then apply(session,nil);return end
        local r=empireStore.read(id)
        service.acceptRecord(session,userId,r)
        return r
    end
    function service.resume(session,userId)
        local e=session.state.economy
        local membership=e.empireMembership
        if membership then
            if not persistence.save(session,false) then return false,"Your empire change is waiting for your save." end
            if session.closing or not session.ready then return false,"Your empire change will finish when you rejoin." end
            local record,message,retry
            if membership.kind=="create" then record,message,retry=empireStore.create(userId,membership.name,membership.badge)
            elseif membership.kind=="join" then record,message,retry=empireStore.join(membership.empireId,userId)
            else record,message,retry=empireStore.leave(membership.empireId,userId) end
            if not record and retry then return false,message end
            if record then
                if membership.kind=="leave" then e.empireId=nil;apply(session,nil)
                else
                    e.empireId=membership.empireId;apply(session,record)
                    local member=record.members[tostring(userId)]
                    if member then e.empireSequence=math.max(e.empireSequence or 0,member.lastSequence or 0) end
                end
            end
            if record and onChanged then onChanged(record) end
            e.empireMembership=nil
            session.empireFinalizing=true
            if not persistence.save(session,false) then return false,"Finishing your empire save..." end
            session.empireFinalizing=false
            if not record then return false,message end
            return true,membership.kind=="leave" and "You left the empire." or "Your empire is ready!"
        end
        local pending=e.empireDonation
        if not pending then return true end
        -- Save the debit and its operation sequence before touching the shared record.
        if not persistence.save(session,false) then return false,"Donation is waiting for your save. It will retry." end
        if session.closing or not session.ready then return false,"Donation will finish when you rejoin." end
        local record,message,retry=empireStore.donate(pending.empireId,userId,pending.sequence,pending.amount)
        if not record and retry~=false then return false,message end
        if not record then
            -- A removed member's uncredited donation must not remain stuck.
            e.stamina=math.min(100,e.stamina+pending.amount)
        else
            local member=record.members[tostring(userId)]
            if member and member.active then apply(session,record)
            else e.empireId=nil;apply(session,nil) end
            if onChanged then onChanged(record) end
        end
        e.empireDonation=nil
        -- Do not permit a leave/new donation until clearing the outbox is durable.
        session.empireFinalizing=true
        if not persistence.save(session,false) then return false,"Donation received. Finishing your save..." end
        session.empireFinalizing=false
        return record~=nil,record and "Your stamina helped the empire!" or "Donation cancelled. Your stamina was returned."
    end
    function service.finish(session)
        if not session.empireFinalizing then return true end
        if not persistence.save(session,false) then return false end
        session.empireFinalizing=false;return true
    end
    function service.action(session,userId,action,arg,extra)
        local e=session.state.economy
        if e.empireDonation or e.empireMembership or session.empireFinalizing then return false,"Your last empire change is still saving." end
        if action=="donate" then
            if not e.empireId or (arg~=10 and arg~=25 and arg~=50) then return false,"Join an empire and choose an amount." end
            if e.stamina<arg then return false,"Not enough stamina yet." end
            if (e.empireSequence or 0)>=1e12 then return false,"Donation limit reached." end
            e.empireSequence=(e.empireSequence or 0)+1
            e.stamina-=arg
            e.empireDonation={empireId=e.empireId,sequence=e.empireSequence,amount=arg}
            return service.resume(session,userId)
        end
        local record,message
        if action=="create" or action=="join" or action=="leave" then
            if action=="leave" then
                if not e.empireId then return false,"You do not belong to an empire." end
                e.empireMembership={kind=action,empireId=e.empireId}
            else
                if e.empireId then return false,"Leave your current empire first." end
                local id=action=="create" and userId or arg
                if type(id)~="number" or id~=id or id%1~=0 or math.abs(id)>9007199254740991 then return false,"Choose a valid empire." end
                if action=="create" then
                    local validBadge=false
                    for _,badge in {"cookie","crown","star","heart","shield","bakery"} do if extra==badge then validBadge=true end end
                    if type(arg)~="string" or #arg<1 or #arg>96 or not validBadge then return false,"Choose a name and badge." end
                end
                e.empireMembership={kind=action,empireId=id,name=action=="create" and arg or nil,badge=action=="create" and extra or nil}
            end
            return service.resume(session,userId)
        elseif action=="upgrade" then record,message=empireStore.upgrade(e.empireId,userId,arg)
        elseif action=="rename" then record,message=empireStore.rename(e.empireId,userId,arg,extra)
        elseif action=="remove" then record,message=empireStore.remove(e.empireId,userId,arg)
        else return false,"Unknown empire action." end
        if not record then return false,message end
        apply(session,record)
        local member=record.members[tostring(userId)]
        if member then e.empireSequence=math.max(e.empireSequence or 0,member.lastSequence or 0) end
        if onChanged then onChanged(record) end
        persistence.save(session,false)
        return true,action=="upgrade" and "Empire leveled up!" or action=="remove" and "Member removed from the empire." or "Your empire is ready!"
    end
    return service
end
return EmpireService
