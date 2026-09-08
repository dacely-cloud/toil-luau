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
