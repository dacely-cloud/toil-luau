# Longer progression — September 9, 2026

Applied to the newly imported Studio version, including campaigns, decor and
the expanded collection. Existing saves, owned buildings, boosts, decor and
paid entitlements are retained. Already-maxed accounts are not reset.

## Changes

The former one-hour base-payback cap made every late building similarly cheap.
The cap now grows by 1.65 per tier after Bank, keeping original prices where
they are lower. The first six prices remain unchanged. Later building upgrade
prices derive from the revised building prices; CPS and tapping formulas stay
unchanged. This extends progression without making purchased upgrades weaker.

Campaign cancellation previously calculated a refund from current production,
allowing an inexpensive booking to become a huge refund after growing the bakery.
The exact paid booking cost is now saved and used for refunds. Legacy campaigns
derive their original cost from the locked reward and the previous 10% booking
fee. Claims still return the full advertised reward, but returned principal no
longer counts as newly baked cookies toward stars. Saved campaign rewards no
longer truncate at one quadrillion.

## Pacing evidence

The expanded actual-model simulation buys buildings, upgrades, properties,
collectibles and decor; runs jobs and campaigns; uses cookie spells and the baking
helper; and catches half of naturally falling golden cookies. Campaigns are booked
only within 10% of the bank, selecting net payout per second. Purchases use a
marginal-payback heuristic. Rebirth profiles restart when they can double stars
and buy available permanent boosts. These are estimates, not optimal play or
retention telemetry; they do not simulate unlimited Robux spending, charity,
empire coordination, random item drops or every minigame strategy.

| Profile | Result |
|---|---|
| Old one-hour cap, 2 taps/sec, expanded activities | Final building at 27,120 seconds (7.53 hours); 66 owned after a day |
| Revised curve, same activity strategy | No final building after 7 continuous days |
| Revised curve with repeated rebirths | First final building at 346,485 seconds (4.01 continuous days) |
| Revised curve, all passes, 10 friends, 8 taps/sec | No final building after 24 hours |
| Same boosted profile with repeated rebirths | No final building after 24 hours; 256 permanent stars |

Opening Farm remains at 106 seconds and level 5 at 351 seconds for the standard
active profile. This change targets the compressed mid/late building ladder,
not a delay to the first session's basic interactions.

Reproduce with the native Luau executable:

```
luau scripts/simulate-balance.luau -a baseline 1
luau scripts/simulate-balance.luau -a harder 7
luau scripts/simulate-balance.luau -a rebirth 7
luau scripts/simulate-balance.luau -a boosted 1
luau scripts/simulate-balance.luau -a boosted_rebirth 1
```

All 29 native game suites pass, including fixed-refund/save migration tests,
all-building bulk quotes and upgrade monotonicity. Stale pre-import assertions
were updated for paid decor, 15 product definitions and the expanded 38%
collection bonus. Existing monetization tests do not claim exhaustive new AdRush
product coverage merely because the product count is now correct.

Synced BalanceConfig, Model and Economy to Studio and staging. Verified all 20
bulk building tiers and the cancellation fix using isolated server model states.
Studio restarted successfully and its console showed no game errors.
