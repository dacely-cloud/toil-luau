local Model=require("./Model")
local Images=require("./ImageConfig")
local Backgrounds=require("./CookieBackgrounds")
local s=Model.new()
for level=2,30 do
    local threshold=Model.jobLevelXp(level)
    s.economy.xp=threshold-1;assert(Model.jobLevel(s)==level-1)
    s.economy.xp=threshold;assert(Model.jobLevel(s)==level)
end
assert(Model.jobLevelXp(3)==160 and Model.jobLevelXp(5)==640)
assert(Images.bakeryBackground(1)==nil and Images.bakeryBackground(2)==nil)
for index,name in Backgrounds.NAMES do
    for offset=0,2 do assert(Images.bakeryBackground(index*3+offset)=="CookieBackgrounds/"..name) end
end
s=Model.new()
for _=1,4 do assert(Model.economyAction(s,"job","dishes",.5)) end
assert(Model.jobLevel(s)==2)
for _=1,5 do assert(Model.economyAction(s,"job","deliver",.5)) end
assert(Model.jobLevel(s)==3 and s.economy.energy>0,"first background reachable with starting energy")
print("PASS level thresholds, three-level backgrounds and first unlock with starting energy")
