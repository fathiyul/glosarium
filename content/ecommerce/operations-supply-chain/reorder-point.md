---
title: "Reorder Point"
summary: "The stock level that triggers a replenishment order — lead time plus a buffer, as a single line in the system."
levels: { data-analyst: mid-level }
aliases: ["ROP", "reorder level"]
prereqs: ["safety-stock"]
related: ["safety-stock", "order-processing-time", "stock-out-rate", "weeks-of-cover"]
---

Reorder point answers "when do I order?" separately from "how much?" — the two replenishment decisions warehouses blend into one habit and then blame each other for the result.

```text
ROP = expected demand during lead time + safety stock
daily demand 40 × LT 9 days = 360 + SS 60 → reorder at 420 on hand
```

The formula looks like bookkeeping arithmetic and fails like it too, in three classic places:

- **Lead time you feel, not measured.** The supplier's *quoted* lead time is a marketing document; the number belongs in ROP is the observed distribution from your own PO log — PO-date to receipt-date, per supplier per season. Ramadan and pre-CNY congestion stretch real LT by weeks; a static ROP silently orders into a hole ([courier & supplier performance](/t/courier-performance) is the measurement habit).
- **Average demand for non-average demand.** A hero SKU doing 300/week in a [double-date campaign](/t/promo-uplift) has an average that is not a forecast; ROP driven by trailing averages under-orders exactly when stockout hurts most ([stock-out rate](/t/stock-out-rate) is the bill).
- **On-hand vs available.** The ROP trigger checks *physical* stock; what you can actually promise is on-hand minus already-allocated (open orders, reservations, bundle components) — and in multi-warehouse stores, which node's demand the stock must cover.

The policy knobs after the formula: order *when* the trigger fires (weekly review vs continuous) shifts required safety stock ([weeks of cover](/t/weeks-of-cover)); and min-max systems exist precisely because batch-sizing conventions batch sizing and reorder points disagree for the same item — min-max resolves it by ordering to a ceiling.

When not to bother with formulas: ultra-fast consumables (visual/shrink triggers win at 2-day turns) and made-to-order items where the "stock" decision is *capacity*, not inventory.
