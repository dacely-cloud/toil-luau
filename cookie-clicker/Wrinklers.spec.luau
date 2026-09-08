local Model=require("./Model")
local Persistence=require("./Persistence")
local function near(a,b)assert(math.abs(a-b)<1e-6, tostring(a).." ~= "..tostring(b))end
local function bakery()
 local s=Model.new();s.buildings[2]=10;assert(Model.advancedAction(s,"buddies"));return s
end
local s=bakery();assert(#s.wrinklers==1);local first=s.wrinklers[1].id
Model.tick(s,60);assert(#s.wrinklers==2);near(s.cookies,570);near(s.wrinklers[1].bank,30);near(s.wrinklers[2].bank,0)
Model.tick(s,60);near(s.cookies,1110);near(s.buddyBank,90);near(s.cookies+s.buddyBank,1200)
assert(Model.advancedAction(s,"popWrinkler",first));near(s.cookies,1176)
assert(not Model.advancedAction(s,"popWrinkler",first));assert(not Model.advancedAction(s,"popWrinkler",0/0))
assert(not Model.advancedAction(s,"popWrinkler",{}));assert(not Model.advancedAction(s,"popWrinkler",1.5))
near(Model.cps(s),9)
assert(Model.advancedAction(s,"buddies"));local held=s.buddyBank;Model.tick(s,10);near(s.buddyBank,held);near(Model.cps(s),10)
-- Partitioning an offline-sized tick must not change births, bonus overlap or payout.
local large,small=bakery(),bakery()
large.frenzyUntil=85;small.frenzyUntil=85;large.gardenBoostUntil=145;small.gardenBoostUntil=145
Model.tick(large,28800)
for _=1,28800 do Model.tick(small,1) end
assert(#large.wrinklers==10 and #small.wrinklers==10)
near(large.cookies,small.cookies);near(large.buddyBank,small.buddyBank)
for i=1,10 do near(large.wrinklers[i].bank,small.wrinklers[i].bank) end
local all=large.buddyBank;local before=large.cookies
assert(Model.advancedAction(large,"collectBuddies"));near(large.cookies,before+all*1.1)
assert(#large.wrinklers==0 and not Model.advancedAction(large,"popWrinkler",1))
Model.tick(large,60);assert(#large.wrinklers==1 and large.wrinklers[1].id>10)
assert(not Model.advancedAction(large,"popWrinkler",1))
-- Old buddy saves migrate once; malformed and duplicate creature IDs are discarded.
local old=Model.new();old.buildings[2]=10
Model.restoreAdvanced(old,{buddies=true,buddyBank=42})
assert(#old.wrinklers==1);near(old.buddyBank,42)
local cleaned=Model.new()
Model.restoreAdvanced(cleaned,{buddyBank=999,wrinklers={{id=1,bank=5},{id=1,bank=20},{id=2,bank=math.huge},{id=3,bank=-1}}})
assert(#cleaned.wrinklers==1);near(cleaned.buddyBank,5)
-- Use the real save/load service, including offline feeding and stale pop protection.
local data={};local clock=1000
local store={UpdateAsync=function(_,key,fn)local next=fn(data[key]);if next then data[key]=next end;return next end}
local p=Persistence.new(Model,store,{now=function()return clock end,wait=function()end})
local session=assert(p.load("wrinklers","a"));session.state=bakery();Model.tick(session.state,120)
assert(p.save(session,true));clock+=60
local restored=assert(p.load("wrinklers","b"));assert(#restored.state.wrinklers==4)
near(restored.state.cookies+restored.state.buddyBank,1800)
local id=restored.state.wrinklers[1].id
assert(Model.advancedAction(restored.state,"popWrinkler",id));assert(p.save(restored,true))
local again=assert(p.load("wrinklers","c"));assert(not Model.advancedAction(again.state,"popWrinkler",id))
print("PASS wrinkler timing, ten-creature cap, conservation, bonus boundaries, rest, stale claims, migration, malformed saves and persisted offline feeding")
