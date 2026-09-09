local Model=require("./Model")
-- Test each upgrade at its unlock point too: an enormous unrelated bakery can
-- hide small changes below floating-point precision in the saturated case.
for _,u in Model.Upgrades do
    local s=Model.new();s.cookies=u.price;s.buildings[u.building]=u.required
    local before=Model.snapshot(s)
    assert(Model.buyUpgrade(s,u.id),"purchase failed: "..u.id)
    local after=Model.snapshot(s)
    assert(after.cps>before.cps,"upgrade did not improve production: "..u.id)
    assert(after.clickPower>before.clickPower,"upgrade did not improve taps: "..u.id)
    assert(Model.click(s)==after.clickPower,"displayed and awarded tap differ: "..u.id)
    local power=Model.clickPower(s)
    assert(not Model.buyUpgrade(s,u.id),"duplicate purchase accepted: "..u.id)
    assert(Model.clickPower(s)==power,"rejected purchase changed taps: "..u.id)
end
for _,u in Model.Upgrades do
    for _,boosted in {false,true} do
        local s=Model.new();s.cookies=1e100
        for i=1,#Model.Buildings do s.buildings[i]=100 end
        for _,old in Model.Upgrades do if old.id~=u.id then s.upgrades[old.id]=true end end
        if boosted then s.frenzyUntil=100;s.gardenBoostUntil=100;s.friendCount=10;s.buddies=true;s.wrinklers={{id=1,bank=0}} end
        local cps,click=Model.cps(s),Model.clickPower(s)
        assert(Model.buyUpgrade(s,u.id))
        assert(Model.cps(s)>=cps,"upgrade lowered CPS: "..u.id)
        assert(Model.clickPower(s)>=click,"upgrade lowered click: "..u.id)
    end
end
local s=Model.new();s.buildings[2]=10
local before=Model.clickPower(s)
Model.advancedAction(s,"buddies")
assert(math.abs(before-Model.clickPower(s))<1e-9,"wrinklers must not reduce taps")
for i=2,10 do s.wrinklers[i]={id=i,bank=0} end
assert(math.abs(before-Model.clickPower(s))<1e-9,"ten wrinklers must not reduce taps")
s.frenzyUntil=1
before=Model.clickPower(s);Model.tick(s,1)
assert(before>Model.clickPower(s),"temporary frenzy should still expire")
print("PASS every upgrade preserves or increases CPS and click reward at the same game state")
