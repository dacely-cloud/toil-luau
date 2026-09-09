# Balance audit — 2026-09-09

Status: in-game economy changes, scaled charity, upgrade prices and render cache
are tested and synced to Studio. Paid crate pricing still needs correction in
Creator Dashboard. This is not a claim that live player pacing has been measured.

## Scope and evidence

`BALANCE-TABLES.txt` enumerates every building, upgrade, job, property, collectible,
fundraiser, offered pass and developer product from the actual model. Regenerate
with `node scripts/write-balance-report.mjs`. `BALANCE-SIMULATION.txt` uses actual
transactions, ticks, clicks, jobs and golden-cookie rewards under deterministic
purchase strategies. Active: two taps/second, jobs, half of natural golden cookies;
casual: one tap every two seconds plus jobs; bakery-only: two taps/second without
jobs or golden cookies. The simulator waits for affordable, useful upgrades; it
does not buy currency, play minigames, display collectibles, or optimize every
strategy. A separate 24-hour repeated-rebirth profile restarts when it can double
its stars, buys heavenly upgrades, and retains an owned cursor boost once it has
a permanent slot. Other profiles do not rebirth. These are pacing estimates,
not player telemetry or an optimum.

## Findings and changes

- Late buildings originally had base cost/production paybacks up to 1.06 trillion
  seconds. Base payback is now capped at one hour; opening buildings keep their
  prices. Upgrade costs derive from their building's adjusted price. The long-run
  simulation reaches the final building around 19 hours without rebirth bonuses.
- Rebirth: first star at 1 billion lifetime baked, later thresholds remain cubic.
  The first 100 stars each grant 5% permanent building production instead of 1%.
  Above 100, effective stars are `100*(1+ln(stars/100))`: production keeps growing
  with diminishing returns. The earlier linear curve produced sub-minute repeat
  rebirths around hour 17. The later requested difficulty increase raises the
  threshold from 10 million to 1 billion. First-star simulations now take
  97 minutes active, 110 minutes casual, and 131 minutes bakery-only. The repeated
  rebirth profile has 32 stars at 24 hours; it is not an optimal strategy.
  Stars UI shows the current and post-rebirth baking bonus and explains the taper.
  Chips, reset
  confirmation and existing saved progress stay intact. The test profiles first
  retain all earned chips; a bakery with 3.43 billion baked now qualifies for one
  star rather than seven. Previously purchased boosts stay owned.
- Nine permanent boosts replace the original three: baking/tapping cost 3 chips
  each, energy/stamina regeneration 8 each, permanent slot 10, jobs/property income
  15 each, and advanced baking/tapping 25 each. Advanced tiers require their first
  tier. One shared catalog drives prices, server validation, saved ownership and UI.
- Click upgrades improve both flat tapping and the production share: base share
  5%, plus one percentage point per click upgrade. Generated Cursor upgrades now
  affect tapping too. Every upgrade is tested to avoid lowering click or passive
  output. Wrinklers no longer reduce tapping; temporary frenzy/garden expiration
  still legitimately removes their temporary contribution.
- Corrected two legacy upgrade outliers: Ambidextrous costs 2,500 rather than
  10,000; the 25-grandma upgrade costs 25,000 rather than 50,000. This keeps their
  progression consistent with adjacent generated tiers without changing saved IDs.
- Ten taps grant one XP. Lifetime building ownership records grant 2–6 XP per new
  unit; first-time upgrades grant 10. Reselling/rebuying and rebirthing cannot farm
  these rewards. The 40*(level-1)^2 XP curve and three-level backgrounds remain.
  Level 5 takes about 6–8 minutes with jobs or 27 minutes in bakery-only simulation.
- Energy regenerates one point per five seconds; stamina one per 15 seconds.
  Paid regeneration passes still exactly double their respective rate.
- Jobs retain base payouts and XP, with a production-based minimum worth half a
  second of stable building output per energy. No friend/frenzy/garden multiplier
  feeds this scaling. Empire, collection and purchased job multipliers apply once
  in their established places. Job drops and fixed XP remain tier-dependent.
- All six collection bonuses now help building production as well as jobs and
  properties; total displayed bonus is capped by the six unique items at 21%.
  Normal spare collectibles can be sold for 25% after displaying one. Refunds
  give neither XP nor lifetime baked cookies; exclusive items are not discarded.
- Properties retain costs, 25% price escalation, 100-unit caps and permanent
  income through rebirth. They are a supporting income source, not a substitute
  for all twenty building tiers.
- Building quotes now use the exact unit rounding charged by transactions,
  including resale. Returned investment does not count as newly baked cookies.
  Very large bulk amounts tolerate only floating-point rounding noise.
- Stock sales track average acquisition cost through saves. Only realized profit
  counts as baked; a losing round trip previously manufactured 217,000 earned
  cookies in the audit. Old stock saves receive a current-value basis. The fixed
  market remains an early-game trading activity with three ingredients, 10,000
  inventory per ingredient, 1,000 maximum per order and a 10% selling fee.
