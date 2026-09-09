local Model=require("./Model")
assert(Model.starGoal(1)==100e9)
assert(Model.starGoal(2)==1.6e12)
assert(Model.starGoal(3)==8.1e12)
assert(Model.starGoal(5)==62.5e12)
assert(Model.starGoal(10)==1e15)
for _,stars in {1,2,3,5,7,10,100,1000} do
    local s=Model.new();local goal=Model.starGoal(stars)
    s.earned=goal*(1-1e-10)
    assert(Model.ascensionGain(s)==stars-1,"chip granted before its goal")
    s.earned=goal
    assert(Model.ascensionGain(s)==stars,"exact goal did not unlock chips")
    s.pastEarned=goal*.25;s.earned=goal*.75
    assert(Model.ascensionGain(s)==stars,"lifetime progress must include prior runs")
    assert(Model.advancedAction(s,"ascend"))
    assert(s.prestige==stars and s.chips==stars)
    assert(not Model.advancedAction(s,"ascend"),"same earnings granted twice")
end
local s=Model.new();s.prestige=7;s.chips=4;s.heavenly.baking=true;s.pastEarned=3.43e11
assert(Model.ascensionGain(s)==0 and s.chips==4 and s.heavenly.baking)
local saved=Model.snapshot(s);local restored=Model.new();Model.restoreAdvanced(restored,saved)
assert(restored.prestige==7 and restored.chips==4 and restored.heavenly.baking)
print("PASS rebirth thresholds: fourth-power goals, exact boundaries, cumulative earnings, one-time grants and legacy ownership")
