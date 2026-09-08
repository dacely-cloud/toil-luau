# Bakery expansion implementation and verification

## Empire friend invitations

Empire members can open Roblox's friend picker with Invite a friend; its ExperienceInviteOptions carries the empire ID as launch data. The server polls join data for up to ten seconds, validates the ID, resolves the actual empire record, and offers a ten-minute join card. For players already in the server, individual invite buttons send a server-validated two-minute invitation. Recipients see Join empire / Not now and are brought to the Empire page; acceptance uses the existing persisted join action, with no automatic membership or perks. Invitations are session-only, expire, cannot overwrite an unanswered invitation, and have a five-second sender cooldown. Existing members, invalid IDs, inactive inviters and closing recipients are rejected. Tests execute the actual invitation server branch and UI at four widths, including pending-save acceptance suppression and request targets; EmpireService recovery tests pass. Sources compile, Studio mounts, and the artifact is refreshed. Actual Roblox notification delivery and cross-server launch-data arrival still require a published experience and consenting test friends; those are not claimed as verified.

## Purchase XP balance

New lifetime ownership records award 1 XP per building for types 1–5, 2 for 6–10, 3 for 11–15, and 4 for 16–20. Each first-ever boost purchase awards 5 XP. Jobs remain unchanged at 10/25/60/130 XP. Bulk buys award only the units actually bought, equal to individual purchases. Sales, failed purchases, rebuys below the previous ownership record, and boost repurchases after ascension award no XP. Economy stores validated lifetime records through save/rejoin and ascension; old saves initialize from existing ownership without retroactive XP. Server purchase notices include earned XP and the existing resource snapshot updates level displays. PurchaseXp, Model (25), Persistence (10), Economy and MultiplayerFlow checks pass. A live fresh cursor purchase through the production server route added exactly 1 XP. Source and standalone artifact are synced.

## Frame-spike follow-up with warm and inactive controls

In the same high-progress scenario with animations enabled, 14 warm-up clicks populated the effect pool. A 12-second active sample then captured 29 clicks: 228.74 FPS average, 6.141ms p95, 138.789ms maximum, and two frames over 30ms. Descendants stayed exactly 1,012 with zero additions. This rules out new GUI instance creation as a necessary cause of those spikes. A subsequent 12-second idle sample measured 236.59 FPS, 5.643ms p95, 12.032ms maximum and no frames over 30ms. Thirty input-tool clicks on an inactive area then measured 233.82 FPS, 5.745ms p95 and a 151.221ms spike. The server counter remained at 44, matching the 14 warm-up plus 30 requested cookie clicks; the inactive clicks did not bake. The evidence does not isolate the responsible subsystem: an input/Studio/tool effect is plausible, but no root cause or performance fix is claimed. Physical-input profiling or a Studio profiler capture remains needed. All probes and the isolated scenario were removed and normal UI restored.

## High-progress click profile: spike still unresolved

The isolated UI/Model scenario owned ten of every building (all 20 types), with decorative animations enabled and no persistence writes. At desktop viewport 2056x817, a 12.001-second sample measured 2,745 frames, 228.73 FPS average, 6.0651ms p95 and 142.6979ms maximum. It captured 28 actual bigCookie Activated events. Descendants increased from 952 to 1,012, with 60 additions. This was not warmed up; the counts are consistent with first-use effect creation, but the sample did not record timing correlation, so the spike's cause is not established. A warmed sample with spike/allocation timing is needed before treating this as acceptable late-game performance. Probe connections, the temporary scenario and test GUIs were removed; normal UI was restored. Current ascension/building/charity/empire/garden/magic view regressions and navigation regression also passed.

## Bake shortcut live handler verification

The Studio keyboard-input tool sent three ButtonR2 presses; production server snapshots advanced clicks/cookies from 1/1 to 4/4. With the bakery TextBox focused, another ButtonR2 left both at 4. Focus was then released. This verifies the ContextAction bake binding, its typing guard and its server route. UserInputService classified the synthetic input as Keyboard/MouseButton1, so it does not verify physical gamepad selection or navigation. A ButtonB attempt was rejected by VirtualInput as permanently bound to a CoreGui action; that test remains unavailable through this tool. No gameplay code was changed for this check.

## Immediate audio volume and muted playback

Audio.setVolume now updates every pooled sound using its individual cue gain, so an already-playing cue follows the volume setting immediately. At zero volume, play returns without starting silent cues. A temporary Studio module using the actual Audio source created six sounds: a playing success cue changed to Volume 0.125 at 25%; muting stopped every sound; 100 muted play requests produced zero additional Played events; unmuting resumed playback; disabling suppressed it; destroy removed all six sounds. The test module was removed. Syntax passed; Audio was synced to persistent Studio source and the standalone artifact refreshed. No claim is made about subjective loudness or hardware audio quality.

