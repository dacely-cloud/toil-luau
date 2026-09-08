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
