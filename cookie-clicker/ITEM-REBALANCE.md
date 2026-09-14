# Item shop pacing — September 11, 2026

Synced to Studio and `.studio-stage/CookieClicker` during the subsequent cursor
and rebirth audit. These changes are not published. See BALANCE-AUDIT.md for
the final combined balance and Studio validation.

The previous shop sold the whole regular item set for 142,725 cookies with no
level requirements. The imported UI also called collection-tier and item-price
functions that did not exist in the local model.

Changes:

- Keep the four common items' base prices. Spread purchases across levels
  1/2/2/3/4/5/6/7/9/11/14/20. Server actions enforce these requirements.
- Increase the uncommon and rare prices. The legendary crown costs 250 million
  cookies and unlocks for purchase at level 20. The full set costs 281,203,325.
- Each additional owned copy raises its purchase price by 12%. Prices are based
  on ownership, not current CPS, so increasing income does not move the goal.
- Implement the UI's existing 1/10/100-copy milestones: each item provides its
  base bonus, 1.5 times its base bonus, then twice its base bonus. Extra copies
  beyond 100 grant no further bonus. A bag item contributes automatically.
- Preserve old displayed items and their bonuses by counting the displayed copy
  alongside bag copies. Displaying an item transfers a copy, never duplicates it.
- Refund only 25% of base price for spares; preserve the last copy. Gifts and
  drops cannot acquire an inflated resale price. Exclusive items remain unsellable.
- Existing inventories and paid entitlements are not removed. Job/campaign/crate
  drops still award their advertised items; lucky drops can precede shop unlocks.

Item-only simulation before the subsequent cursor cap (historical comparison,
not a player-time guarantee; see BALANCE-AUDIT.md for updated progression):

| Profile | Item types at 5 minutes | First full set of 12 |
|---|---:|---:|
| Normal, 2 taps/sec | 4 | 13,035 seconds (~3h 37m) |
| All passes, 10 friends, 8 taps/sec | 6 | 5,551 seconds (~92m) |

Simulations consider purchases toward all three collection tiers, jobs,
properties, campaigns, decor, spells and some golden cookies. They do not model
paid consumable spam, random item drops, empire coordination or every minigame.
Times above measure the first copy of each item, not all 100-copy milestones.
Existing advanced saves can finish much sooner; this does not wipe ownership.

Reproduce: `luau scripts/simulate-balance.luau -a harder 0.166666667` and
`luau scripts/simulate-balance.luau -a boosted 0.166666667`.

Validation: all 32 native game suites pass, including exact shop charges,
server-side unlocks, duplicate pricing, last-copy protection, refund bounds,
collection milestones and legacy save restoration. App and Economy compile.
