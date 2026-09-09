local Model=require("./Model")
local function near(a,b)assert(math.abs(a-b)<1e-7,tostring(a).." ~= "..tostring(b))end
local function bakery(badges)
    local s=Model.new();s.buildings[2]=10;s.economy.properties.stand=2
    for i=1,badges do s.achievements[Model.Achievements[i][1]]=true end
    return s
end
for _,case in {{0,0},{4,0},{5,1},{9,1},{10,2},{#Model.Achievements,math.floor(#Model.Achievements/5)}} do
    local s=bakery(case[1]);local bonus,progress=Model.milkBonus(s)
    assert(bonus==case[2] and progress==case[1]%5)
    near(Model.cps(s),12*(1+case[2]/100))
    local cps=Model.cps(s);Model.tick(s,1);near(s.cookies,cps)
    near(Model.baseClickPower(s),1)
end
local s=bakery(10);s.passes={VIP=true,PropertyIncome2x=true};s.friendCount=10
near(Model.cps(s),(10+4)*1.02*1.1*1.1)
local earned=Model.cps(s);Model.tick(s,1);near(s.cookies,earned)
local before=Model.jobReward(s,Model.Jobs[1]);s.achievements={};near(Model.jobReward(s,Model.Jobs[1]),before)
s=bakery(10);s.earned=1e15;assert(Model.advancedAction(s,"ascend"));assert(Model.milkBonus(s)==2)
local restored=Model.new();local saved=Model.snapshot(s)
local records={UpdateAsync=function(_,_,fn)saved=fn(saved);return saved end}
local p=require("./Persistence").new(Model,records,{now=function()return 1000 end,wait=function()end})
local session=assert(p.load("milk","test"));assert(Model.milkBonus(session.state)==2)
print("PASS milk: five-badge milestones, actual production/display agreement, property and pass stacking, unchanged base tap/job rewards, ascension and save restoration")
