local Model=require("./Model")
local previous=0
for i,b in Model.Buildings do
    local payback=b.price/b.cps
    if i>=3 then assert(payback>=previous,"later building has cheaper base payback") end
    previous=payback
    if i<=6 then assert(b.price==({15,100,1100,12000,130000,1400000})[i],"opening price changed") end
end
assert(Model.Buildings[20].price/Model.Buildings[20].cps>20*86400)
local s=Model.new();s.cookies=1e100
for _,u in Model.Upgrades do
    s.buildings[u.building]=math.max(s.buildings[u.building],u.required)
    local before=Model.clickPower(s)
    assert(Model.buyUpgrade(s,u.id))
    assert(Model.clickPower(s)>=before,"click reward fell after upgrade")
end
print("PASS progressive late-building prices, unchanged opening costs and upgrade click monotonicity")
