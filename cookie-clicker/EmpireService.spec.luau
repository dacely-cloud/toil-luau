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
