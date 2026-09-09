# Monetization implementation — 2026-09-08

`ServerStorage.MonetizationConfig` is authoritative. The server clones its live
catalog for the client at startup; the local `MonetizationConfig.luau` is the
staged source. Existing product/pass IDs and icons are retained. AutoBake remains
in the historical config but is not offered because it was not requested.

## Offers

- Job Rewards: 2x job cookies; XP and item odds unchanged.
- Property Income: 2x property cookies.
- Energy/Stamina Regen: each regenerates twice as fast.
- VIP: 1.1x baking, clicks, property and job cookies; energy maximum 110.
- No Deposit Fee: waives the standard 5% fee, rounded up per deposit.
- Starter Pack: exactly 50,000 cookies, Golden whisk and Star apron. Each
  exclusive item can be placed in the collection for a 3% collection bonus.
  Repeat purchases grant another copy; each item contributes its collection
  bonus only once. Existing configured utensil/apron artwork is reused.
- Refills restore Energy to its current maximum or Stamina to 100.
- Delivery: max(10K, 30 minutes of permanent progression rate).
- Motherload: max(50K, 4 hours of permanent progression rate). The existing
  CookieJackpot product ID is reused. Temporary golden/friend boosts do not
  inflate delivery amounts. The shop displays the calculated cookie amount.
- Grandma's crate odds: spatula/apron/mixer/crown = 65/25/9/1%.
- Baker's crate: 40/35/20/5%; Santa's crate: 15/30/40/15%.
- Shields: 4/8/24 real-time hours; repeat purchases extend the remaining time.
  Shields apply to current and future charity fundraisers and survive rejoin.

## Transactions and UI

Only ProcessReceipt grants products. Receipt ID and rewards are saved together
under the existing player session lease before PurchaseGranted. Failed saves,
duplicate delivery and loss of a save response do not grant twice. Pass
ownership is checked server-side before offline earnings and after a purchase.
Receipts are excluded from network snapshots.

The Store shortcut and More menu open Passes & Goodies, with configured artwork,
live regional Roblox prices, owned states, per-item odds and native purchase
prompts. Price errors can be retried. PolicyService blocks crate prompts for
restricted accounts or failed policy lookups. If a previously paid crate receipt
arrives after a policy restriction, its deterministic fallback is a Cookie crown;
failed policy lookups leave the receipt pending. No paid item trading exists.

## Verified

- Monetization.spec: all six passes and eleven products, 30K crate rolls,
  refill caps, fee waiver, exact starter amount, scaling, receipt retries,
  response-loss/rejoin, shield expiry/protection, ascension and private history.
- RobloxMonetization.spec exercises the actual adapter with mocked platform
  APIs: failed ownership/policy lookups, forbidden offers, prompt cooldown,
  save-before-acknowledgment, missing players and unknown receipt products.
- Existing model, economy, persistence, social, charity, multiplayer flow,
  purchase XP, friend boost and wrinkler regressions pass.
- Studio renders both shelves, retrieves live prices, and opens Roblox's free
  Starter Pack test prompt. A 345-label fit check at five card widths passed.
- Fixed the Toil useEffect dependency array representation during live testing.

## Outstanding verification

The Studio MCP cannot click the Roblox-owned purchase confirmation (CoreGui).
The Starter Pack confirmation was completed manually. A fresh snapshot from
the actual server verified exactly 50,000 cookies, goldenWhisk=1, starApron=1,
ready=true and the "Starter Pack delivered!" event. Native pass fulfillment,
published receipt delivery and a real rejoin after purchase are not yet verified.
The Creator Dashboard product descriptions still contain the original placeholder
copy (e.g. Starter Pack mentions energy/shield); in-game descriptions use the
implemented rewards. Dashboard descriptions should be aligned before release.

Do not claim paid end-to-end delivery or published save verification from the
pure/model tests alone. No Robux were spent by the agent.
