local EmpireStore=require("./EmpireStore")
local data={}
local store={UpdateAsync=function(_,key,fn)local r=fn(data[key]);if r then data[key]=r end;return r end}
local service=EmpireStore.new(store)
assert(not service.create(1,"Bakery","invalid"))
local r=assert(service.create(1,"Team Cookies","cookie"))
assert(r.level==1 and r.members['1'].active)
assert(service.create(1,"Ignored duplicate","star").name=="Team Cookies")
assert(service.join(1,2));assert(not service.donate(1,3,1,10))
assert(service.donate(1,2,1,50).points==50)
assert(service.donate(1,2,1,50).points==50)
assert(service.leave(1,2));assert(service.join(1,2))
assert(service.donate(1,2,1,50).points==50)
assert(service.donate(1,2,2,50).points==100)
assert(not service.upgrade(1,2,1))
r=assert(service.upgrade(1,1,1));assert(r.level==2 and r.points==0)
assert(not service.upgrade(1,1,1))
assert(not service.leave(1,1))
assert(not service.rename(1,2,"Bad","star"))
assert(service.rename(1,1,"Cookie Friends","heart").badge=="heart")
assert(EmpireStore.perks(service.read(1)).cookies==.02)
local before=service.read(1).points
for _,bad in {0/0,math.huge,-1,1.5,"1",{}} do assert(not service.donate(1,2,bad,50)) end
assert(service.read(1).points==before)
-- Simulate UpdateAsync invoking a callback again against the same base value.
local retryStore={UpdateAsync=function(_,key,fn)fn(data[key]);local r=fn(data[key]);if r then data[key]=r end;return r end}
assert(EmpireStore.new(retryStore).donate(1,2,3,25).points==25)
print("PASS empire ownership, joins, donation replay protection, rejoining, upgrade compare-and-set, perks and UpdateAsync callback retries")
