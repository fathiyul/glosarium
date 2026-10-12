---
title: "Attach Rate"
summary: "Share of main-product orders that pull an accessory along — cross-sell's scoreboard."
levels: { data-analyst: junior }
aliases: ["attachment rate", "attach", "accessory attach"]
prereqs: ["market-basket-analysis"]
related: ["market-basket-analysis", "support-confidence-lift", "basket-size", "margin-per-sku"]
---

Attach rate = orders containing the add-on ÷ orders containing the main product (or revenue-attach: add-on revenue ÷ main revenue — label which). It is the *execution* metric for cross-sell: [market-basket analysis](/t/market-basket-analysis) finds the pair; attach rate proves the store actually lands it on the listing, the cart, and the confirmation page.

```text
phone orders:      4,200
with a case:       1,150  → attach 27%
with case + charger: 480   → multi-attach 11%
```

Benchmarks live and die by *pair type*: same-order necessity items (phone→case) should attach high — the "marketplace listing with no case option is leaving 20+ points on the table" finding is the most common quick win in electronics stores; cross-category discovery items attach low by nature and the right target is growth of the number, not its absolute level.

The three levers, testable one at a time with real experiments:

- **Placement**: bundle-only, in-cart nudge, post-purchase "add to same shipment" (the last one converts intent *after* the decision, and its margin economics differ because shipping is already paid).
- **Price framing**: Rp 49k accessory next to a Rp 3jt phone is rounding-error logic — discount depth on attachables behaves differently from standalone pricing ([price-elasticity](/t/price-elasticity) of the pair, not the item).
- **Breadth**: one accessory attached per order is ceiling; multi-attach is where [basket size](/t/basket-size) actually moves.

Analyst notes: attach attribution windows (case bought the *next day* in a separate order is a delayed attach — count it, or the cart widget looks ineffective), exclusion of accessory-only customers (customers who came *for* the case are not attach events, they are their own funnel), and margin sanity ([margin per SKU](/t/margin-per-sku): a high attach of zero-margin freebies is logistics cost, not commerce).

When attach-rate is the wrong KPI: single-product stores and B2B wholesale orders where the buyer's own procurement decides the basket.
