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
| Save/rejoin and offline income | Session-locked UpdateAsync saves, retries, eight-hour offline cap, property income included | Persistence.spec: 10 pass, including stored lease expiry after retries and collectible IDs across rejoin. Published-server save verification is still outstanding. |
| Rename and fuller settings | Filtered bakery name; sound, saved 0?100% volume and reduced-motion controls | Save restoration and malformed volume inputs tested. Live volume interaction still needs verification. |
| Late-game systems | Ascension, three heavenly boosts, permanent slot, sugar lumps/levels, garden, market, helpers, spells and seasons; individual wrinkler balances, spawning and pop controls | Model.spec has 24 passing cases; Wrinklers.spec covers production conservation, spawn boundaries, offline feeding and restoration. Creature artwork/direct interaction around the cookie and fuller late-game visuals remain incomplete. |
| Jobs | Energy, level gates, instant cookies/XP, server-generated item roll | Economy.spec and MultiplayerFlow.spec pass; job remote actions and resource updates observed live. |
| Properties | Stand/store/market purchases, escalating price and passive income | Economy.spec and integrated save/rejoin test pass. Bakery CPS now includes property income. |
| Inventory, collection and rarity shop | Items with fixed prices/rarity; one-copy collection deposits grant multipliers | Economy.spec and three-player flow verify purchase, inventory and deposit conservation. Complete interactive page coverage remains. |
| Cookie jar | Deposits and withdrawals preserve total cookies without inflating earned cookies | Economy.spec and integrated fundraiser funding pass. |
| Charity and stealing | Four timed tiers, jar funding, helper cookies/XP, stamina costs, theft cap/insurance and one-time payout | Social/CharityService/MultiplayerFlow tests pass. Two real Studio clients verified start/help/theft and exact rewards. Actual 30-minute expiry test is running; published shared records remain unverified. |
| Empires | Filtered name, configured picture choices, membership, stamina donations, leader upgrades and economy/insurance perks | Store/service tests and real two-client create/join/donate/upgrade flow pass. Actual App branch tests cover controls at four widths. Physical navigation and published cross-server membership still need verification. |
| Cheat resistance and recovery | Server-owned amounts/costs, action and sync limits, validated saves, shared operation receipts, saved debit-before-credit outboxes | Tests cover invalid inputs, repeat claims, lost responses, crash recovery, final-save failure and callback retries. This does not prove absence of all exploits. |
| Monetization plan | Proposed developer products/passes, receipt persistence, ownership checks, launch gates | MONETIZATION.md complete as a plan. Paid offers are not implemented or enabled. |
| Performance and end-to-end behavior | Bounded animation pools; counter components; structural render signatures; rate-limited sync | Limited Studio sample below. Full page, device and multiplayer profiling remains open. |

## Recent defects fixed

- First purchase and closing menus hit a deleted `icon()` helper in the owned-buildings view. It now uses configured images; a regression executes that actual render branch for empty, first and bulk purchases across all 20 buildings.
- A labeled-break translation error allowed suspended work to reach commit with a number as the finished fiber. Translator regressions cover nested switch/loop exits. Earlier resumed-child bailout handling is also covered by a dedicated regression.
- Stale empire membership now loses perks on a successful confirming read. Failed reads preserve the cache. Rejoining recovers the last donation sequence.
- Save retries no longer extend the local lease beyond the expiry actually persisted.
- Full-screen layout now respects Roblox CoreGui safe insets. The announcement is removed. Avatar, bakery name, level, energy, stamina and large cookie counters share a compact 116px logical profile above the cookie. A separate full-screen backdrop covers the inset area while interactive content stays within CoreUISafeInsets.
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

## Controller navigation follow-up

Added B-button back navigation through confirmations, empire editing, Work sections, menus and mobile pages. A small controller-only focus check recovers selection when a UI target disappears or becomes hidden, without taking focus from Roblox menus. `node scripts/test-cookie-navigation.mjs` executes the actual back-navigation closure and passes all routes. Studio mounted without new errors. VirtualInput rejected ButtonB as a CoreGui-reserved key, so this is not physical-controller verification.

## Standalone build and Jar/Charity verification

The full `npm run cookie:build` pipeline passed after the UI changes. `python scripts/refresh-cookie-place.py` refreshed 33 runtime/game sources in `cookie-animation-test.rbxlx` and checked each serialized source against staging before replacing the artifact. This verifies packaging, not a fresh playtest of that standalone file.

Jar UI now has the configured image on the left and amount/transfer controls on the right. Put in, Take out and Start a cookie party were all within the visible desktop panel. An input-tool test selected 500, deposited it, and opened the fundraiser choices, which displayed 500 available in the jar. Studio returned to Edit before the start action, so the updated start-party button still needs interactive verification. Locked shop icons now show ???; unlocked images remain configured assets.

## Compact profile and More navigation

Studio verified a 116 logical-pixel profile, 31px cookie count and 19px CPS text. The backdrop fills the 2497x1042 viewport while controls use the 2497x984 safe area. No uncaught render errors appeared in this run. Options and Stats live in More. Back returns from those pages to More; controller focus recovery targets the existing More button. The extracted navigation regression now covers those routes, Garden back navigation, and focus destinations. Physical controller verification remains open.

