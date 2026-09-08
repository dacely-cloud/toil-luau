-- Integrates the actual economy, shared social records and player persistence.
-- This deterministic adapter does not substitute for published-server testing.
local Model=require("./Model")
local Persistence=require("./Persistence")
local EmpireStore=require("./EmpireStore")
local EmpireService=require("./EmpireService")
local CharityStore=require("./CharityStore")
local CharityService=require("./CharityService")
local records={}
local function copy(v)
    if type(v)~="table" then return v end
    local result={};for k,x in v do result[k]=copy(x) end;return result
end
local store={UpdateAsync=function(_,key,callback)
    local value=callback(copy(records[key]))
    if value then records[key]=copy(value) end
    return copy(value)
end}
local now=1000
local persistence=Persistence.new(Model,store,{now=function()return now end,wait=function(dt)now+=dt end})
local empires=EmpireStore.new(store)
local teams=EmpireService.new(empires,persistence)
local funds=CharityStore.new(Model,store)
local charity=CharityService.new(Model,funds,persistence,function()return now end)
local owner=assert(persistence.load("player_101","first"))
local helper=assert(persistence.load("player_102","second"))
local thief=assert(persistence.load("player_103","third"))

-- Earn the startup money through jobs and energy regeneration, without a grant.
for round=1,3 do
    for job=1,20 do assert(Model.economyAction(owner.state,"job","dishes",.99)) end
    Model.tick(owner.state,3000)
end
assert(owner.state.cookies==1800 and owner.state.economy.xp==600)
assert(Model.economyAction(owner.state,"item","spatula"))
assert(Model.economyAction(owner.state,"collect","spatula"))
assert(not Model.economyAction(owner.state,"collect","spatula"))
assert(Model.economyAction(owner.state,"property","stand"))
assert(Model.economyAction(owner.state,"deposit",500))
assert(owner.state.cookies==550 and owner.state.economy.jar==500)

assert(teams.action(owner,101,"create","Cookie Friends","cookie"))
assert(teams.action(helper,102,"join",101))
assert(teams.action(owner,101,"donate",50))
assert(teams.action(helper,102,"donate",50))
assert(not teams.action(helper,102,"upgrade",1), "only the owner upgrades")
assert(teams.action(owner,101,"upgrade",1))
teams.refresh(helper,102)
assert(owner.state.economy.empireLevel==2 and helper.state.economy.empireLevel==2)
assert(empires.read(101).points==0)

assert(charity.action(owner,101,"start",1))
local ref=owner.state.economy.charityRef
assert(charity.action(helper,102,"help",101,ref))
assert(helper.state.cookies==50 and helper.state.economy.xp==20)
assert(helper.state.economy.stamina==45)
assert(charity.action(thief,103,"steal",101,ref))
local stolen=math.floor(500*.05*(1-.02))
assert(thief.state.cookies==stolen and thief.state.economy.stamina==90)
charity.refresh(owner,101)
assert(owner.state.economy.charity.pot==850-stolen)
assert(not charity.action(helper,102,"help",101,ref))
assert(not charity.action(thief,103,"steal",101,ref))

-- Close all sessions and recreate services as a new server would.
for _,session in {owner,helper,thief} do assert(persistence.save(session,true)) end
now+=1800
persistence=Persistence.new(Model,store,{now=function()return now end,wait=function(dt)now+=dt end})
teams=EmpireService.new(EmpireStore.new(store),persistence)
charity=CharityService.new(Model,CharityStore.new(Model,store),persistence,function()return now end)
owner=assert(persistence.load("player_101","rejoin-owner"))
helper=assert(persistence.load("player_102","rejoin-helper"))
thief=assert(persistence.load("player_103","rejoin-thief"))
teams.refresh(owner,101);teams.refresh(helper,102);charity.refresh(owner,101)
assert(math.abs(owner.offlineCookies-1800*1.01*1.02^2)<.00001)
assert(helper.state.cookies==50 and thief.state.cookies==stolen)
local before=owner.state.cookies
assert(charity.action(owner,101,"claim"))
assert(owner.state.cookies==before+850-stolen)
assert(not charity.action(owner,101,"claim"))
assert(owner.state.economy.collection.spatula and owner.state.economy.inventory.spatula==0)
assert(owner.state.economy.properties.stand==1 and owner.state.economy.empireLevel==2)
assert(not persistence.load("player_101","overlapping-session"))
print("PASS three-player jobs, inventory, collection, property, empire donations/upgrade, charity help/theft, save/rejoin, offline income and one-time claim")
