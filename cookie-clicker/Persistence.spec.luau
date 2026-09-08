local Model=require("./Model")
local Persistence=require("./Persistence")
local passed=0
local function test(name,callback) callback();passed+=1;print("PASS "..name) end
local function fixture()
	local clock=1000
	local data={}
	local failures=0
	local calls=0
	local store={UpdateAsync=function(_,key,callback)
		calls+=1
		if failures>0 then failures-=1;error("network unavailable") end
		local value=callback(data[key]);if value~=nil then data[key]=value end;return value
	end}
	local service=Persistence.new(Model,store,{now=function()return clock end,wait=function(dt)clock+=dt end})
	return service,data,function(n)clock+=n end,function(n)failures=n end,function()return calls end
end
test("round trip preserves purchases, sound settings and releases the lock",function()
	local p,d=fixture();local s=assert(p.load("a","first"));s.state.cookies=200;Model.trade(s.state,1,1,false);Model.buyUpgrade(s.state,"fingers");s.state.soundEnabled=false
	assert(p.save(s,true));assert(d.a.session==nil)
	local next=assert(p.load("a","second"));assert(next.state.cookies==85 and next.state.buildings[1]==1 and next.state.upgrades.fingers and next.state.soundEnabled==false)
end)
test("retries transient load and save failures",function()
	local p,d,advance,fail,calls=fixture();fail(2);local s=assert(p.load("a","first"));assert(calls()==3)
	s.state.cookies=42;fail(2);assert(p.save(s,false));assert(d.a.cookies==42 and calls()==6)
end)
test("failed load never creates a blank replacement",function()
	local p,d,advance,fail=fixture();d.a={version=1,cookies=900};fail(3);assert(p.load("a","first")==nil);assert(d.a.cookies==900 and d.a.session==nil)
end)
test("overlapping sessions are refused and stale owners cannot overwrite",function()
	local p,d,advance=fixture();local first=assert(p.load("a","first"));assert(p.load("a","second")==nil)
	advance(181);local second=assert(p.load("a","second"));second.state.cookies=70;assert(p.save(second,false))
	first.state.cookies=1000;assert(not p.save(first,false));assert(d.a.cookies==70 and not first.ready)
end)
test("offline earnings stop at eight hours and do not repeat after save",function()
	local p,d,advance=fixture();local s=assert(p.load("a","first"));s.state.buildings[2]=1;assert(p.save(s,true));advance(12*3600)
	local next=assert(p.load("a","second"));assert(next.offlineCookies==8*3600);assert(p.save(next,true));local again=assert(p.load("a","third"));assert(again.offlineCookies==0)
end)
test("corrupt numbers are sanitized but unknown save versions are preserved",function()
	local p,d=fixture();d.a={version=1,cookies=0/0,earned=math.huge,buildings={-1,2.9},upgrades={fake=true},soundEnabled=false}
	local s=assert(p.load("a","first"));assert(s.state.cookies==0 and s.state.earned==0 and s.state.buildings[1]==0 and s.state.buildings[2]==2 and s.state.upgrades.fake==nil)
	d.b={version=2,cookies=999};assert(p.load("b","first")==nil);assert(d.b.cookies==999 and d.b.version==2)
end)
test("failed saves retain previously stored progress",function()
	local p,d,advance,fail=fixture();local s=assert(p.load("a","first"));s.state.cookies=10;assert(p.save(s,false));s.state.cookies=20;fail(3);assert(not p.save(s,false));assert(d.a.cookies==10);assert(p.save(s,true));assert(d.a.cookies==20)
end)
print(passed.." persistence tests passed")
