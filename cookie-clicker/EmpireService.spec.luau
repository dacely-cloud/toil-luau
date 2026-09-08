local EmpireStore=require("./EmpireStore")
local EmpireService=require("./EmpireService")
local Model=require("./Model")
local data={};local failWrite=false
local store={UpdateAsync=function(_,key,fn)local r=fn(data[key]);if r then data[key]=r end;if failWrite then error("response lost") end;return r end}
local empires=EmpireStore.new(store)
local failSave=false;local saved
local persistence={save=function(session)if failSave then return false end;saved=Model.snapshot(session.state);return true end}
local service=EmpireService.new(empires,persistence)
local session={state=Model.new(),ready=true}
assert(service.action(session,1,"create","Cookie Team","cookie"))
assert(session.state.economy.empireId==1)
failSave=true
assert(not service.action(session,1,"donate",25))
assert(session.state.economy.stamina==75 and session.state.economy.empireDonation.amount==25)
assert(empires.read(1).points==0)
assert(not service.action(session,1,"donate",25))
failSave=false;failWrite=true
assert(not service.resume(session,1))
assert(data.empire_1.points==25 and saved.economy.empireDonation.amount==25)
failWrite=false
assert(service.resume(session,1))
assert(empires.read(1).points==25 and session.state.economy.stamina==75 and not session.state.economy.empireDonation)
-- Replay the persisted pending operation after a hypothetical crash.
local resumed={state=Model.new(),ready=true}
Model.restoreEconomy(resumed.state,{economy={empireId=1,empireLevel=1,empireSequence=1,stamina=75,empireDonation={empireId=1,sequence=1,amount=25}}})
assert(service.resume(resumed,1))
assert(empires.read(1).points==25 and resumed.state.economy.stamina==75)
assert(Model.clickPower(resumed.state)==1.01)
resumed.state.economy.properties.stand=1
assert(math.abs(Model.propertyIncome(resumed.state)-1.0201)<.00001)
print("PASS empire donation debit-before-credit, save failures, ambiguous responses, crash replay and live economy bonuses")
do
    local member={state=Model.new(),ready=true}
    assert(service.action(member,2,"join",1))
    assert(service.action(member,2,"donate",10))
    assert(empires.leave(1,2))
    service.refresh(member,2)
    assert(member.state.economy.empireId==nil and Model.clickPower(member.state)==1)
    -- Rejoining with an older player save must not reuse an already-receipted sequence.
    member.state.economy.empireSequence=0
    assert(service.action(member,2,"join",1))
    assert(member.state.economy.empireSequence==1)
    local before=empires.read(1).points
    assert(service.action(member,2,"donate",10))
    assert(empires.read(1).points==before+10)
    failWrite=true
    service.refresh(member,2)
    assert(member.state.economy.empireId==1 and Model.clickPower(member.state)==1.01)
    failWrite=false
end
print("PASS stale membership removes perks, read failures preserve membership, and rejoining advances donation sequences")

do
    -- A shared write can commit even when its response is lost. The saved
    -- membership operation must recover both sides before another empire action.
    local owner={state=Model.new(),ready=true}
    failSave=true
    assert(not service.action(owner,20,"create","Saved Team","cookie"))
    assert(data.empire_20==nil and owner.state.economy.empireMembership.kind=="create")
    failSave=false;failWrite=true
    assert(not service.resume(owner,20))
    assert(data.empire_20 and saved.economy.empireMembership.kind=="create")
    local recovered={state=Model.new(),ready=true}
    Model.restoreEconomy(recovered.state,saved)
    assert(not service.action(recovered,20,"join",1))
    failWrite=false
    assert(service.resume(recovered,20))
    assert(recovered.state.economy.empireId==20 and not recovered.state.economy.empireMembership)
    local member={state=Model.new(),ready=true}
    failWrite=true
    assert(not service.action(member,21,"join",20))
    local joined={state=Model.new(),ready=true};Model.restoreEconomy(joined.state,saved)
    failWrite=false
    assert(service.resume(joined,21))
    assert(joined.state.economy.empireId==20 and data.empire_20.members["21"].active)
    failWrite=true
    assert(not service.action(joined,21,"leave"))
    local left={state=Model.new(),ready=true};Model.restoreEconomy(left.state,saved)
    failWrite=false
    service.refresh(left,21)
    assert(left.state.economy.empireMembership, "refresh must preserve an unfinished leave")
    assert(service.resume(left,21))
    assert(not left.state.economy.empireId and not data.empire_20.members["21"].active)
    -- Definitive rejection clears the pending operation, rather than retrying forever.
    assert(not service.action(left,21,"join",999999))
    assert(not left.state.economy.empireMembership)
    assert(not service.action(recovered,20,"leave"))
    assert(recovered.state.economy.empireId==20 and not recovered.state.economy.empireMembership)
    -- A failed final save keeps subsequent actions blocked until the player link is durable.
    local calls=0
    local finalService=EmpireService.new(empires,{save=function()calls+=1;return calls~=2 end})
    local final={state=Model.new(),ready=true}
    assert(not finalService.action(final,22,"join",20))
    assert(final.empireFinalizing and final.state.economy.empireId==20)
    assert(not finalService.action(final,22,"leave"))
    assert(finalService.finish(final) and not final.empireFinalizing)
end
print("PASS empire create/join/leave recovery: initial save failure, lost responses, restored pending operations, final save failure and definitive rejection")

do
    local member={state=Model.new(),ready=true}
    assert(service.action(member,30,"join",20))
    local old=empires.read(20)
    local changed=0
    local broadcasting=EmpireService.new(empires,persistence,function(record)
        changed+=1;service.acceptRecord(member,30,record)
    end)
    local leader={state=Model.new(),ready=true};leader.state.economy.empireId=20
    assert(broadcasting.action(leader,20,"rename","New Team","star"))
    assert(changed==1 and member.empire.name=="New Team")
    assert(member.empire.revision>old.revision)
    assert(not service.acceptRecord(member,30,old))
    assert(member.empire.name=="New Team", "late old responses cannot roll back a newer record")
    local newer=empires.read(20);newer.revision+=1;newer.level=2
    assert(service.acceptRecord(member,30,newer));assert(Model.clickPower(member.state)==1.02)
    member.state.economy.empireId=1
    assert(not service.acceptRecord(member,30,newer), "ignore previous team's updates")
end
print("PASS immediate empire update callback, monotonic revisions, stale response rejection and membership guard")
