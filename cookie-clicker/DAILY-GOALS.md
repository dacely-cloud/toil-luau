# Daily goals and discovery map

Synced to Studio and staging. Tap Daily goals below the cookie for direct access,
or open Jobs → Goals (on mobile, More → Jobs → Goals). The shortcut shows claimed
goals out of three and highlights unclaimed rewards. Its own small component
updates only when that status changes; it does not rebuild the cookie scene.
Not published.

Three goals reset at midnight UTC: 50 manual cookie taps, 3 successful jobs,
and 5 buildings above their lifetime owned high-water marks. Failed purchases,
sales/rebuys, passive cursors and offline income do not generate goal progress.

Each claim grants 5 XP and either 10 energy or 10 stamina, capped at capacity.
Claiming all three grants one sack of flour. Goal progress and claimed flags
persist with the economy through saves and rebirths. A new day clears only the
daily tracker. The server supplies time; no client progress or date is trusted.
Rewards use the existing short illustrated notification, without a queue.

The page also shows the next three undiscovered regular items with their art,
connecting lines, level/cookie progress and buttons to visit jobs or the shop.
It fits into the existing Jobs header, adding no extra mobile navigation row.

Validation: all 35 native suites pass; app and server compile. Daily tests cover
claim replay, the completion bonus, UTC rollover, saves, rebirths, bad data and
passive production. Studio server checks passed on isolated states. Mobile
cards measured 311 pixels wide inside the 359-pixel viewport, and the page
rendered all three goals and map entries without console errors.