## Live bakery rename and manual-save controls

Desktop input clicked and focused the Options text box, entered `Sunny Cookies`, then clicked Use this name. The production Server router and TextService filter returned a snapshot with matching bakery/customName and a success notice. A second UI submission restored the displayed `MasterMind's bakery` name after the rename cooldown. An earlier text-input attempt without actual focus left an empty field; the server rejected it and preserved the original name. Save now then displayed `Saved for this test only`. This proves these UI/router/filter paths in Studio, not published persistence or restoration of the original absence of a customName field. The test emulator remains `default`. Config inspection found no wrinkler creature asset; the requested asset ID and private published test-place target are still needed for those completion gates.

## Stats text fit and volume controls

Stats now stacks names above values when its available text width is below 540px; wider panels use proportional columns. Achievement rows follow the computed statistics height and allow wrapping. Live TextFits checks passed for all 105 stat/achievement labels (including 88 achievement descriptions) at 320px and 401px emulated phone widths, a 900px desktop viewport, and the normal desktop viewport. A temporary `999.999 septillion` value also fit both phone widths. These are text geometry checks, not physical-touch navigation. The device emulator was stopped and safe-area sizing restored afterward. Actual desktop Options clicks changed volume to 90%, confirmed both by the server snapshot and visible label, then restored 100% with another confirmed snapshot. App syntax and the 37-script artifact refresh passed.

## Desktop versus touch layout detection

Layout.measure now requires a touch-layout flag before applying mobile width breakpoints. App derives that flag from TouchEnabled and PreferredInput (also retaining touch layout on a touch device without a keyboard), and reflows on PreferredInput changes. Desktop zoom is unchanged. Layout.spec passes 13 sizes for both input modes. Live keyboard-input checks at 1024x768 and 900x650 kept all three desktop columns and no mobile navigation, with scale 1. Studio was also still emulating `iphone_17_pro` at 401x777; StopSimulationAsync returned its device to `default`. Temporary size overrides were restored to full-scale sizing. App/Layout sources and the standalone artifact were refreshed.

## Small-screen wrinkler payout verification

An isolated high-progress Studio UI scenario reproduced clipped payout text at 320px: `3.651 quadrillion cookies` did not fit the 120px label beside Pop. The payout now occupies its own full-width row beneath the name and button, retaining 19px text. Live TextFits and non-overlap checks passed at safe-area sizes 320x568, 401x719 and 844x332 with quadrillion-cookie balances. An actual input-tool Pop click then produced a server-model snapshot with zero wrinklers. The temporary scenario was removed and the normal UI restored. These checks use Studio mouse input and an isolated Model bridge, not physical touch or production persistence. App syntax passed; the persistent Studio source and 37-script standalone artifact were refreshed.

The scope is the complete attached `pasted-text-1.txt`, plus subsequent UI and artwork instructions. This is a current audit, not a claim that the full goal is complete.

## Requirement audit

| Requirement | Current implementation | Evidence and remaining work |
| --- | --- | --- |
| More upgrades and achievements | All 20 buildings have multiple upgrade tiers; achievement progression | Model.spec passes. Full visual catalog review remains. |
| Golden cookies and temporary bonuses | Small falling golden cookie, server-owned expiry/claim and variable duration; temporary double baking | Model.spec verifies one-time claims and exact bonus expiry. Fixed mixed-unit fall keyframes; continuous motion and an actual desktop collection click passed in the isolated UI/server-model scenario. Physical touch remains unverified. |
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
| Charity and stealing | Four timed tiers, jar funding, helper cookies/XP, stamina costs, theft cap/insurance and one-time payout | Social/CharityService/MultiplayerFlow tests pass. Two real Studio clients verified start/help/theft, early-claim rejection, actual 30-minute expiry, exact 825-cookie payout and repeated-claim rejection. Published shared records remain unverified. |
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

## Real-time fundraiser expiry test passed

The long two-client harness passed at 2026-09-08 08:07:06.947 UTC after the actual 30-minute expiry. It verified a rejected early claim, exact 825-cookie payout and no duplicate payout from another claim. The owner ended with 1,165 cookies and the visitor with 115; both observed empire level 2. The server emitted `[ToilStandaloneTest] {"ok":true,...}` in `C:/Users/felix/AppData/Local/Roblox/logs/0.737.0.7371584_20260908T073647Z_Studio_27397_last.log`. The temporary marker-gated plugin was removed after success. Dedicated process 13056 remained open: automatic approval review rejected termination with "blocked by policy", and CloseMainWindow returned false. The main Studio instance was not targeted. This verifies real elapsed time and simultaneous Studio clients, not published DataStore persistence. The harness synchronizes owner initial-pot verification before helper actions, fixing a test-only race found on the first attempt.

