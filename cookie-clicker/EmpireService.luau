-- A saved player outbox makes empire donations retryable without a second charge.
local EmpireService={}
function EmpireService.new(empireStore,persistence)
    local service={}
    local function apply(session,record)
        session.empire=record
        session.state.economy.empireLevel=record and record.level or 0
    end
    function service.refresh(session,userId)
        local e=session.state.economy
        local id=e.empireId
        if not id then apply(session,nil);return end
        local r=empireStore.read(id)
        if session.closing or e.empireId~=id then return end
        if r then
            local member=r.members[tostring(userId)]
            if member and member.active then
                apply(session,r)
                e.empireSequence=math.max(e.empireSequence or 0,member.lastSequence or 0)
            elseif not e.empireDonation then
                -- A successful read can prove that a saved membership is stale.
                -- A failed read cannot: preserve the cache until the next retry.
                e.empireId=nil;apply(session,nil)
            end
        end
        return r
    end
    function service.resume(session,userId)
        local e=session.state.economy
        local pending=e.empireDonation
        if not pending then return true end
        -- Save the debit and its operation sequence before touching the shared record.
        if not persistence.save(session,false) then return false,"Donation is waiting for your save. It will retry." end
        if session.closing or not session.ready then return false,"Donation will finish when you rejoin." end
        local record,message=empireStore.donate(pending.empireId,userId,pending.sequence,pending.amount)
        if not record then return false,message end
        apply(session,record)
        e.empireDonation=nil
        -- Do not permit a leave/new donation until clearing the outbox is durable.
        session.empireFinalizing=true
        if not persistence.save(session,false) then return false,"Donation received. Finishing your save..." end
        session.empireFinalizing=false
        return true,"Your stamina helped the empire!"
    end
    function service.finish(session)
        if not session.empireFinalizing then return true end
        if not persistence.save(session,false) then return false end
        session.empireFinalizing=false;return true
    end
    function service.action(session,userId,action,arg,extra)
        local e=session.state.economy
        if e.empireDonation or session.empireFinalizing then return false,"Your last donation is still saving." end
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
        if action=="create" then
            if e.empireId then return false,"You already belong to an empire." end
            record,message=empireStore.create(userId,arg,extra)
            if record then e.empireId=userId end
        elseif action=="join" then
            if e.empireId then return false,"Leave your current empire first." end
            record,message=empireStore.join(arg,userId)
            if record then e.empireId=arg end
        elseif action=="leave" then
            if not e.empireId then return false,"You do not belong to an empire." end
            record,message=empireStore.leave(e.empireId,userId)
            if record then e.empireId=nil;apply(session,nil);persistence.save(session,false);return true,"You left the empire." end
        elseif action=="upgrade" then record,message=empireStore.upgrade(e.empireId,userId,arg)
        elseif action=="rename" then record,message=empireStore.rename(e.empireId,userId,arg,extra)
        else return false,"Unknown empire action." end
        if not record then return false,message end
        apply(session,record)
        local member=record.members[tostring(userId)]
        if member then e.empireSequence=math.max(e.empireSequence or 0,member.lastSequence or 0) end
        persistence.save(session,false)
        return true,action=="upgrade" and "Empire leveled up!" or "Your empire is ready!"
    end
    return service
end
return EmpireService
