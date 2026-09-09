-- Run with native Luau from the repository root; all figures use game rules.
local Model=require("../cookie-clicker/Model")
print("BUILDING | base price | base CPS | base payback seconds | 25-owned upgrade payback")
for i,b in Model.Buildings do
    local upgrade
    for _,u in Model.Upgrades do if u.building==i and u.required==25 then upgrade=u end end
    print(string.format("%02d %s | %.6g | %.6g | %.1f | %.1f",i,b.name,b.price,b.cps,b.price/b.cps,upgrade and upgrade.price/(25*b.cps) or -1))
end
print("UPGRADE | id | building | required | cost | click upgrade")
for _,u in Model.Upgrades do print(u.id,Model.Buildings[u.building].name,u.required,u.price,u.click==true) end
print("JOBS | level | energy | cookies | XP | minutes to regenerate cost")
for _,j in Model.Jobs do print(j.id,j.level,j.energy,j.cookies,j.xp,j.energy*Model.Balance.EnergySeconds/60) end
print("PROPERTIES | price | CPS | payback")
for _,p in Model.Properties do print(p.id,p.price,p.income,p.price/p.income) end
print("ITEMS | price | bonus")
for _,v in Model.Items do print(v.id,v.price,v.bonus) end
print("FUNDRAISERS | minutes | cost | net payout before fees/visits | net per second")
for _,f in Model.Fundraisers do print(f.name,f.seconds/60,f.cost,f.cost*(f.multiplier-1),f.cost*(f.multiplier-1)/f.seconds) end
print("PASSES | id | goal")
for _,key in Model.MonetizationConfig.PassOrder do local p=Model.MonetizationConfig.Passes[key];print(key,p.GamePassId,p.Goal) end
print("PRODUCTS | id | goal")
for _,key in Model.MonetizationConfig.ProductOrder do local p=Model.MonetizationConfig.Products[key];print(key,p.ProductId,p.Goal) end
local s=Model.new();s.buildings[6]=1;s.cookies=1e9
local price=Model.stockPrice(s,1)
Model.advancedAction(s,"stockBuy",{index=1,quantity=1000})
local before=s.earned
Model.advancedAction(s,"stockSell",{index=1,quantity=1000})
print("MARKET ROUND TRIP", "cookie loss",1e9-s.cookies,"new earned",s.earned-before,"principal",price*1000)
s=Model.new();s.buildings[2]=100
local iterations=10000
local started=os.clock()
for _=1,iterations do Model.cps(s) end
print("CPS BENCHMARK",iterations,os.clock()-started)