## Magic page and Empire control verification

Magic now shows configured tower/cookie artwork, a recharge meter, pictured spell cards and remaining recharge seconds. Locked or undercharged controls do not send a spell request. The server still validates tower ownership and spends magic. `test-cookie-magic-view.mjs` executes the actual App branch at four widths and checks both exact cost boundaries, locked towers, artwork references and action targets. It and navigation regressions pass; App compiles and is synced to Studio. Visual review and physical spell taps remain open.

`test-cookie-empire-view.mjs` passes at four widths for deduplicated join choices, target IDs, name input, badge selection, owner/member controls, donation affordability, pending-save suppression and the maximum-level boundary. These branch tests supplement the real two-client remote flow; they do not prove physical touch/controller navigation.

## Seasonal hunt progress and feedback

The Seasons page now shows five configured golden-cookie images as progress toward the next bonus, the two-minute baking reward with its 500-cookie minimum, active hunt selection and a pause control. The fifth-cookie payout now appears in the existing server-generated golden-cookie notice instead of being silent. Model.spec has 25 passing cases, including both reward-message branches, duplicate collection rejection, pause and switching hunts without losing progress. App compiles; navigation and Magic regressions pass. App/Model are synced to Studio and the standalone artifact. Physical seasonal-hunt UI interaction remains unverified.

## September 8 artwork drop

Images2Config, CookieBackgrounds and MenuButtonConfig are mirrored from ReplicatedStorage into the build. Invalid `const` declarations were changed to Luau `local`. All 34 upload decals resolved successfully through InsertService; original decal-to-texture mappings remain in each module's UploadTextures table. ImageConfig imports the six new activity icons, fifteen namespaced zone backgrounds, ten bakery backgrounds and three menu faces without colliding with existing content icons. Every five levels selects the next CookieBackgrounds.NAMES entry (levels 5–50); below five stays blue and above fifty retains the last image.

Zone images sit inside card borders under separately layered text/buttons. Jobs, properties, items, jar, charity and matching building rows use the new backgrounds; the stand keeps its cached blur. Adventure uses the new Stars/Boosts/Levels/Friends/Garden/Helpers icons. The six icons, first bakery background and menu images were observed loaded in Studio; item backgrounds and borders were visually reviewed. An AssistantCommand ContentProvider preload probe reported Failure even for those visibly loaded assets, so that probe is not counted as proof for or against the remaining images.

Menu faces are enlarged beyond their transparent padding, can extend upward over the milk, and have no gold selection outline. More uses a separate 1.65 zoom (other faces 1.5) with a common top offset. Native image click feedback reached tint 0.5686 and scale 0.94, then returned to white/scale 1 with exactly one scale instance. Tweens are canceled on replacement/unmount; reduced motion skips scaling. Building, navigation, charity, empire, garden and magic branch regressions pass. Additional MenuConfig entries reported by the user have not appeared in either the saved module or its editor buffer yet; the latest inspection still contained only BakeButton, MoreButton and ShopButton.

## Queued reward and achievement notices

Feedback previously replaced the visible notice for every event in a snapshot, making earlier achievements disappear immediately. FeedbackQueue now displays one notice at a time, plays its sound when shown, deduplicates consecutive identical notices and keeps at most eight waiting entries. When saturated, routine messages are discarded before queued achievements. A single timer advances the queue; shutdown cancels it. Deterministic tests verify order, durations, bounds and cleanup. In Studio, three distinct normal remote validation responses appeared sequentially over eight seconds, confirming the actual App integration. This bounds notification work rather than promising an unlimited backlog of popups.

## Helper selection cards

Helpers now use configured images with separate names, bonus labels and selected-state buttons. The page displays temple unlock requirements and a live one-minute switching countdown; unavailable/current choices do not send another request. App compiles and navigation regression passes, and the update is synced to Studio. The existing server continues enforcing ownership, helper IDs and cooldown. A live navigation attempt did not reach the Helpers page; physical selection and visual review remain open.

## Levels and permanent boost cards

Levels now show configured building art, current level/bonus, exact next lump cost, unavailable/max-level states, the sugar-growth unlock condition and hours/minutes to the next lump. An empty bakery gets a building-purchase hint. Permanent boost cards show artwork, costs and owned states; owned or unaffordable boosts do not send another purchase request. Server costs and ownership checks remain authoritative. Compilation and navigation regression pass; the changed App is synced to Studio and the standalone artifact. Physical selection, visual review and all-screen-size verification remain open.

