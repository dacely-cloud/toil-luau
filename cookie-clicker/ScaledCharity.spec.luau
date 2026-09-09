local Model=require("./Model")
local CharityStore=require("./CharityStore")
local CharityService=require("./CharityService")
local records,playerSave={},nil
local lost=false
local shared=CharityStore.new(Model,{UpdateAsync=function(_,key,fn)
    local result=fn(records[key]);if result then records[key]=result end
    if lost then error("lost response") end
    return result
end})
local now=100
local service=CharityService.new(Model,shared,{save=function(session)playerSave=Model.snapshot(session.state);return true end},function()return now end)
local session={state=Model.new(),ready=true}
session.state.buildings[6]=10
local cost=Model.fundraiserCost(session.state,1)
assert(cost>500 and cost<=1e12)
session.state.economy.jar=cost
lost=true
assert(not service.action(session,1,"start",1))
assert(session.state.economy.jar==0 and session.state.economy.charityPending.cost==cost)
assert(records.fund_1_1.cost==cost and records.fund_1_1.pot==math.floor(cost*1.5))
-- Replay after a changed bakery still uses exactly the debit that was saved.
local resumed={state=Model.new(),ready=true}
Model.restoreEconomy(resumed.state,playerSave)
assert(resumed.state.economy.charityPending.cost==cost)
lost=false;assert(service.resume(resumed,1))
assert(resumed.state.economy.charity.cost==cost)
now=1900
assert(service.action(resumed,1,"claim"))
assert(resumed.state.cookies==math.floor(cost*1.5))
assert(resumed.state.earned==math.floor(cost*1.5)-cost)
assert(not service.action(resumed,1,"claim"))
local legacy=Model.new()
Model.restoreSocial(legacy,{economy={charity={tier=1,endsAt=1000,pot=750,stolen=0}}})
assert(legacy.economy.charity.cost==500,"legacy stake unchanged")
local record=assert(shared.create(2,1,1,100,0,cost))
for id=10,14 do record=assert(shared.visit(2,1,id,1,"steal",101,0)) end
assert(record.stolen==math.floor(cost*.25))
assert(not shared.visit(2,1,20,1,"steal",101,0))
assert(not shared.create(3,1,1,100,0,math.huge))
assert(not shared.create(3,1,1,100,0,499))
print("PASS scaled fundraisers: stake debit/replay, legacy migration, profit-only claims, theft cap, bounds")
