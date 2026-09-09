local Model=require("./Model")
local EmpireStore=require("./EmpireStore")
local EmpireService=require("./EmpireService")
local Roster=require("./EmpireRoster")
local data={};local loseResponse=false
local store={UpdateAsync=function(_,key,fn)local next=fn(data[key]);if next then data[key]=next end;if loseResponse then error("response lost") end;return next end}
local shared=EmpireStore.new(store)
local failSave=false
local persistence={save=function()return not failSave end}
local service=EmpireService.new(shared,persistence)
local owner={ready=true,state=Model.new()}
local member={ready=true,state=Model.new()}
local other={ready=true,state=Model.new()}
local function resolve(id)return "Player "..id,id==1 end
assert(service.action(owner,1,"create","Cookie Team","cookie"))
assert(#Roster.observe(owner,1,owner.empire,resolve)==0,"initial roster must not spam join notices")
assert(service.action(member,2,"join",1))
local joined=shared.read(1)
local messages=Roster.observe(owner,1,joined,resolve)
assert(#messages==1 and messages[1]=="Player 2 joined Cookie Team!")
assert(#Roster.observe(owner,1,joined,resolve)==0,"duplicate revision must not repeat join notice")
local rows=Roster.members(joined,resolve)
assert(#rows==2 and rows[1].id==1 and rows[1].owner and rows[1].online and not rows[2].online)
assert(not service.action(member,2,"remove",1))
assert(not service.action(other,3,"remove",2))
for _,bad in {1,{},0/0,math.huge,2.5,"2",999} do assert(not service.action(owner,1,"remove",bad)) end
assert(service.action(member,2,"donate",25));assert(shared.read(1).points==25)
assert(service.action(owner,1,"remove",2))
local removed=shared.read(1)
assert(not removed.members["2"].active and removed.members["2"].lastSequence==1 and removed.members["2"].donated==25)
Roster.observe(member,2,joined,resolve)
assert(service.acceptRecord(member,2,removed));assert(not member.state.economy.empireId and Model.empireBonus(member.state)==0)
assert(#Roster.observe(member,2,member.empire,resolve)==1)
assert(#Roster.members(removed,resolve)==1)
-- Removal is not a ban: joining again retains lifetime donation history.
assert(service.action(member,2,"join",1));assert(member.state.economy.empireSequence==1)
-- A donation that was never credited is refunded exactly once after removal.
failSave=true;assert(not service.action(member,2,"donate",25));failSave=false
assert(member.state.economy.stamina==50)
assert(service.action(owner,1,"remove",2));service.refresh(member,2)
assert(Model.empireBonus(member.state)==0)
assert(not service.resume(member,2));assert(member.state.economy.stamina==75 and not member.state.economy.empireDonation)
assert(service.resume(member,2));assert(member.state.economy.stamina==75)
service.refresh(member,2);assert(not member.state.economy.empireId)
-- A committed donation whose response was lost must never be refunded.
assert(service.action(member,2,"join",1))
loseResponse=true;assert(not service.action(member,2,"donate",25));loseResponse=false
assert(shared.read(1).points==50)
assert(service.action(owner,1,"remove",2));service.refresh(member,2)
assert(service.resume(member,2));assert(member.state.economy.stamina==50 and not member.state.economy.empireId)
assert(shared.read(1).points==50 and not member.state.economy.empireDonation)
print("PASS empire management: owner permissions, invalid targets, owner protection, roster roles/presence, one-time join/removal notices, removed perks, and donation races")