## Desktop navigation and seasonal controls verified

At viewport 2056x949, an Activated probe confirmed that the Studio input tool adds the 58px CoreGui inset itself: requesting (779,179) produced mouse location (779,237) and exactly one Adventure activation. Earlier desktop checks had added that inset twice; they do not establish a game navigation defect. Instance-targeted clicks then opened Helpers, Magic, Levels, Boosts, Seasons and Garden, with each page's actual label checked. Helpers' locked cards were visually reviewed. Actual winter-start and pause buttons changed the server-backed page from inactive to Winter hunt and back to inactive. Snapshot arrival took longer than an initial fixed delay; eventual state was inspected before claiming success. Scrolling during this check used CanvasPosition to bring controls into view, so this does not verify mouse-wheel or physical touch scrolling. Unlocked helper/spell/level purchases, mobile and controller navigation remain open.

## Desktop wheel and click performance with new artwork

At viewport 2056x949, actual mouse-wheel input moved the Seasons panel from Y=0 to Y=28.555481 and back to Y=0; its scrolling direction remained Y. A subsequent 14.001-second RenderStepped sample observed 30 actual big-cookie Activated events, 3,249 frames, 232.05 FPS average, 6.0245ms p95 and 40.2026ms maximum frame time. The new bakery background and visible UI artwork were loaded. The temporary event/frame connections were disconnected and the result attribute removed. This is a desktop Studio sample with an early-game bakery, not a physical-phone or late-game stress result.

## Ingredient market cards

The market now shows three ingredient cards with the configured market backdrop, pantry counts, separate buy/sell prices, a price-change countdown and the 90% sale rule. UI controls respect bank ownership, cookie balance, available stock and the 10,000-unit pantry limit. Server trade rules remain authoritative. App compiles; navigation regression passes; the update is synced to Studio and the standalone artifact. Actual Adventure/Market clicks opened the screen and all three ingredients/prices were inspected. Successful unlocked buy/sell button interaction and mobile layout review remain open.

## Fresh-start reward and confirmation

Stars now shows the configured star artwork, chips available from resetting, and current stars/chips. Fresh start is unavailable with zero gain. The first click opens confirmation; cancel sends no reset. The confirmation explicitly lists ingredients, garden, helpers, magic and wrinklers among the reset activities, which the previous warning omitted. Kept progression is named separately. `test-cookie-ascension-view.mjs` executes the actual branch at four widths and verifies zero-gain rejection, first-click confirmation, cancel and the explicit final action. Compilation and navigation regressions pass; App is synced to Studio and the standalone artifact. A real high-progress ascension button test remains open.

## Isolated high-progress UI actions verified

The temporary ui-scenario server/client scripts ran a cloned App and separate RemoteEvent backed by the existing Model, with seeded high progress and no persistence writes. Actual GUI clicks selected the baking helper, bought/sold Flour (stock 0→1→0), upgraded cursor level 2→3 (lumps 100→97), purchased the permanent baking boost (chips 10→9), cast both spells, invited/popped an individual wrinkler, and planted/harvested after the real one-minute timer (lumps 97→96). Fresh-start click one preserved prestige/buildings; confirmed reset cleared buildings while retaining level 3, 96 lumps and the permanent boost. Chips became 136 and magic/helper state reset. This covers the actual UI→RemoteEvent→Model path in the isolated adapter, not the production Server router or published persistence.

The spell spawned a golden-cookie state, but the UI click attempt could not find a reachable falling button before expiry. That remains an unresolved observation, not a passed collection test. The temporary bridge, cloned modules, launcher and test ScreenGuis were removed; original UI visibility was restored and checked. The source harness files remain outside the staged game for reproducibility.

## Golden fall defect reproduced and fixed

The isolated scenario reproduced a stationary golden cookie at top=-72px for six seconds. Its keyframes mixed -72px with 100%; the CSS interpolator cannot blend different units and switches values halfway through. The App now uses -12%→100%, matching the renderer's supported percentage interpolation and scaling to the bakery zone. After syncing, 22 quarter-second samples progressed from Y=-98.99 through intermediate positions to Y=140.66. An actual input-tool click then produced goldenClicks=1 and goldenUntil=0 on the server-model snapshot. This resolves the preceding unreachable-drop observation. The temporary scenario was removed and the normal UI restored. App compilation and artifact refresh pass; physical mobile tapping and published verification remain separate open checks.
