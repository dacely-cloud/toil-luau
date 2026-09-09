local Model=require("./Model")
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
