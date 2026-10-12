---
title: "Fill Rate"
summary: "The share of ordered demand you can ship immediately from stock — availability measured the customer's way."
levels: { data-analyst: mid-level }
prereqs: []
related: ["stock-out-rate", "weeks-of-cover", "safety-stock", "otd-rate"]
---

Fill rate = units shipped from stock ÷ units demanded (ordered) in a window — *service level* by another name. Where [stock-out rate](/t/stock-out-rate) counts shelf-empty events, fill rate answers the commercial question: of what customers asked for, how much did we actually deliver *now*, without backorder or cancellation?

```text
orders ask 10,000 units; ship-from-stock 9,300 → fill 93%
the missing 700: 200 canceled (lost), 500 late (deferred)
fill rate blends both; report the split too
```

Two flavors worth distinguishing in the same report: **order fill rate** (complete-or-nothing) vs **line/unit fill rate** (partial shipments count). A store can run 96% unit-fill and 70% order-fill while customers only feel the second — multi-line carts in Indonesian marketplaces die on the partial line (a Rp 20k missing accessory converts a delivered parcel into a complaint).

Uses: supplier and warehouse scoring (per-vendor fill after POs is the receipts-quality metric; per-DC fill is the allocation metric), safety-stock calibration (the service-level Z in [safety stock](/t/safety-stock) *is* a fill-rate target — "98% fill on A items, 90% on B/C" turns the formula from a guess into a policy), and demand truth: fill shortfalls are [lost sales](/t/stock-out-rate) in disguise, so a rising fill-rate target should be argued as margin vs holding cost, not as a vanity 100%.

The data hygiene that decides the number's honesty: demand must be *demand* (paid orders, not page views — and in promo windows the cancellation wave inflates apparent demand at the moment of stock; count the paid, then net the cancellations), and partials must be timestamped (units filled two weeks late are a promise-keeping story, see [OTD](/t/otd-rate), not a fill story).

When not to chase fill: made-to-order and dropship flows where zero on-hand is the model — the service number there is *order reliability*, a different chain of metrics.
