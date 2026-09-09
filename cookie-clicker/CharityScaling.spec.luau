local Model=require("./Model")
local Store=require("./CharityStore")
local Service=require("./CharityService")
local function near(a,b)assert(math.abs(a-b)<=math.max(1,math.abs(b))*1e-12,tostring(a).." ~= "..tostring(b))end
for _,building in {6,12,20} do
    for tierIndex,tier in Model.Fundraisers do
        local s=Model.new();s.buildings[building]=5
        local rate=Model.deliveryAmount(s,{Min=0,Seconds=1})
        local cost=Model.fundraiserCost(s,tierIndex)
        near(cost,rate*tier.seconds*.1)
        -- Temporary bonuses must not make an agreed investment unaffordable.
        s.frenzyUntil=100;s.gardenBoostUntil=100;s.friendCount=10
        assert(Model.fundraiserCost(s,tierIndex)==cost)
        s.cookies=cost*2
        assert(Model.economyAction(s,"deposit",s.cookies))
        assert(s.economy.jar>=cost)
        local records,saved={},nil
        local lost=true
        local shared=Store.new(Model,{UpdateAsync=function(_,key,fn)
            local record=fn(records[key]);if record then records[key]=record end
            if lost then error("lost response") end
            return record
        end})
        local now=100
        local service=Service.new(Model,shared,{save=function(session)saved=Model.snapshot(session.state);return true end},function()return now end)
        local session={state=s,ready=true}
        local jar=s.economy.jar
        assert(not service.action(session,1,"start",tierIndex))
        near(s.economy.jar,jar-cost)
        local restored={state=Model.new(),ready=true}
        Model.restoreEconomy(restored.state,saved)
        near(restored.state.economy.jar,jar-cost)
        assert(restored.state.economy.charityPending.cost==cost)
        lost=false;assert(service.resume(restored,1))
        assert(restored.state.economy.charity.cost==cost)
        now+=tier.seconds
        assert(service.action(restored,1,"claim"))
        near(restored.state.cookies,math.floor(cost*tier.multiplier))
        near(restored.state.earned,cost*(tier.multiplier-1))
        assert(not service.action(restored,1,"claim"))
        -- Legacy single-player funds also survive the higher monetary range.
        local legacy=Model.new()
        Model.restoreSocial(legacy,{economy={charity={tier=tierIndex,cost=cost,endsAt=100,pot=math.floor(cost*tier.multiplier),stolen=0}}})
        assert(legacy.economy.charity and legacy.economy.charity.cost==cost)
    end
end
local s=Model.new();s.economy.properties.market=100
assert(Model.fundraiserCost(s,1)>500,"property earnings must contribute")
assert(not Model.economyAction(s,"deposit",math.huge))
assert(not Model.economyAction(s,"deposit",Model.Balance.MaxJarCookies*2))
print("PASS charity scaling: all durations across bank/time-machine/final-building production, large deposits, save/replay, fixed stakes and profit-only claims")
