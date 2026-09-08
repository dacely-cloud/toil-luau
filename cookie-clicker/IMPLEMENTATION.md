# Bakery expansion implementation and verification

The scope is the complete attached `pasted-text-1.txt`, plus subsequent UI and artwork instructions. This is a current audit, not a claim that the full goal is complete.

## Requirement audit

| Requirement | Current implementation | Evidence and remaining work |
| --- | --- | --- |
| More upgrades and achievements | All 20 buildings have multiple upgrade tiers; achievement progression | Model.spec passes. Full visual catalog review remains. |
| Golden cookies and temporary bonuses | Small falling golden cookie, server-owned expiry/claim and variable duration; temporary double baking | Model.spec verifies one-time claims and exact bonus expiry. Falling motion was observed in Studio; physical golden-cookie tap still needs verification. |
| Sounds, purchase feedback, achievement popups | Reusable sound pool, notices and achievement events | Present in Audio/App/Server; purchase counters and notices observed. Sound mix remains a subjective review item. |
| Artwork | Named lookups from ReplicatedStorage.ImageConfig for buildings, jobs, properties, items, badges, cookies and currency | Live ImageLabels verified. New cursor in shop/middle; old cursor around cookie, per user. Image mappings and all building render branches pass regression. |
| Mobile, PC and controller | Responsive portrait/landscape, native mobile pixels, desktop zoom, CoreGui safe-area sizing, gamepad bake action and initial selection | Layout.spec covers 13 sizes. Portrait safe area observed at 401x719 inside a 401x777 viewport. Physical touch/controller navigation and all pages still need coverage. |
| Save/rejoin and offline income | Session-locked UpdateAsync saves, retries, eight-hour offline cap, property income included | Persistence.spec: 8 pass, including stored lease expiry after retries. Published-server save verification is still outstanding. |
| Rename and fuller settings | Filtered bakery name; sound and reduced-motion toggles | Code and save restoration tested. Settings remain limited to these controls. |
| Late-game systems | Ascension, three heavenly boosts, permanent slot, sugar lumps/levels, garden, market, helpers, spells and seasons; cookie buddies stand in for wrinklers | Model.spec covers the simplified rules. Full requested late-game UX and wrinkler interaction remain incomplete; this is not full original-game parity. |
| Jobs | Energy, level gates, instant cookies/XP, server-generated item roll | Economy.spec and MultiplayerFlow.spec pass; job remote actions and resource updates observed live. |
| Properties | Stand/store/market purchases, escalating price and passive income | Economy.spec and integrated save/rejoin test pass. Bakery CPS now includes property income. |
| Inventory, collection and rarity shop | Items with fixed prices/rarity; one-copy collection deposits grant multipliers | Economy.spec and three-player flow verify purchase, inventory and deposit conservation. Complete interactive page coverage remains. |
| Cookie jar | Deposits and withdrawals preserve total cookies without inflating earned cookies | Economy.spec and integrated fundraiser funding pass. |
| Charity and stealing | Four timed tiers, jar funding, helper cookies/XP, stamina costs, theft cap/insurance and one-time payout | Social/CharityService/MultiplayerFlow tests pass. Real simultaneous clients and published shared records remain unverified. |
| Empires | Filtered name, configured picture choices, membership, stamina donations, leader upgrades and economy/insurance perks | EmpireStore/EmpireService tests and integrated three-player flow pass. Real multiplayer UI and cross-server membership need verification. |
| Cheat resistance and recovery | Server-owned amounts/costs, action and sync limits, validated saves, shared operation receipts, saved debit-before-credit outboxes | Tests cover invalid inputs, repeat claims, lost responses, crash recovery, final-save failure and callback retries. This does not prove absence of all exploits. |
| Monetization plan | Proposed developer products/passes, receipt persistence, ownership checks, launch gates | MONETIZATION.md complete as a plan. Paid offers are not implemented or enabled. |
| Performance and end-to-end behavior | Bounded animation pools; counter components; structural render signatures; rate-limited sync | Limited Studio sample below. Full page, device and multiplayer profiling remains open. |

## Recent defects fixed

- First purchase and closing menus hit a deleted `icon()` helper in the owned-buildings view. It now uses configured images; a regression executes that actual render branch for empty, first and bulk purchases across all 20 buildings.
- A labeled-break translation error allowed suspended work to reach commit with a number as the finished fiber. Translator regressions cover nested switch/loop exits. Earlier resumed-child bailout handling is also covered by a dedicated regression.
- Stale empire membership now loses perks on a successful confirming read. Failed reads preserve the cache. Rejoining recovers the last donation sequence.
- Save retries no longer extend the local lease beyond the expiry actually persisted.
- Full-screen layout now respects Roblox CoreGui safe insets. News and the compact bottom resource strip are retained.
- One Studio run lacked client PlayerGui while both the game and Roblox chat waited. A fresh run mounted normally. The original startup failure has not been explained; do not count it as resolved by a restart.

## Current checks

On 2026-09-08, all native Model, Economy, Social, Persistence, CharityService, EmpireStore, EmpireService, MultiplayerFlow and Layout suites passed, together with `node scripts/test-cookie-building-view.mjs`.

MultiplayerFlow.spec exercises three independent player sessions with the real services: jobs, item purchase and collection, property, jar, empire joins/donations/upgrade, help/theft, persisted shutdown, fresh-service rejoin, offline income and one-time charity claim. Its datastore is a deterministic adapter, not Roblox's live DataStoreService.

A limited Studio client sample sent 60 click requests over 4.17 seconds: 965 rendered frames, p95 frame duration 5.45 ms, maximum 36.73 ms, 18 snapshots, ready state preserved. This measures remote click processing and counter updates in that session. It does not exercise physical click particle creation, every menu, or mobile hardware performance.

## Open completion gates

1. Published-server save, rejoin, offline and shared-record verification.
2. Real simultaneous-player charity/empire interactions, including disconnect/retry paths.
3. Full UI action coverage on desktop, portrait, landscape and controller, including failure messages and scrolling.
4. Finish the late-game interactive experience and fuller settings; review the Work social screens for the requested visual, kid-friendly presentation.
5. Profile physical clicking, animations, scrolling and periodic updates with the expanded UI on representative devices.
6. Investigate the intermittent missing PlayerGui startup if reproduced.
7. Refresh and verify the standalone place artifact with the final runtime, game modules and ImageConfig.

The goal remains active until these requirements are implemented and verified at their intended scope.
