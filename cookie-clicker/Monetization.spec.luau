local Model=require("./Model")
local Config=require("./MonetizationConfig")
local PurchaseService=require("./PurchaseService")
local Persistence=require("./Persistence")
assert(#Config.verify()==0 and #Config.PassOrder==6 and #Config.ProductOrder==11)
local function near(a,b)assert(math.abs(a-b)<1e-7,tostring(a).." ~= "..tostring(b))end
local base=Model.new();base.buildings[2]=10;base.economy.properties.stand=2
local vip=Model.snapshot(base);vip.passes={VIP=true}
near(Model.cps(vip),Model.cps(base)*1.1)
near(Model.clickPower(vip),Model.clickPower(base)*1.1)
assert(Model.maxEnergy(vip)==110)
Model.tick(base,30);Model.tick(vip,30);near(vip.cookies,base.cookies*1.1)
local jobs=Model.new();jobs.passes={JobRewards2x=true,VIP=true}
assert(Model.economyAction(jobs,"job","dishes",.5));assert(jobs.cookies==66 and jobs.economy.xp==10)
local property=Model.new();property.economy.properties.stand=1;property.passes={PropertyIncome2x=true}
near(Model.propertyIncome(property),2);Model.tick(property,10);near(property.cookies,20)
local regen=Model.new();regen.economy.energy=0;regen.economy.stamina=0
regen.passes={EnergyRegen2x=true,StaminaRegen2x=true,VIP=true};Model.tick(regen,90)
near(regen.economy.energy,36);near(regen.economy.stamina,12)
regen.cookies=1000;assert(Model.economyAction(regen,"deposit",100));assert(regen.economy.jar==95)
regen.passes.NoDepositFee=true;assert(Model.economyAction(regen,"deposit",100));assert(regen.economy.jar==195)
assert(not Model.economyAction(regen,"item","goldenWhisk",0),"exclusive items cannot be bought for cookies")
local starter=Model.productReward(regen,Config.Products.StarterPack,0,1000)
assert(starter.cookies==50000 and starter.items.goldenWhisk==1 and starter.items.starApron==1)
Model.grantProduct(regen,starter)
assert(regen.economy.inventory.goldenWhisk==1 and regen.economy.inventory.starApron==1)
Model.grantProduct(regen,Model.productReward(regen,Config.Products.EnergyRefill,0,1000));assert(regen.economy.energy==110)
Model.grantProduct(regen,Model.productReward(regen,Config.Products.StaminaRefill,0,1000));assert(regen.economy.stamina==100)
for _,key in {"Shield4h","Shield8h","Shield24h"} do
    local before=math.max(regen.shieldUntil or 0,1000)
    Model.grantProduct(regen,Model.productReward(regen,Config.Products[key],0,1000))
    assert(regen.shieldUntil==before+Config.Products[key].Reward.Duration)
end
for _,key in {"CookieDelivery","CookieJackpot"} do
    local reward=Config.Products[key].Reward
    local fresh=Model.new();assert(Model.deliveryAmount(fresh,reward)==reward.Min)
    fresh.buildings[5]=10;local amount=Model.deliveryAmount(fresh,reward)
    assert(amount>reward.Min)
    fresh.friendCount=10;fresh.frenzyUntil=1000;assert(Model.deliveryAmount(fresh,reward)==amount)
end
for _,key in {"GrandmasCrate","BakersCrate","SantasCrate"} do
    local product=Config.Products[key];local tally={}
    for i=0,9999 do
        local reward=Model.productReward(regen,product,(i+.5)/10000,1000)
        local count=0;for id,n in reward.items do tally[id]=(tally[id] or 0)+n;count+=n end
        assert(count==1)
    end
    for i,id in Config.CrateItems do assert(tally[id]==product.Reward.Odds[i]*100) end
end
local records={};local fail=false;local responseLost=false
local store={UpdateAsync=function(_,key,callback)
    if fail then error("save offline") end
    local result=callback(records[key]);if result then records[key]=result end
    if responseLost then error("response lost after commit") end
    return result
end}
local now=1000
local persistence=Persistence.new(Model,store,{now=function()return now end,wait=function()end})
local session=persistence.load("player_1","one",{VIP=true})
local shields={};local policy=true
local service=PurchaseService.new(Model,Config,persistence,{now=function()return now end,random=function()return .99 end,randomAllowed=function()return policy end,protect=function(id,untilTime)shields[id]=untilTime;return true end})
local receipt={PlayerId=1,ProductId=Config.Products.StarterPack.ProductId,PurchaseId="starter"}
fail=true;assert(not service.receipt(session,receipt));assert(session.state.cookies==50000)
fail=false;assert(service.receipt(session,receipt));assert(session.state.cookies==50000)
assert(service.receipt(session,receipt));assert(session.state.cookies==50000)
assert(persistence.save(session,true));session=persistence.load("player_1","two",{VIP=true})
assert(service.receipt(session,receipt));assert(session.state.cookies==50000 and session.state.economy.inventory.starApron==1)
local crate={PlayerId=1,ProductId=Config.Products.SantasCrate.ProductId,PurchaseId="crate"}
policy=nil;assert(not service.receipt(session,crate));assert(not session.state.purchaseReceipts.crate)
policy=false;assert(service.receipt(session,crate));assert(session.state.economy.inventory.crown==1)
local shield={PlayerId=1,ProductId=Config.Products.Shield4h.ProductId,PurchaseId="shield"}
assert(service.receipt(session,shield));assert(shields[1]==15400)
assert(service.receipt(session,shield));assert(shields[1]==15400)
responseLost=true
local refill={PlayerId=1,ProductId=Config.Products.EnergyRefill.ProductId,PurchaseId="refill"}
assert(not service.receipt(session,refill));responseLost=false
-- Simulate a crashed session after a committed write whose reply was lost.
now+=181;session=persistence.load("player_1","three",{VIP=true})
session.state.economy.energy=7;assert(service.receipt(session,refill));assert(session.state.economy.energy==7,"replayed refill must not refill twice")
session.state.earned=1e15;assert(Model.advancedAction(session.state,"ascend"))
assert(session.state.purchaseReceipts.starter and session.state.passes.VIP and session.state.shieldUntil==15400)
assert(not Model.snapshot(session.state,true).purchaseReceipts,"receipt history stays server-only")
assert(Model.snapshot(session.state).purchaseReceipts.starter,"receipt history remains in saved snapshots")
local charity=require("./CharityStore").new(Model,store)
assert(charity.create(1,1,1,now,0));assert(charity.protect(1,now+100))
local result,message,definite=charity.visit(1,1,2,1,"steal",now,0)
assert(not result and definite and message:find("shield"))
assert(charity.visit(1,1,2,2,"help",now,0))
assert(charity.visit(1,1,2,3,"steal",now+100,0),"shield expires at its boundary")
local departing={ready=true,canSave=true,state=Model.new()}
local departingService=PurchaseService.new(Model,Config,{save=function()error("must not save departed player")end},{now=function()return now end,random=function()return 0 end,protect=function()return true end,randomAllowed=function()departing.closing=true;return true end})
assert(not departingService.receipt(departing,crate));assert(not departing.state.purchaseReceipts.crate)
local waitingShield={ready=true,canSave=true,state=Model.new()}
local protectOkay=false
local shieldService=PurchaseService.new(Model,Config,{save=function()return true end},{now=function()return now end,random=function()return 0 end,protect=function()return protectOkay end})
assert(not shieldService.receipt(waitingShield,shield))
local expires=waitingShield.state.shieldUntil;protectOkay=true
assert(shieldService.receipt(waitingShield,shield));assert(waitingShield.state.shieldUntil==expires,"shared shield retry does not extend twice")
print("PASS all 6 passes, 11 products, 30K crate rolls, exact payouts, receipt retries/rejoin/crash, exclusive items, shield protection/expiry, and ascension")
