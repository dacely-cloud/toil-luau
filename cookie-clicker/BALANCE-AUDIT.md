# Cursor, rebirth and reward audit — September 11, 2026

Synced six modules to Idle Cookie Game, place 85138609584604, and restarted
Studio successfully. Local source and staging contain the same changes.
Not published. Original Studio sources are in tmp/balance-sept11-studio/.

## Findings and changes

- Studio still had the older 1B/cubic rebirth curve and one-hour price cap for
  every building. Applied the already-tested local 100B/fourth-power curve
  and progressive late-building prices. The Stars page now calls starGoal,
  rather than displaying a separate, incorrect cubic goal.
- Cursor fleets previously repeated the entire production-scaled manual reward
  for every cursor. Keep flat upgraded tap power per cursor, but smoothly limit
  the fleet's combined production-derived bonus to 25% of the production basis.
  Total income still increases with each cursor, and cursor upgrades still help.
  Manual clicks and the ten-second cursor animation cadence are unchanged.
- At 10,000 cursors plus 7,000 grandmas without boosts, manual clicks remain 401;
  automatic taps become about 2.99 instead of 401. The fleet earns about 2,990
  cookies/sec instead of 401,000. The general cap is tested with stacked passes,
  heavenly upgrades, collections, stars, friends and temporary bonuses.
- Purchased cookies remain spendable but no longer increment baked earnings
  or directly grant star chips. Existing stars, chips and earnings are preserved.
  Spending purchased cookies on producers still increases future production.
- Applied the item shop fixes: level gates, rarity prices, tier bonuses capped
  at twice base, bounded resale refunds, finite duplicate prices and legacy saves.
- Studio's campaign cancellation recalculated its refund from current income.
  Applied the fixed booking-cost refund and profit-only baked-income accounting,
  including legacy recovery. Free inventory cannot inflate item resale refunds.
- Jobs, campaigns and charity pricing already use stable production rather than
  temporary golden/friend boosts or recursive cursor output. Retained their
  advertised duration/reward rules and validated the existing accounting tests.
- Preserved Studio's newer jobsDone tracking, onboarding UI and tier feedback.

## Progression evidence

Deterministic heuristic with buildings, upgrades, collection tiers, jobs,
properties, decor, campaigns, spells and some golden cookies; no paid consumable
spam, random drops or coordinated empire/charity activity. Rebirths occur when
the available gain can double owned stars. Estimates are not optimal play or
real player telemetry. Old/updated below use the same local shop rebalance.

| Profile | First rebirth before cursor cap | After | Claimed stars at 24h, before → after |
|---|---:|---:|---:|
| 2 manual taps/sec | 7,080s | 10,283s (~2h 51m) | 16 → 4 |
| All passes, 10 friends, 8 taps/sec | 4,399s | 5,898s (~1h 38m) | 16 → 8 |

Pending unclaimed stars are not counted in the last column. Neither profile
owns the final building at 24 hours. Existing advanced saves retain their
progress and may advance faster than these fresh-save profiles.

Reproduce with `luau scripts/simulate-balance.luau -a rebirth 1` or
`luau scripts/simulate-balance.luau -a boosted_rebirth 1`.

## Validation

All 33 native suites pass, including stacked cursor caps, monotonic income,
exact server awards, paid-currency exclusion, rebirth replay prevention, old
star ownership, item saves and campaign accounting. App/Model/Economy compile.
Studio server verified cursor awards, level-20 crown lock, paid-cookie exclusion,
and exact 100B/1.6T star goals on isolated states. Client mounted and opened the
item shop with no game errors in the console. No saved player state was edited.
