local M=require("./Model")
local function near(a,b) assert(math.abs(a-b)<=math.max(1,math.abs(b))*1e-9,tostring(a).." ~= "..tostring(b)) end
for _,boosted in {false,true} do
    local s=M.new();s.buildings[2]=7000
    if boosted then
        s.passes={};s.prestige=10000;s.friendCount=10;s.spirit="clicking";s.frenzyUntil=100;s.gardenBoostUntil=100
        for _,u in M.Upgrades do s.upgrades[u.id]=true end
        for _,h in M.HeavenlyBoosts do s.heavenly[h.id]=true end
        for _,p in M.MonetizationConfig.PassOrder do s.passes[p]=true end
        for _,item in M.Items do s.economy.inventory[item.id]=100 end
    end
    local previous=0
    for _,count in {1,3,50,100,1000,10000,1000000} do
        s.buildings[1]=count
        local share=M.Balance.ClickProductionShare
        for _,u in M.Upgrades do if u.click and s.upgrades[u.id] then share+=M.Balance.ClickUpgradeShare end end
        share*=M.heavenlyFactor(s,"tapping")*(s.spirit=="clicking" and 1.1 or 1)
        local base=M.baseClickPower(s)
        local production=(M.clickPower(s)-base)/share
        local automatic=M.cursorClickPower(s)
        assert((automatic-base)*count/M.CursorPeriod<=production*M.Balance.CursorProductionBonusCap+1e-6)
        assert(automatic<=M.clickPower(s) and automatic>=base)
        assert(M.cps(s)>previous);previous=M.cps(s)
    end
end
local s=M.new();s.earned=M.starGoal(1)-1
M.grantProduct(s,{cookies=M.starGoal(100),items={}})
assert(M.ascensionGain(s)==0 and s.earned==M.starGoal(1)-1)
M.award(s,1);assert(M.ascensionGain(s)==1)
assert(M.advancedAction(s,"ascend"));assert(s.prestige==1 and s.chips==1)
assert(not M.advancedAction(s,"ascend"))
local old=M.new();old.prestige=1000;old.chips=37;old.earned=1e12;old.heavenly.baking=true
local restored=M.new();M.restoreAdvanced(restored,M.snapshot(old))
assert(restored.prestige==1000 and restored.chips==37 and restored.heavenly.baking)
assert(M.ascensionGain(restored)==0)
local state=M.new();state.buildings[1]=10000;state.buildings[2]=7000
local expected=M.cursorClickPower(state)*10000
M.tick(state,10);near(state.cookies,70000+expected)
print("PASS cursor fleet bonus cap, stacked boosts, monotonic fleet income, exact awards, paid currency exclusion and legacy rebirth preservation")
