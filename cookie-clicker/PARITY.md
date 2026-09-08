# Cookie Clicker parity work

Target: recreate the live desktop Cookie Clicker experience in Roblox using toil-luau, end to end. Reference: https://orteil.dashnet.org/cookieclicker/ (live 2.058 inspected September 7, 2026).

Completion requires functional and visual verification in Studio, not simply the presence of code. This checklist preserves the full target across work sessions.

- [ ] Three-column desktop layout, textured backgrounds, cookie artwork, building sprites, milk, particles, tooltips, responsive scaling and scrolling.
- [ ] Clicking, passive production, accurate 20-building economy, bulk buy/sell, unlocking and building upgrades.
- [ ] Full upgrade catalog, synergies, kittens and achievement milk effects.
- [ ] Golden/wrath cookies, buffs, random events and fortunes.
- [ ] Statistics, achievements, options, bakery naming and notifications.
- [ ] Server-owned economy, per-player saves, offline behavior, import/export and reset confirmation.
- [ ] Ascension, heavenly upgrades, permanent slots, reincarnation and challenge modes.
- [ ] Grandmapocalypse, research, pledges/covenants and wrinklers.
- [ ] Sugar lumps and building levels.
- [ ] Garden, Stock Market, Pantheon and Grimoire minigames.
- [ ] Seasons, seasonal drops and special events.
- [ ] Audio, accessibility, touch/gamepad behavior and performance verification.
- [ ] Automated economy/save tests, real input playtests and visual comparison at multiple screen sizes.

## Architecture

`Model.luau` is the deterministic economy. `Server.server.luau` owns individual player state and persistence. `App.luau` renders through toil-luau React/CSS. `Bootstrap.client.luau` mounts the app. Files here are canonical; `sync/` is Azul's generated mirror.

## Current evidence

Initial implementation in progress. No parity requirement has yet been signed off.

### Animation pass

Implemented cookie hover/press scale transitions, rising click amounts, click crumbs, rotating Path2D shine rays, orbiting/tapping cursors, scrolling Path2D milk waves, and falling cookies during production. Click effects reuse at most 36 particle nodes; frame updates use Toil's animation driver rather than React state.

The pass exposed a CSS parser bug: `forwards`/`backwards` were mistaken for time tokens and produced a nil delay. Fixed numeric parsing and added coverage. Common motion/fade animation updates now avoid rebuilding static gradients and text/layout resources.

Verified in an isolated Studio test place after AzulService hung in the original session. Cookie scale reached 0.94 pressed and 1.04 hovered; click numbers moved upward and faded; shine, milk, cursor orbit and production rain advanced without script errors. A 24-click run averaged 5.01 ms (p95 6.30 ms, max 48.09 ms). After filling the 36-node particle pool, another 15 clicks created zero new particle instances. The Azul daemon remains stopped. Effects for unimplemented systems (golden cookies, wrinklers, ascension and minigames) remain part of those systems' outstanding parity work.
