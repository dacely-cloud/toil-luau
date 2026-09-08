# Requested multiplayer bakery expansion

Source of requirements: the user's attached pasted-text-1.txt. This checklist tracks the full request; a checked implementation still needs end-to-end verification where noted.

## Implemented, with remaining verification

- Expanded upgrades and achievements, golden cookies and temporary bonuses.
- Sound, purchase feedback, achievement notices, bakery renaming and movement/sound settings.
- Native building illustrations and shared cookie artwork for currency icons.
- Responsive mobile orientation and desktop zoom. Thirteen layout dimensions pass automated checks; physical mobile/controller verification remains open.
- Offline income capped at eight hours and session-locked saves. Published-game save verification remains open.
- Simplified ascension, heavenly boosts, cookie buddies, sugar lumps, garden, market, helpers, spells and seasons. These do not establish full original-game parity.
- Server-owned jobs: energy, level requirements, instant cookie/XP rewards, server-only item rolls.
- Properties: escalating purchase costs and passive income, including capped offline income.
- Item shop with explicit rarity and prices, inventory, one-copy collection deposits and reward multipliers.
- Cookie jar deposits/withdrawals with conservation of currency and no inflation of lifetime earnings.
- Work menu deployed to Studio with Jobs, Properties, Items, Collection and Jar. Job controls and energy/XP updates observed live; all item/property actions still need live verification.

## Remaining implementation

- Timed charity fundraisers (30 minutes, 1, 4 and 8 hours), jar funding, helper rewards and participant lists.
- Player list for stamina-based stealing from charity, cooldowns and insurance limits.
- Persistent empires: create with filtered name and picture, join/leave, donate stamina, cookie/stealing/insurance perks and level upgrades affecting jobs/properties.
- Durable social transaction recovery, replay protection and simultaneous-player tests.
- Developer product and gamepass integration plan (IDs and purchasable offers are not supplied).

## Remaining gates

- Published-server save/rejoin/offline and multiplayer verification.
- End-to-end UI coverage for every added action, including failures and capacity limits.
- Performance profiling while clicking, navigating and scrolling with the full expansion loaded.
- Physical touch and controller behavior, including focus/navigation.
- Refresh standalone place artifact after all modules are integrated.

## Current checks

Native Model suite: 20 pass. Persistence suite: 7 pass. Layout: 13 sizes pass.
Economy checks cover job costs/rewards, invalid rolls, level gates, collection replay denial, property costs/income, energy refill, jar conservation, malformed input and save restoration.
App, Model, Economy, LateGame, Persistence and Server compile successfully.
Studio Work menu mounts without console errors; energy depletion and XP/level progression observed through job controls.

## Current UI and runtime pass

Restored the previous building icon set at the user's request; removed Info.
Desktop zoom restored separately from mobile native sizing. Prices enlarged and currency uses shared main-cookie artwork.
Work jobs/properties now use picture cards and energy/stamina bars. Shop/Bag/Collection picture cards are being integrated. Full social/empire UX remains unfinished.
Golden cookies use a small cookie drawing and a 44px tap area; fall is confined to the bakery above the milk, with server-owned varied duration and one-time claims.
Reconciler resumed bailout now restarts cloned children from committed fibers instead of throwing. Targeted helper regression retains queues/lanes/sibling links; host integration suite passes 13 tests, including simultaneous parent/cached-child updates. Studio monitoring after patch has shown no render errors so far.
Fundraiser rules/UI added with native tests for timing, help rewards, stamina, stealing conservation/cap, saved visitor IDs and repeated claim denial. Durable two-player persistence and real multiplayer verification remain open.
