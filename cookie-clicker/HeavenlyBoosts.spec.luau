local Model=require("./Model")
local function near(a,b)assert(math.abs(a-b)<math.max(1,math.abs(b))*1e-10,tostring(a).." ~= "..tostring(b))end
assert(#Model.HeavenlyBoosts==9)
for _,boost in Model.HeavenlyBoosts do
    local s=Model.new();s.chips=boost.cost-1
    if boost.requires then s.heavenly[boost.requires]=true end
    assert(not Model.advancedAction(s,"heavenly",boost.id))
    s.chips=boost.cost
    if boost.requires then
        s.heavenly[boost.requires]=nil
        assert(not Model.advancedAction(s,"heavenly",boost.id))
        assert(s.chips==boost.cost)
        s.heavenly[boost.requires]=true
    end
    local before=boost.stat and Model.heavenlyFactor(s,boost.stat)
    assert(Model.advancedAction(s,"heavenly",boost.id))
    assert(s.chips==0 and s.heavenly[boost.id])
    assert(not Model.advancedAction(s,"heavenly",boost.id))
    if boost.stat then near(Model.heavenlyFactor(s,boost.stat),before*boost.factor) end
    local saved=Model.snapshot(s);local restored=Model.new()
    Model.restoreAdvanced(restored,saved)
    assert(restored.heavenly[boost.id],"lost saved boost: "..boost.id)
    s.earned=Model.Balance.RebirthCookies
    assert(Model.advancedAction(s,"ascend"))
    assert(s.heavenly[boost.id],"lost boost at rebirth: "..boost.id)
end
local s=Model.new();s.buildings[6]=5
local cps,click=Model.cps(s),Model.clickPower(s)
s.heavenly.baking=true;s.heavenly.baking2=true
near(Model.cps(s),cps*1.375)
local before=Model.clickPower(s)
s.heavenly.tapping=true;s.heavenly.tapping2=true
near(Model.clickPower(s),before*1.375)
s=Model.new();s.economy.properties.market=10
local income=Model.propertyIncome(s)
s.heavenly.property=true
near(Model.propertyIncome(s),income*1.25)
near(Model.deliveryAmount(s,{Min=0,Seconds=1}),math.floor(income*1.25))
local job=Model.Jobs[4];local reward=Model.jobReward(s,job)
s.heavenly.jobs=true;near(Model.jobReward(s,job),math.floor(reward*1.25))
s.economy.energy=0;s.economy.stamina=0
s.heavenly.energy=true;s.heavenly.stamina=true
Model.economyTick(s,15)
near(s.economy.energy,3.6);near(s.economy.stamina,1.2)
s=Model.new();s.earned=3.43e9
assert(Model.ascensionGain(s)==0,"old seven-chip bakery must not unlock rebirth yet")
s.earned=Model.Balance.RebirthCookies-1;assert(Model.ascensionGain(s)==0)
s.prestige=7;s.chips=7;s.earned=3.43e9
assert(Model.ascensionGain(s)==0 and s.chips==7,"existing chips must be retained")
print("PASS all nine star boosts: prices, prerequisites, effects, save/rebirth retention and harder star thresholds")
