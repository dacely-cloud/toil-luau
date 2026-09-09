-- Shared pacing constants; UI and server must read the same values.
return {
    RebirthCookies=1e9,
    StarProductionBonus=.05,
    StarBonusSoftcap=100,
    FundraiserProductionShare=.1,
    MaxFundraiserInvestment=1e98,
    MaxJarCookies=1e100,
    MaxBuildingBasePayback=3600,
    EnergySeconds=5,
    StaminaSeconds=15,
    JobProductionSecondsPerEnergy=.5,
    -- Advertising campaigns. Two slots for everyone, a third for VIP. The payout
    -- is a share of what the bakery would have produced over the campaign, the
    -- same trick jobs use, so a ten-hour campaign stays worth booking at every
    -- stage instead of going stale the moment production outgrows a flat number.
    AdSlots=2,
    AdSlotsVip=1,
    -- A campaign pays this share of what the bakery makes over its own length,
    -- on top of what you earn anyway. Raised from .35: at that rate the long
    -- campaigns were not worth the slot they occupied.
    AdProductionShare=.60,
    AdUpFrontShare=.10,
    AdCancelRefund=.5,
    -- Decor is priced off what the bakery makes, the same way campaigns are,
    -- because every fixed price in this game is a rounding error within an hour
    -- of unlocking it. Two hours of production is a real decision at any stage.
    DecorProductionSeconds=7200,
    SugarLumpSeconds=3600,
    ClickProductionShare=.05,
    ClickUpgradeShare=.01,
}
