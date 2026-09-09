local make=require("./FriendBoost")
local Model=require("./Model")
local tasks,counts={},{}
local tracker=make(function(a,b)return a==1 or b==1 end,function(fn)table.insert(tasks,fn)end,function(p,n)counts[p]=n end)
local function drain()while #tasks>0 do table.remove(tasks,1)()end end
tracker.add(1)
for i=2,11 do tracker.add(i) end
drain()
assert(tracker.count(1)==10 and counts[1]==10 and tracker.count(2)==1)
tracker.add(2);assert(#tasks==0,"no duplicate lookups")
tracker.remove(2);assert(tracker.count(1)==9 and counts[1]==9)
tracker.add(12);tracker.remove(12);drain();assert(tracker.count(1)==9,"late lookup cannot restore departed friend")
local baseline=Model.new();baseline.buildings[1]=10;baseline.economy.properties.stand=1
local boosted=Model.snapshot(baseline);boosted.friendCount=10
assert(math.abs(Model.cps(boosted)-Model.cps(baseline)*1.1)<1e-8)
Model.tick(baseline,10);Model.tick(boosted,10)
assert(math.abs(boosted.cookies-baseline.cookies*1.1)<1e-8,"actual production matches displayed bonus")
assert(Model.baseClickPower(boosted)==Model.baseClickPower(baseline),"production boost does not change the base tap reward")
boosted.earned=1e15;assert(Model.advancedAction(boosted,"ascend"));assert(boosted.friendCount==10)
local saved=Model.snapshot(boosted)
local store={UpdateAsync=function(_,_,fn)saved=fn(saved);return saved end}
local service=require("./Persistence").new(Model,store,{now=function()return 1 end,wait=function()end})
local session=service.load("test","token");assert(session and not session.state.friendCount,"online boost must not survive into offline earnings")
local failed=make(function()error("network")end,function(fn)fn()end,function()error("unverified friend granted")end)
failed.add(1);failed.add(2);assert(failed.count(1)==0)
print("PASS friend boost: 10 friends = 10%, mutual counts, leave/in-flight cleanup, failed lookup, production, ascension and no offline boost")
