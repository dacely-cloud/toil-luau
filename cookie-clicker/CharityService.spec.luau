local Model=require("./Model")
local CharityStore=require("./CharityStore")
local CharityService=require("./CharityService")
local records={};local loseResponse=false
local store={UpdateAsync=function(_,key,fn)local r=fn(records[key]);if r then records[key]=r end;if loseResponse then error("response lost") end;return r end}
local shared=CharityStore.new(Model,store)
local saved={};local failSave=false;local time=100
local persistence={save=function(session)
    if failSave then return false end
    saved[session.id]=Model.snapshot(session.state);return true
end}
local service=CharityService.new(Model,shared,persistence,function()return time end)
local owner={id=1,state=Model.new(),ready=true};owner.state.economy.jar=1000
assert(service.action(owner,1,"start",1))
local ref=owner.state.economy.charityRef
assert(owner.state.economy.jar==500 and shared.read(1,ref.sequence).pot==750)
local helper={id=2,state=Model.new(),ready=true}
failSave=true
assert(not service.action(helper,2,"help",1,ref))
assert(helper.state.economy.stamina==95 and shared.read(1,ref.sequence).pot==750)
failSave=false;loseResponse=true
assert(not service.resume(helper,2))
assert(records['fund_1_1'].pot==850)
loseResponse=false
-- Restore exactly the debit that reached storage, without the unsaved reward.
local restored={id=2,state=Model.new(),ready=true}
Model.restoreEconomy(restored.state,saved[2])
assert(service.resume(restored,2))
assert(restored.state.cookies==50 and restored.state.economy.xp==20 and restored.state.economy.stamina==95)
assert(shared.read(1,ref.sequence).pot==850)
assert(not service.action(restored,2,"help",1,ref))
assert(restored.state.cookies==50 and restored.state.economy.stamina==95)
assert(service.action(restored,2,"steal",1,ref))
assert(restored.state.cookies==75 and shared.read(1,ref.sequence).pot==825)
assert(not service.action(owner,1,"claim"))
time=1900
loseResponse=true
assert(not service.action(owner,1,"claim"))
loseResponse=false
local resumedOwner={id=1,state=Model.new(),ready=true}
Model.restoreEconomy(resumedOwner.state,saved[1]);Model.restoreSocial(resumedOwner.state,saved[1])
assert(service.resume(resumedOwner,1))
assert(resumedOwner.state.cookies==825 and resumedOwner.state.earned==325)
assert(not service.action(resumedOwner,1,"claim"))
assert(shared.read(1,ref.sequence).claimed)
print("PASS fundraiser debit-before-credit, failed saves, response loss, crash recovery, repeated visits, theft conservation and one-time payout")

-- Shared credit may succeed while the final player save fails. Both an in-session
-- retry and a new session restoring the debit must deliver exactly one reward.
do
    local records,playerSaves={},{}
    local writes=0
    local shared=CharityStore.new(Model,{UpdateAsync=function(_,key,fn)
        -- Datastore contention may invoke a callback repeatedly before commit.
        fn(records[key])
        local value=fn(records[key]);if value then records[key]=value end;return value
    end})
    assert(shared.create(10,1,1,100,0))
    local clock=100
    local persistence={save=function(session)
        writes+=1
        if writes==2 then return false end
        playerSaves[session.id]=Model.snapshot(session.state);return true
    end}
    local service=CharityService.new(Model,shared,persistence,function()return clock end)
    for _,crash in {false,true} do
        writes=0
        local id=crash and 12 or 11
        local helper={id=id,state=Model.new(),ready=true}
        assert(not service.action(helper,id,"help",10,{sequence=1}))
        assert(helper.charityFinalizing and helper.state.cookies==50)
        assert(playerSaves[id].cookies==0 and playerSaves[id].economy.charityPending)
        if crash then
            helper={id=id,state=Model.new(),ready=true}
            Model.restoreEconomy(helper.state,playerSaves[id])
            clock=2000 -- Existing receipts must remain recoverable after expiry.
        end
        assert(service.resume(helper,id))
        assert(helper.state.cookies==50 and helper.state.economy.xp==20)
        assert(helper.state.economy.stamina==95 and not helper.charityFinalizing)
        assert(not playerSaves[id].economy.charityPending)
        assert(service.resume(helper,id) and helper.state.cookies==50)
    end
    assert(shared.read(10,1).pot==950 and shared.read(10,1).visits==2)
end
print("PASS final-save failure, session retry, crash after credit, expired receipt recovery and repeated datastore callbacks")
