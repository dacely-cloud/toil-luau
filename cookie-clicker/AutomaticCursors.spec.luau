local Model=require("./Model")
local function near(a,b) assert(math.abs(a-b)<math.max(1,math.abs(b))*1e-9,tostring(a).." ~= "..tostring(b)) end
for _,count in {0,1,49,50,51,9999,10000} do
    near(Model.cursorTaps(count,0,10),count)
    near(Model.cursorTaps(count,10,10+28800),count*2880)
    local batched=0
    for i=1,600 do batched+=Model.cursorTaps(count,(i-1)/60,i/60) end
    near(batched,count)
end
local s=Model.new();s.buildings[1]=10000;s.buildings[2]=7000
local reward=Model.clickPower(s)
near(Model.cps(s),7000+10000*reward/10)
near(Model.snapshot(s).clickPower,reward)
Model.tick(s,10)
near(s.cookies,70000+10000*reward)
assert(s.clicks==0 and s.handmade==0 and s.economy.tapXpProgress==0)
s=Model.new();s.buildings[1]=1
local before=Model.clickPower(s);s.upgrades.fingers=true
assert(Model.clickPower(s)>before*2)
local expected=Model.clickPower(s)
Model.tick(s,10);near(s.cookies,expected)
local opening=Model.new();opening.buildings[1]=3
assert(math.floor(Model.cps(opening)*10+.5)/10==.3,"three starting cursors must display 0.3 CPS")
s=Model.new();s.buildings[1]=10000
local started=os.clock()
for _=1,6000 do Model.tick(s,1/60) end
print("PASS automatic cursors: exact batched awards, 10,000 ownership, snapshots, upgrades, no manual XP; 6000 ticks in "..(os.clock()-started).." seconds")
