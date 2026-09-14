local M=require("./Model")
local function near(a,b) assert(math.abs(a-b)<1e-8,tostring(a).." ~= "..tostring(b)) end
local s=M.new();s.cookies=1e20
for _,item in M.Items do
    if not item.exclusive then
        s.economy.xp=M.jobLevelXp(item.level)-1
        if item.level>1 then
            local bank=s.cookies
            assert(not M.economyAction(s,"item",item.id))
            assert(s.cookies==bank and not s.economy.inventory[item.id])
        end
        s.economy.xp=M.jobLevelXp(item.level)
        assert(M.itemUnlocked(s,item))
        s.cookies=M.itemPrice(s,item)
        assert(M.economyAction(s,"item",item.id));near(s.cookies,0)
        near(M.itemBonus(s,item),item.bonus)
        assert(not M.economyAction(s,"sellItem",item.id),"keep the last copy")
        local quote=M.itemPrice(s,item)
        assert(quote>item.price)
        s.cookies=quote
        assert(M.economyAction(s,"item",item.id));near(s.cookies,0)
        assert(M.economyAction(s,"sellItem",item.id))
        near(s.cookies,M.itemSellPrice(s,item))
        assert(s.cookies<quote)
        s.cookies=1e20
    end
end
local flour=M.Items[1]
s=M.new();s.economy.collection.flour=true;s.economy.inventory.flour=8
assert(M.itemTier(s,flour)==1)
local remaining,target=M.itemNextTier(s,flour);assert(remaining==1 and target==10)
s.cookies=M.itemPrice(s,flour)
assert(M.economyAction(s,"item","flour"));assert(M.itemTier(s,flour)==2)
near(M.itemBonus(s,flour),.015)
s.economy.inventory.flour=99;assert(M.itemTier(s,flour)==3)
near(M.itemBonus(s,flour),.02)
s.economy.inventory.flour=1000000;near(M.itemBonus(s,flour),.02)
assert(M.itemPrice(s,flour)<math.huge)
local restored=M.new();M.restoreEconomy(restored,M.snapshot(s))
local tier,owned=M.itemTier(restored,flour)
assert(tier==3 and owned==1000001 and restored.economy.collection.flour)
near(M.collectionBonus(s),M.collectionBonus(restored))
local old=M.new();old.economy.collection.flour=true
M.restoreEconomy(restored,M.snapshot(old));near(M.collectionBonus(restored),1.01)
assert(not M.economyAction(s,"item","goldenWhisk"))
print("PASS item progression: server level locks, exact quotes, growing duplicate prices, bounded refunds, collection tiers and legacy saves")