## Empire membership recovery

Create, join and leave now persist a pending membership operation before changing the shared empire record. Ambiguous write failures retry the same operation after rejoin; definitive rejection clears it. Final-save failures block additional empire changes until the player link is durable. Restore validates pending membership fields, and the server includes them in the pending UI state and retry worker. EmpireService.spec covers initial/final save failures, lost committed responses, restored create/join/leave operations and rejected joins/leader leaves. EmpireStore, Economy, Persistence and MultiplayerFlow suites also pass. These are deterministic service tests; published cross-server verification remains open.

## Late-game correctness follow-up

Lucky spells now call the shared golden-cookie spawn function, resetting start time, duration, position and next scheduled spawn. This prevents an old animation offset from putting a newly cast cookie off-screen and prevents an overdue regular spawn from replacing it immediately. Ascension preserves saved sound volume. Building levels stop at 100, matching save restoration. Model.spec now has 23 passing cases, including all three regressions; Persistence and MultiplayerFlow also pass. Interactive wrinklers remain unfinished.

## Individual wrinkler rules and controls

Wrinklers now have monotonic IDs and separate saved balances. Inviting requires ten grandmas; one arrives immediately, then one per minute up to ten. Each holds 5% of building production and returns its own balance plus 10% when popped. Pausing preserves balances. The Adventure/Buddies page exposes individual Pop controls and collect-all; the displayed CPS reflects retained building income. Existing buddy balances migrate once. Wrinklers.spec covers eight-hour versus one-second tick equivalence, bonus boundaries, conservation, cap, repeated IDs, malformed saves, legacy migration and real Persistence adapter round trips with offline feeding. Creature artwork and direct interactions around the cookie are still pending the image choice; these controls do not constitute completed visual wrinkler support.

Level-based backgrounds read named assets from ImageConfig.BakeryBackgrounds at five-level milestones. Level 5 uses the supplied 121801422919701 image with proportional cropping, behind cookie content (ZIndex 0 versus 2). Studio starts at level 5 for preview; published new players still start at level 1. Level 10+ artwork has not been supplied, so the last configured image remains. The corrected background layering was visually verified in portrait Studio.

## Cookie-button input performance sample

In the 401x777 portrait Studio emulator, the input tool clicked the actual bigCookie button, exercising React press/hover handling and particle emission. After 12 warm-up clicks, a 12.004-second sample recorded 20 MouseButton1Click events, 1,265 rendered frames, average 105.47 FPS, p95 frame time 17.783 ms and maximum 51.165 ms. Forty-seven snapshots arrived. The clickEffects subtree stayed at 60 descendants with zero new descendants during the sample. Thirty test clicks were requested; only the 20 inside the sampling window are counted. No uncaught-render/subtreeFlags errors appeared in the current log. The temporary probe and its event connections were removed. This covers actual button input in Studio emulation, not touch hardware, controller input, all menus or multiplayer performance.

## Charity UI branch verification

`scripts/test-cookie-charity-view.mjs` executes the actual App charity branch at widths 320, 401, 600 and 900. It verifies tier-to-request mapping for all four fundraisers, insufficient jar funds, save-pending suppression, the exact claim-time boundary, self/expired-party exclusion, and Help/Steal player IDs. It passed. A concurrent Studio interaction attempt did not complete because the visible menu changed between tool calls; no successful start-party sequence is claimed. The shortcut center also produced a VirtualInput CoreGui rejection despite CoreUISafeInsets and a reported 58px inset; a lower point worked. This alone does not prove a game layout defect, and real touch navigation remains unverified.

## Empire visual presentation

The Empire page now uses configured images for four perk cards and joinable team cards. Jobs/property income displays the combined multiplicative empire bonus, matching Model.economyAction and propertyIncome. Progress names the next level; level 100 has no invalid upgrade button. Donation controls respect stamina and pending-save state, and create/join/rename/leave controls do not send another empire operation while one is pending. Syntax and navigation/charity regressions pass; live multiplayer rendering of multiple team cards still needs verification.

## Live malformed-request sample

Sent 13 malformed requests through the running client's real Action remote: negative jar deposit, infinite withdrawal, nonexistent property/item collection, table item ID, NaN building level, table stock/heavenly choices, invalid wrinkler ID, invalid trade index/quantity, and negative/infinite volume. Subsequent snapshots remained ready with no changes to buildings, upgrades, levels, stocks, heavenly purchases, volume, jar, inventory, collection or properties. This checks these specific invalid inputs, not all possible exploit sequences. Real published save/rejoin testing still needs the private test-place target and real player sessions; the current Studio connector offers no simultaneous-client launch tool.

## Standalone place: real two-client smoke test passed

