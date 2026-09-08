# Developer products and gamepasses

This is the requested integration plan. No paid offers are enabled. Product IDs, pass IDs and final prices must be configured for this experience before launch.

## Proposed offers

| Offer | Type | Exact benefit | Suggested artwork |
| --- | --- | --- | --- |
| Baking snack | Repeatable product | One stored snack; redeem for 25 energy when enough capacity is available | CookieTray |
| Cookie box | Repeatable product | Fixed 1,000 cookies, stated before purchase | CookieJar |
| Bakery themes | One-time pass | Permanent access to optional bakery color themes | CookieStore |
| Empire style pack | One-time pass | Additional cosmetic empire badges; no extra theft or insurance advantage | CookieEmpire |

The offers and quantities above are proposals, not existing entitlements. Keep ordinary jobs, properties, charities and empire progression available through play. Stored snacks prevent a purchase at full energy from being wasted. Theme previews should show the actual appearance before opening Roblox's purchase prompt.

Roblox distinguishes repeatable developer products from one-time passes. Use its product information API to display the current price and sale status. Open a purchase prompt only after the player selects an offer. [Developer products](https://create.roblox.com/docs/production/monetization/developer-products), [passes](https://create.roblox.com/docs/production/monetization/passes).

## Server integration

1. Add a configuration module keyed by semantic offer name, with experience-specific IDs and a server-owned grant definition. Missing IDs disable the offer. Clients never supply quantities, prices or entitlement claims.
2. Route developer-product fulfillment through one `MarketplaceService.ProcessReceipt` handler. Do not grant from `PromptProductPurchaseFinished`; that signal does not prove a successful purchase. [Receipt handling](https://create.roblox.com/docs/production/monetization/developer-products#handle-a-developer-product-purchase).
3. Serialize fulfillment against the player's existing session lock and save operations. Persist the receipt's `PurchaseId` together with the granted inventory/cookies in the same player snapshot. Retried receipts check this ledger before granting. Retain receipt IDs; do not prune them by age without a replacement durable deduplication design.
4. Acknowledge only a durable grant. If the player has not loaded, a different server holds the lease, the product is unknown, or saving fails, return `NotProcessedYet`. A failed final save retains the in-memory grant and pending receipt, so another attempt saves it without adding it again. A crash restores either the old state for a fresh grant or the new state with its receipt, never a partial pair.
5. Check pass ownership on the server using `UserOwnsGamePassAsync`. Refresh entitlements after purchases and on rejoin. A lookup failure must not be treated as a successful ownership check. Existing cosmetic selections need validation against current entitlements. [Pass privileges](https://create.roblox.com/docs/production/monetization/passes).
6. Extend snapshot/restore validation for stored snacks, cosmetics and the receipt ledger. Display a short success notice only after confirmed delivery; pending saves show a pending state.

## Verification before enabling sales

- Repeated and simultaneous delivery of the same receipt grants once.
- Lost responses, save failures, lease takeover, disconnects and rejoin preserve the grant or allow a safe retry.
- Different receipts for the same product each grant their fixed benefit.
- Unknown products, forged client requests and mismatched player IDs grant nothing.
- A full energy bar retains purchased snacks; redeeming one consumes exactly one snack and adds exactly 25 energy.
- Pass benefits persist on rejoin and remain cosmetic; unavailable ownership services show a retry state.
- Test offer layout, price updates and purchase cancellation on desktop, portrait, landscape and controller.
- Complete a published-experience receipt test before exposing offers to players. Roblox notes that developer-product test-mode purchases cost real Robux; choose the test product and budget explicitly before that test. [External purchase test mode](https://create.roblox.com/docs/production/monetization/developer-products#test-mode).

The remaining launch inputs are the selected offers, final prices, their product/pass IDs, approved cosmetic variants and a published test session. This plan does not claim that payment processing has been implemented or tested.
