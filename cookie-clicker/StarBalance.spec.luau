local Model=require("./Model")
local function near(a,b)assert(math.abs(a-b)<1e-8,tostring(a).." ~= "..tostring(b))end
near(Model.starMultiplier(0),1)
near(Model.starMultiplier(1),1.05)
near(Model.starMultiplier(100),6)
assert(Model.starMultiplier(101)>6 and Model.starMultiplier(101)<6.05)
local previous=Model.starMultiplier(100)
for _,stars in {101,200,1000,10000,1e6,1e9} do
    local value=Model.starMultiplier(stars)
    assert(value>previous,"additional stars must improve production")
    assert(value<1+stars*.05,"late stars must have diminishing returns")
    previous=value
end
assert(Model.starMultiplier(1e6)<60,"million-star production must stay bounded")
local s=Model.new();s.buildings[6]=5
local cps,click=Model.cps(s),Model.clickPower(s)
s.prestige=1000
near(Model.cps(s)/cps,Model.starMultiplier(1000))
assert(Model.clickPower(s)>click)
-- Rebirth still grants all earned stars/chips; only the production curve changes.
s.earned=2000^3*Model.Balance.RebirthCookies;s.chips=7
local gain=Model.ascensionGain(s)
assert(Model.advancedAction(s,"ascend"))
assert(s.prestige==1000+gain and s.chips==7+gain)
print("PASS star balance: opening rewards, continuous increasing softcap, production/taps and unchanged chip grants")
