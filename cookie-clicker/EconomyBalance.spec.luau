local Model=require("./Model")
local Persistence=require("./Persistence")
local function near(a,b)assert(math.abs(a-b)<=math.max(1,math.abs(a),math.abs(b))*1e-12,tostring(a).." ~= "..b)end
-- Every quoted building quantity must equal the corresponding transaction.
for i=1,#Model.Buildings do
    for _,quantity in {1,10,100} do
        local s=Model.new();local quoted=Model.price(s,i,quantity,false);s.cookies=quoted
        assert(Model.trade(s,i,quantity,false));assert(s.buildings[i]==quantity)
        assert(math.abs(s.cookies)<=math.max(1,quoted)*1e-12,"charge diverged from quote")
        s.cookies=0
        local quote=Model.price(s,i,quantity,true)
        assert(Model.trade(s,i,quantity,true));near(s.cookies,quote);assert(s.earned==0)
    end
    local cap=Model.Balance.MaxBuildingBasePayback*Model.Balance.BuildingPaybackGrowth^math.max(0,i-Model.Balance.BuildingPaybackGrowthStart)
    assert(Model.Buildings[i].price/Model.Buildings[i].cps<=cap*(1+1e-12))
end
-- Taps grant predictable XP without retroactive grants or reset farming.
local s=Model.new()
for _=1,9 do Model.click(s) end
assert(s.economy.xp==0)
local saved=Model.snapshot(s)
local store={UpdateAsync=function(_,_,callback)saved=callback(saved);return saved end}
local persistence=Persistence.new(Model,store,{now=function()return 100 end,wait=function()end})
local session=assert(persistence.load("balance","test"));s=session.state
Model.click(s);assert(s.economy.xp==1 and s.economy.tapXpProgress==0)
-- Selling invested cookies cannot manufacture lifetime baking or rebirth stars.
s=Model.new();s.cookies=1e9;s.buildings[6]=1
assert(Model.advancedAction(s,"stockBuy",{index=1,quantity=1000}))
local basis=s.stockCosts[1]
assert(Model.advancedAction(s,"stockSell",{index=1,quantity=500}))
near(s.stockCosts[1],basis/2);assert(s.earned==0)
local restored=Model.new();restored.played=s.played;Model.restoreAdvanced(restored,Model.snapshot(s))
near(restored.stockCosts[1],basis/2);assert(restored.stocks[1]==500)
s=Model.new();s.cookies=1e9;s.buildings[6]=1;s.played=150
local price=Model.stockPrice(s,1)
assert(Model.advancedAction(s,"stockBuy",{index=1,quantity=1000}))
local profit
for t=180,600,30 do
    s.played=t;profit=math.floor(Model.stockPrice(s,1)*.9)*1000-price*1000
    if profit>0 then break end
end
assert(profit>0);assert(Model.advancedAction(s,"stockSell",{index=1,quantity=1000}))
near(s.earned,profit);near(s.cookies,1e9+profit);assert(s.stockCosts[1]==0)
-- Job rewards remain useful and temporary boosts cannot inflate the payout.
s=Model.new();local job=Model.Jobs[4]
local low=Model.jobReward(s,job);s.buildings[6]=100
local high=Model.jobReward(s,job);assert(high>low)
s.friendCount=20;s.frenzyUntil=100;s.gardenBoostUntil=100
assert(Model.jobReward(s,job)==high)
-- A huge cookie bank cannot turn a lucky cookie into unlimited compounding.
s=Model.new();s.cookies=1e20;s.buildings[2]=100;s.played=75;Model.goldenTick(s)
local before=s.earned;assert(Model.collectGolden(s,s.goldenId))
assert(s.earned-before<=100*180)
-- Collections benefit baking once; duplicate refunds cannot create XP or baking.
s=Model.new();s.buildings[2]=1;s.cookies=1e6
local base=Model.cps(s)
for _,item in Model.Items do
    s.economy.inventory[item.id]=1
    assert(Model.economyAction(s,"collect",item.id))
    assert(not Model.economyAction(s,"collect",item.id))
end
near(Model.cps(s),base*1.38)
local bank=s.cookies;before=s.earned
assert(Model.economyAction(s,"item","spatula"))
assert(Model.economyAction(s,"sellItem","spatula"))
assert(s.cookies==bank-250+62 and s.earned==before)
assert(not Model.economyAction(s,"sellItem","spatula"))
assert(not Model.economyAction(s,"sellItem","goldenWhisk"))
print("PASS balance: all building quotes, bounded payback, tap XP persistence, stock principal/profit, scaled jobs and bounded golden rewards")