- Golden rewards retain their baking payout, but the bank-dependent portion is
  capped at two minutes of current production to prevent unbounded compounding
  of purchased/offline bank balances. Collection identity/expiry protection stays.
- Sugar lumps grow hourly after one million baked instead of every twenty hours.
  Garden still costs one lump for a ten-minute 5% boost; permanent building levels
  compete for those lumps and cap at 100. Garden, helpers, magic, seasonal rewards,
  wrinkler conservation and their action guards remain covered by model/view tests.
- Fundraiser investment now scales to 10% of stable production over its duration,
  above its original minimum. The former one-trillion investment ceiling and
  jar transfer/storage bottlenecks made late-game rewards negligible; monetary
  bounds now allow 1e98 invested and 1e100 in the jar. Net fundraiser profit is
  5/8/15/20% of baseline baking over the duration, before jar fees or visitors.
  Its stake is persisted
  before dispatch and never requoted on retry. Legacy funds retain original stakes.
  The duration ladder returns 1.5/1.8/2.5/3 times principal; only profit is baked.
  Theft remains capped at 25% of principal, with insurance and shields respected.
  Helping remains a social XP activity (20 XP, 50 cookies for five stamina).
- Empire levels retain a 100*current-level stamina cost, owner controls, level-100
  cap and 64 members. Faster stamina regeneration improves group progression;
  max level still takes roughly 32 aggregate hours for 64 continuously donating
  members, or 86 days solo, excluding initial stamina and downtime.
- Production lookup now indexes upgrades by building and passes by affected stat.
  Ten thousand native CPS evaluations fell from ~0.182 seconds to ~0.031 seconds.
  Removed redundant snapshot clones. Native timings are not physical-phone FPS.
  A live high-progress Work-view test with eight purchases recorded 5.81 ms p95,
  54.40 ms worst frame, 3,022 instances and zero new descendants during purchases.
  Job cards now also preserve element identity while their reward/state is unchanged.
  The same Work-view purchase test after that cache change recorded 5.83 ms p95,
  35.39 ms maximum, 3,022 instances and zero added descendants. No renderer errors
  appeared. These are short desktop Studio samples using the phone emulator.

## Paid offer audit

Read from Roblox MarketplaceService in the current Studio client on this audit:

| Offer | Displayed Robux |
|---|---:|
| VIP | 400 |
| 2x job rewards | 240 |
| 2x property income | 480 |
| 2x energy regen | 160 |
| 2x stamina regen | 160 |
| No deposit fee | 120 |
| Starter Pack | 2 |
| Energy / stamina refill | 20 each |
| Cookie Delivery | 144 |
| Cookie Motherload | 512 |
| Grandma's Crate | 200 |
| Baker's Crate | 80 |
| Santa's Crate | 400 |
| 4h / 8h / 24h shield | 40 / 72 / 160 |

The larger cookie delivery gives eight times the production time for about 3.56
times the price. Shield hourly prices decrease from 10 to 9 to 6.67. Starter Pack
is a deliberately cheap introductory offer; its flat 50,000 cookies does not scale
and its collection bonuses cannot be repeatedly stacked. Receipt retry and paid
random-item policy handling remain mandatory and tested. Prices are fetched from
Roblox, never charged from a client-side hardcoded price.

**Unresolved:** Grandma's Crate is worse and more expensive than Baker's Crate:
65/25/9/1% Common/Uncommon/Rare/Legendary vs 40/35/20/5%. Recommend Grandma's Crate
at 40 Robux (the intended displayed sale price), retaining its current odds and
all purchased entitlements. This requires a Creator Dashboard price change; no
price-editing capability is exposed by the connected Studio tools. Do not claim
this mismatch fixed or silently alter already-advertised crate odds.

## Completion checklist

- [x] Enumerate all current costs, payouts and upgrade tiers.
- [x] Early, casual, bakery-only, 24-hour and repeated-rebirth pacing simulations.
- [x] Upgrade monotonicity, tap XP, bulk quote and principal/profit tests.
- [x] Core model suite and relevant existing UI regressions.
- [x] Initial core balance sync and live wrinkler/tapping verification.
- [x] Scaled charity integration sync and live UI checks (no clipped job/charity text).
- [x] Live high-progress performance sample before the final job-card cache change.
- [x] Final cache/upgrade-price sync and performance check.
- [ ] Correct the dominated paid crate price externally and recheck live value.
- [x] Final in-game tests: all 25 native game suites; six UI regression suites
  passed before the star change, with the affected Stars suite rerun afterward.
- [x] Every upgrade checked in live Studio (204 boosted/unboosted purchases),
  plus isolated unlock-level purchases and displayed/awarded click agreement.
- [x] Star taper synced and verified in the running server. Both new Stars labels
  fit the 359x738 phone viewport; Studio console shows no render errors. Temporary
  verification clones removed and the original game UI restored.
- [ ] Whole-scope completion, pending the external crate-price correction above.
