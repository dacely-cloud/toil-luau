local Model=require("./Model")
local function near(a,b)assert(math.abs(a-b)<1e-7,tostring(a).." ~= "..tostring(b))end
local fresh=Model.new();near(Model.click(fresh),1)
local s=Model.new();s.buildings[2]=7000
for _,id in {"fingers","cream","ambidextrous"} do s.upgrades[id]=true end
near(Model.cps(s),7000);near(Model.baseClickPower(s),8);near(Model.clickPower(s),568)
local amount=Model.click(s);near(amount,568);near(s.cookies,568);near(s.handmade,568)
local snapshot=Model.snapshot(s);near(snapshot.clickPower,Model.clickPower(s))
s=Model.new();s.economy.properties.stand=100;near(Model.clickPower(s),6)
s.heavenly.tapping=true;near(Model.clickPower(s),6.6)
s.spirit="clicking";near(Model.clickPower(s),7.26)
s.passes={VIP=true};near(Model.clickPower(s),7.986)
s=Model.new();s.buildings[2]=100
near(Model.clickPower(s),6)
s.frenzyUntil=10;near(Model.clickPower(s),11)
s.played=10;near(Model.clickPower(s),6)
s.friendCount=10;near(Model.clickPower(s),6.5)
local delivery=Model.deliveryAmount(s,Model.MonetizationConfig.Products.CookieDelivery.Reward)
s.friendCount=100;s.frenzyUntil=100
near(Model.deliveryAmount(s,Model.MonetizationConfig.Products.CookieDelivery.Reward),delivery)
print("PASS click scaling: 7000 CPS + three click upgrades = 568 per click, actual awards, snapshot, properties, tap/VIP boosts, bonus expiry, and stable paid deliveries")
