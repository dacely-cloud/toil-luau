local Model=require("./Model")
local s=Model.new()
assert(Model.economyAction(s,"job","dishes",0))
assert(s.economy.energy==95 and s.economy.xp==10 and s.cookies==30 and s.economy.inventory.spatula==1)
assert(not Model.economyAction(s,"job","festival",0))
assert(not Model.economyAction(s,"job","dishes",0/0))
assert(s.economy.energy==95)
assert(Model.economyAction(s,"collect","spatula"))
assert(not Model.economyAction(s,"collect","spatula"))
assert(s.economy.inventory.spatula==0 and Model.collectionBonus(s)==1.01)
s.cookies=10000
assert(Model.economyAction(s,"property","stand"))
assert(s.cookies==9500 and Model.propertyPrice(s,"stand")==625)
assert(math.abs(Model.snapshot(s).cps-1.01)<.00001, "property income appears in the bakery counter")
Model.tick(s,150)
assert(s.economy.energy==100 and math.abs(s.cookies-9651.5)<.001)
local combined=Model.new()
combined.buildings[2]=1;combined.economy.properties.store=1
combined.frenzyUntil=100
local rate=Model.cps(combined)
local before=combined.cookies
Model.tick(combined,1)
assert(rate==14 and math.abs(combined.cookies-before-rate)<.00001, "displayed combined income matches actual awards")
local earned=s.earned
assert(Model.economyAction(s,"deposit",100))
assert(s.economy.jar==95,"5% deposit fee")
assert(Model.economyAction(s,"withdraw",95))
assert(s.earned==earned and s.economy.jar==0)
for _,bad in {-1,0,1.5,math.huge,0/0,"100",{}} do
    assert(not Model.economyAction(s,"deposit",bad))
end
s.economy.energy=0
assert(not Model.economyAction(s,"job","dishes",0))
local restored=Model.new()
Model.restoreEconomy(restored,Model.snapshot(s))
assert(restored.economy.collection.spatula and restored.economy.properties.stand==1 and restored.economy.xp==10)
Model.restoreEconomy(restored,{economy={energy=math.huge,stamina=-1,inventory={spatula=0/0},properties={stand=1e10}}})
assert(restored.economy.energy==0 and restored.economy.stamina==0 and restored.economy.inventory.spatula==0 and restored.economy.properties.stand==100)
print("PASS jobs, rolls, unlocks, collection, properties, regeneration, jar conservation, malformed input and save restoration")