On 2026-09-08, an isolated copy of cookie-animation-test.rbxlx was opened in a separate Studio process. A temporary marker-gated plugin used StudioTestService.ExecuteMultiplayerTestAsync(2). The unchanged game modules ran with two real client DataModels and the server Action remote. Both clients (-1 and -2) mounted CookieClickerGui, saw two social players, processed ten clicks plus a dishes job, received 40 cookies and 10 XP, spent job energy, and rejected a negative deposit. Server output reported ok=true for both clients and ended the test. No uncaught-render/subtreeFlags messages appeared in its log. The temporary local plugin and dedicated Studio process were removed afterward; the user's original Studio process stayed open.

Harness sources: scripts/standalone-smoke.client.luau, scripts/standalone-smoke.server.luau, scripts/prepare-standalone-smoke.py. Preparation creates a disposable .studio-stage/standalone-smoke.rbxlx and a marker-gated temporary local plugin. The basic multiplayer launcher limitation is resolved through StudioTestService, despite the MCP tool only exposing solo Play. This is not yet charity/empire multiplayer verification or published DataStore verification.

Evidence log: C:/Users/felix/AppData/Local/Roblox/logs/0.737.0.7371584_20260908T072532Z_Studio_D60EC_last.log, result at 07:25:47.758Z.

## Real two-client charity and empire flow passed

The extended standalone harness ran two real Studio client DataModels against the normal game server. Player -2 earned funding with jobs, deposited 500 cookies, and started a 30-minute fundraiser at 750 cookies. Player -1 helped (+50 cookies, +20 XP, 5 stamina) and stole (+25 cookies, 10 stamina). The owner's pot became 825, matching both actions. Player -2 created Cookie Team through the normal filtered-name remote; player -1 discovered and joined it. Both donated 50 stamina, the leader spent the resulting 100 points to upgrade, and both clients observed level 2. Each client reported success; the server ended with ok=true. The member saw the leader's upgrade on the existing periodic refresh (about 14 seconds after the leader), rather than instantly.

Evidence: C:/Users/felix/AppData/Local/Roblox/logs/0.737.0.7371584_20260908T072757Z_Studio_6DB54_last.log, final result 07:28:47.323Z. The temporary plugin and dedicated test process were removed. This verifies real simultaneous-client remotes and replication in Studio; it does not verify UI button navigation for those actions, fundraiser expiry/claim after 30 minutes, disconnect/rejoin recovery, cross-server replication or published DataStore persistence.

## Prompt same-server empire updates

Empire writes now carry monotonic record revisions. Confirmed shared mutations fan out to matching local members without additional datastore reads. Older responses cannot overwrite newer records; updates for a previous team are ignored. Create/join/leave and donation recovery behavior remains covered. The real two-client charity/empire harness passed again with donation/upgrade visibility deadlines reduced to eight seconds (below the 15-second periodic refresh). Both clients reported the upgraded level in the same server-log timestamp, 07:31:42.248Z. Evidence: 0.737.0.7371584_20260908T073121Z_Studio_40C1C_last.log. The temporary test process and plugin were removed. Cross-server updates still use periodic reads.

## Collectible IDs across reset and rejoin

Ascension now retains the wrinkler and golden-cookie ID counters while clearing active creatures/drops. Golden-cookie ID counters restore from saves without restoring an active golden cookie. Regression tests verify that previous-run IDs cannot collect newly spawned objects, and that rejoining advances golden IDs. Model.spec has 24 passing cases; Persistence.spec has 10; the wrinkler suite also passes.

## Real-time fundraiser expiry test in progress

The long two-client harness rejected an early claim and is waiting for the actual 30-minute expiry at 2026-09-08 08:07:04 UTC. It will then check exact payout and repeat-claim rejection. Active process and server-log coordinates are recorded in .studio-stage/fundraiser-test-run.json; revalidate the process and log, not this note, before deciding whether it is still running. This is not a completed test yet. The harness now synchronizes owner initial-pot verification before helper actions, fixing a test-only race found on the first attempt.

## Magic page and Empire control verification

Magic now shows configured tower/cookie artwork, a recharge meter, pictured spell cards and remaining recharge seconds. Locked or undercharged controls do not send a spell request. The server still validates tower ownership and spends magic. `test-cookie-magic-view.mjs` executes the actual App branch at four widths and checks both exact cost boundaries, locked towers, artwork references and action targets. It and navigation regressions pass; App compiles and is synced to Studio. Visual review and physical spell taps remain open.

`test-cookie-empire-view.mjs` passes at four widths for deduplicated join choices, target IDs, name input, badge selection, owner/member controls, donation affordability, pending-save suppression and the maximum-level boundary. These branch tests supplement the real two-client remote flow; they do not prove physical touch/controller navigation.

## Seasonal hunt progress and feedback

The Seasons page now shows five configured golden-cookie images as progress toward the next bonus, the two-minute baking reward with its 500-cookie minimum, active hunt selection and a pause control. The fifth-cookie payout now appears in the existing server-generated golden-cookie notice instead of being silent. Model.spec has 25 passing cases, including both reward-message branches, duplicate collection rejection, pause and switching hunts without losing progress. App compiles; navigation and Magic regressions pass. App/Model are synced to Studio and the standalone artifact. Physical seasonal-hunt UI interaction remains unverified.
