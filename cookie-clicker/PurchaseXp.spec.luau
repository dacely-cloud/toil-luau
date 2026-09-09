local Model=require("./Model")
local Persistence=require("./Persistence")
local s=Model.new()
assert(not Model.trade(s,1,1,false) and s.economy.xp==0)
s.cookies=1e100
local ok,xp=Model.trade(s,1,10,false)
assert(ok and xp==20 and s.economy.xp==20)
Model.trade(s,1,10,true)
ok,xp=Model.trade(s,1,10,false)
assert(ok and xp==0 and s.economy.xp==20,"rebuy cannot farm XP")
ok,xp=Model.trade(s,1,1,false)
assert(ok and xp==2,"new ownership record earns XP")
ok,xp=Model.trade(s,20,1,false)
assert(ok and xp==6,"late building reward remains small")
ok,xp=Model.buyUpgrade(s,"fingers")
assert(ok and xp==10)
local before=s.economy.xp
assert(not Model.buyUpgrade(s,"fingers") and s.economy.xp==before)
local bulk=Model.new();bulk.cookies=33
ok,xp=Model.trade(bulk,1,100,false)
assert(ok and bulk.buildings[1]==2 and xp==4,"partial bulk only rewards actual purchases")
local singles=Model.new();singles.cookies=33
Model.trade(singles,1,1,false);Model.trade(singles,1,1,false)
assert(singles.economy.xp==bulk.economy.xp,"bulk and singles award equal XP")
local saved=Model.snapshot(s)
local store={UpdateAsync=function(_,_,callback) saved=callback(saved);return saved end}
local persistence=Persistence.new(Model,store,{now=function()return 100 end,wait=function()end})
local session=persistence.load("xp","test")
assert(session)
local restored=session.state
Model.trade(restored,1,10,true)
ok,xp=Model.trade(restored,1,10,false)
assert(ok and xp==0,"rejoin preserves high-water records")
restored.earned=1e15
assert(Model.advancedAction(restored,"ascend"))
restored.cookies=1e100
ok,xp=Model.trade(restored,1,10,false);assert(ok and xp==0,"ascension cannot reset purchase XP")
ok,xp=Model.buyUpgrade(restored,"fingers");assert(ok and xp==0,"ascension cannot repeat boost XP")
local legacy=Model.new();legacy.buildings[1]=10;legacy.upgrades.fingers=true
Model.restoreEconomy(legacy,{economy={xp=123,energy=100,stamina=100}})
assert(legacy.economy.xp==123 and legacy.economy.buildingXpHigh[1]==10 and legacy.economy.upgradeXpClaimed.fingers)
local malformed=Model.new()
Model.restoreEconomy(malformed,{economy={buildingXpHigh={[1]=0/0,[2]=-10},upgradeXpClaimed={fingers="true"}}})
assert(malformed.economy.buildingXpHigh[1]==0 and malformed.economy.buildingXpHigh[2]==0 and not malformed.economy.upgradeXpClaimed.fingers)
print("PASS purchase XP: tier rewards, failures, partial bulk, rebuy protection, save/rejoin, ascension, legacy migration and invalid records")
