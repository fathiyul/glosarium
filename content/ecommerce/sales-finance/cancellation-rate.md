---
title: "Cancellation Rate"
summary: "Orders created but called off before delivery — buyer's remorse, seller's ghost and COD flake."
levels: { data-analyst: junior, tech-entrepreneur: pmf }
aliases: ["order cancellation", "cancel rate"]
prereqs: []
related: ["gmv", "failed-delivery-rate", "cash-on-delivery", "inventory-turnover"]
---

Cancellation rate = canceled orders ÷ orders created, in a window. Define *canceled* precisely: buyer-initiated before shipping, seller-initiated (no stock, fraud flags), and expired-unpaid (order placed, payment never arrived) behave completely differently — the "GMV" in a marketplace dashboard includes all three, which is why revenue reports and [P&L](/t/profit-and-loss) never agree until someone separates them.

```text
GMV (ordered)  − expired-unpaid  − canceled  = net revenue territory
                    ↑ each bucket has a different owner to fix
```

Why it is not a rounding error: each cancellation is a *full cost chain started and abandoned* — picking, packing, a courier slot, an inventory hold, a payment attempt. In COD markets expired and refused orders ([cash-on-delivery](/t/cash-on-delivery)) reach a double-digit share, and a store can grow GMV happily while net revenue flatlines because the top of the funnel bought air.

Analyst playbook: bucket by *reason*, then time-to-cancel. Expired-unpaid concentrated on bank-transfer VA = payment-window friction (long waits, no reminder). Same-day buyer cancels = cold feet; check what they saw (shipping cost appearing at the end, delivery date worse than competitor). Seller cancels on "out of stock" after promising = [inventory accuracy](/t/inventory-turnover) failure. Cancel clusters on one courier or region = operational.

Founders: cancellation is a *trust temperature*. Watch it by segment — COD orders from first-time buyers cancel highest; prepaid orders barely cancel; that spread is the fraud/commitment curve your policy should price, not average away. Marketplace sellers get penalized on it directly (marketplaces score sellers on it directly — the seller-side view is its own metric).

When not to obsess: tiny volumes (one cancel in ten orders is noise), and intentional design — cash-on-delivery-then-return flows, booking-style models where cancel *is* the funnel. And never compare cancellation across payment methods without comparing delivery quality next to it: COD cancels look like buyer behavior and read like logistics failure.
