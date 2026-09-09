# Game audit — September 9, 2026

Scope: current Cookie Clicker economy, progression, server action validation,
saving, purchases, multiplayer services, UI navigation, layout and Toil rendering.
This is a code-and-Studio audit, not certification of published operation or
physical-device performance.

## Findings addressed

- **Rebirth was too easy after production changes.** First chip now needs one
  billion lifetime baked cookies. Further chip thresholds remain cubic; existing
  chips and owned permanent boosts are preserved. Actual-model simulations reach
  the first chip in 97/110/131 minutes for active/casual/bakery-only profiles.
- **Permanent progression had only three cheap purchases.** Nine boosts now cost
  3–25 chips, with prerequisites for advanced baking/tapping. The shared catalog
  controls UI, charging, effects and save restoration. New effects include faster
  energy/stamina recovery and increased job/property rewards.
- **Unchanged boost cards rebuilt during purchases.** Cached cards now retain
  their elements until ownership, affordability, prerequisite, font or geometry
  changes. Isolated nine-purchase Studio samples: before p95 20.92 ms/max 60.17 ms;
  after p95 5.67 ms/max 34.62 ms. Both samples added one descendant when the
  permanent-slot explanation appeared. All nine buttons reached Owned.
- **Very large currency labels became enormous decimal strings.** Values above
  the named suffix range now use compact scientific notation.
- **Render-policy test had stale dependencies.** Added its missing background
  resolver so the test again checks hidden-panel work, counter updates and visible
  affordability. Added one repeatable audit command rather than relying on a
  handpicked subset of tests.
- **Previous charity fix reverified:** duration/production scaling, large jar
  transfers, persisted investment, lost-response retries and profit-only payouts.
  Already running funds keep their agreed investment/payout.

## Verification

Run `npm run audit:game` from the repository root. It passed:

| Area | Evidence |
|---|---|
| Economy and progression | 27 native game suites: all buildings/upgrades, click scaling, prices, XP, stars, jobs, items, collections, properties, minigames, milk and wrinklers |
| Save correctness | Session locks, failed/retried saves, rejoin/offline rewards, persisted purchases and restoration |
| Multiplayer | Injected three-player flow; empire membership/donation/removal races; charity debit-before-credit, repeated visits, claim retries and shields |
| Monetization | Six passes, eleven products, crate distributions, receipt idempotency, account restrictions and injected Roblox adapter behavior |
| UI | Nine suites: purchase targets, affordability, prerequisites, navigation/back, menu state, rendering policy and large-number formatting |
| Engine | 82 checks across spike, host, CSS and translator; includes Path2D, animations, Fragment handling, keyed replacement and retained updates |
| Compiler/reconciler | Labeled switch control flow and resumed bailout regression checks |
| Studio | Nine boost cards and 27 text labels fit 359×738 viewport; all nine purchases completed in an isolated clone; no console render errors |

`BALANCE-TABLES.txt` enumerates current prices/rewards, including permanent boosts.
`BALANCE-SIMULATION.txt` contains regenerated four-hour and 24-hour profiles.
The runtime tests use existing compiled `out/` artifacts; no engine source was
changed or rebuilt in this audit. Game changes are synced to Studio and the
47-script local place artifact. Test clones exist only in Play mode; stopping the
test returns Studio to its original Edit mode without changing player saves.

## Open findings and limits

1. **Paid crate pricing remains inverted.** Live MarketplaceService still returns
   Grandma 200 Robux versus Baker 80, while Grandma has worse odds. Recommended
   Grandma price: 40 Robux, product 3711874043. Connected tools cannot change
   Creator Dashboard prices. No odds or purchased entitlements were changed.
2. **Published operation is unverified.** Save/API failures, replay and multiplayer
   races were tested with injected stores/services. Real cross-server contention,
   DataStore budgets, invite joins and actual paid fulfillment need a published
   multiplayer session. This audit did not publish or spend Robux.
3. **Physical phones remain unmeasured.** Layout tests cover 13 viewport/input
   combinations; live inspection used the 359×738 Studio emulator. The measured
   worst frame still exceeds a 60-FPS frame budget. Sustained thermal/GPU/network
   behavior cannot be inferred from these short desktop samples.
4. **Some activities remain early-game content.** Stock prices and helper cookies
   are fixed (help gives 50 cookies and 20 XP). Property caps and finite collectible
   bonuses also limit their late-game role. Main jobs and fundraiser investments
   scale; the fixed activities are not equivalent long-term earning strategies.
5. **Balance estimates are not telemetry.** Simulations use deterministic purchases
   and omit paid currency, minigames and item drops. Repeat rebirths are a heuristic,
   not an optimal strategy. Real retention and progression still require observation.
