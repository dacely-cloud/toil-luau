local CharityService={}
function CharityService.new(Model,store,persistence,now)
    local service={}
    local function summary(record)
        return {tier=record.tier,endsAt=record.endsAt,pot=record.pot,stolen=record.stolen}
    end
    function service.refresh(session,userId)
        local e=session.state.economy;local ref=e.charityRef
        if not ref and e.charity and not e.charityPending then
            e.charitySequence=(e.charitySequence or 0)+1
            ref={sequence=e.charitySequence};e.charityRef=ref
        end
        if not ref then return end
        local record=store.read(userId,ref.sequence)
        if not record and e.charity and not e.charityPending then
            if not persistence.save(session,false) then return end
            record=store.import(userId,ref.sequence,e.charity,Model.empireBonus(session.state))
        end
        if e.charityRef==ref and not session.closing and record and not record.claimed then e.charity=summary(record) end
    end
    function service.resume(session,userId)
        local s=session.state;local e=s.economy;local pending=e.charityPending
        if session.charityFinalizing then
            if not persistence.save(session,false) then return false,"Finishing your save..." end
            session.charityFinalizing=false;return true,"Saved!"
        end
        if not pending then return true end
        if not persistence.save(session,false) then return false,"Waiting for your save. Your action will retry." end
        if session.closing or not session.ready then return false,"This will finish when you rejoin." end
        local record,message,definite
        if pending.kind=="start" then record,message,definite=store.create(userId,pending.fundSequence,pending.tier,pending.startedAt,pending.insurance)
        elseif pending.kind=="claim" then record,message,definite=store.claim(userId,pending.fundSequence,pending.operation,now())
        else record,message,definite=store.visit(pending.owner,pending.fundSequence,userId,pending.operation,pending.kind,now(),pending.bonus) end
        if not record and not definite then return false,message end
        if not record then
            if pending.kind=="start" then e.jar+=pending.cost
            elseif pending.kind=="help" or pending.kind=="steal" then e.stamina=math.min(100,e.stamina+pending.cost) end
        elseif pending.kind=="start" then
            e.charityRef={sequence=pending.fundSequence};e.charity=summary(record)
            message="Your fundraiser is growing!"
        elseif pending.kind=="claim" then
            local receipt=record.claimed
            s.cookies+=math.min(receipt.cookies,receipt.principal)
            Model.award(s,math.max(0,receipt.cookies-receipt.principal))
            e.charityRef=nil;e.charity=nil
            message="Collected "..receipt.cookies.." cookies!"
        else
            local receipt=record.visitors[tostring(userId)][pending.kind]
            Model.award(s,receipt.cookies);e.xp+=receipt.xp
            message="+"..receipt.cookies.." cookies"..(receipt.xp>0 and " and +"..receipt.xp.." XP!" or "!")
        end
        -- Credit and clearing the operation are one player-save snapshot.
        e.charityPending=nil;session.charityFinalizing=true
        if not persistence.save(session,false) then return false,"Your reward is safe here. Finishing the save..." end
        session.charityFinalizing=false
        return record~=nil,message
    end
    function service.action(session,userId,kind,arg,targetRef)
        local e=session.state.economy
        if e.charityPending or session.charityFinalizing then return false,"Your last action is still saving." end
        if (e.charitySequence or 0)>=1e12 then return false,"Action limit reached." end
        local operation=(e.charitySequence or 0)+1
        local pending={kind=kind,operation=operation}
        if kind=="start" then
            local tier=type(arg)=="number" and arg%1==0 and Model.Fundraisers[arg]
            if not tier or e.charity or e.charityRef then return false,"Collect your fundraiser or choose a duration." end
            if e.jar<tier.cost then return false,"Put "..tier.cost.." cookies in your jar first." end
            pending.cost=tier.cost;pending.tier=arg;pending.startedAt=now();pending.insurance=math.min(.75,Model.empireBonus(session.state))
            pending.fundSequence=operation;e.jar-=tier.cost
        elseif kind=="claim" then
            if not e.charityRef then return false,"Start a fundraiser first." end
            pending.owner=userId;pending.fundSequence=e.charityRef.sequence
        elseif kind=="help" or kind=="steal" then
            if type(arg)~="number" or arg==userId or type(targetRef)~="table" then return false,"Choose another player." end
            pending.cost=kind=="help" and 5 or 10
            if e.stamina<pending.cost then return false,"Not enough stamina yet." end
            pending.owner=arg;pending.fundSequence=targetRef.sequence;pending.bonus=Model.empireBonus(session.state)
            e.stamina-=pending.cost
        else return false,"Unknown fundraiser action." end
        e.charitySequence=operation;e.charityPending=pending
        return service.resume(session,userId)
    end
    return service
end
return CharityService
