local Model=require("./Model")
for _,ad in Model.Ads do
    local s=Model.new();s.cookies=1e6
    local cost=Model.adCost(s,ad)
    assert(Model.economyAction(s,"adStart",ad.id))
    s.buildings[20]=100
    local saved=Model.snapshot(s);local resumed=Model.new()
    Model.restoreEconomy(resumed,saved)
    assert(resumed.economy.ads[1].cost==cost)
    local bank=s.cookies
    assert(Model.economyAction(s,"adCancel",1))
    assert(s.cookies-bank==math.floor(cost*Model.Balance.AdCancelRefund),"refund repriced after production growth")
    assert(s.earned==0,"refund grants rebirth progress")
    assert(Model.economyAction(resumed,"adCancel",1))
    assert(resumed.cookies==math.floor(cost*Model.Balance.AdCancelRefund))
    -- Legacy entries derive the original 10% booking fee from their locked reward.
    local legacy=Model.new()
    saved.economy.ads[1].cost=nil
    Model.restoreEconomy(legacy,saved)
    assert(legacy.economy.ads[1].cost==cost)
    legacy.economy.ads[1].remaining=0
    local reward=legacy.economy.ads[1].reward
    assert(Model.economyAction(legacy,"adCollect",1,.99))
    assert(legacy.cookies==reward and legacy.earned==reward-cost)
    assert(not Model.economyAction(legacy,"adCollect",1,.99))
end
print("PASS campaign accounting: fixed-cost refunds, legacy/save recovery, profit-only baked earnings and no duplicate claims")
