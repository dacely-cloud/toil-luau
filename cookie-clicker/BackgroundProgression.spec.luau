local M=require("./Model")
local s=M.new()
for level=1,100 do
    s.economy.xp=M.jobLevelXp(level)
    local expected=M.Decor[math.min(#M.Decor,math.floor(level/3))]
    assert(M.bakeryBackground(s)==expected,"wrong background at level "..level)
    assert(M.decorBonus(s)==1,"free background must not grant paid baking bonuses")
end
s.economy.xp=M.jobLevelXp(10)
assert(M.bakeryBackground(s).id=="rook")
local restored=M.new();M.restoreEconomy(restored,M.snapshot(s))
assert(M.bakeryBackground(restored).id=="rook")
s.economy.xp=0;s.economy.decor.nova=true
assert(M.bakeryBackground(s).id=="nova","preserve higher purchased backgrounds")
assert(M.decorBonus(s)==1.05)
print("PASS free backgrounds every three levels, level 10, final art fallback, saves and paid decor preservation")
