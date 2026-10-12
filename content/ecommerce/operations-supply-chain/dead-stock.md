---
title: "Dead & Aging Stock"
summary: "Inventory that stopped moving — the slow leak between working capital and write-off."
levels: { data-analyst: mid-level, tech-entrepreneur: growth }
aliases: ["slow-moving stock", "aging inventory", "obsolete stock"]
prereqs: []
related: ["abc-xyz-analysis", "inventory-turnover", "sell-through-rate", "cash-flow"]
---

Dead stock is inventory that hasn't sold for a defined "dead" window — commonly 90 or 180 days, category-dependent — with aging stock the gradient before it. The number matters for three ledgers at once: the [cash-flow](/t/cash-flow) it ties up, the shelf and picking attention it consumes, and the markdown that awaits it (dead stock sold at 40% off is the *optimistic* exit; unsold dead stock at expiry or season's end is the real one).

```text
aging buckets by cost value (Rp on shelf):
 0–90d    71%  healthy
 90–180d  16%  review velocity — was this bought for demand or hope?
 180–360d  9%  clearance track, stop reorders
 >360d    4%  write-off candidate or bundle fodder — decide, don't drift
```

Why it keeps happening despite being visible: dead stock is almost always *yesterday's* decision, made before the signal existed — forecast error after a [pull-forward](/t/pull-forward), an MOQ that forced 12 months of a "reasonable" 3-month buy ([EOQ tension](/t/reorder-point)), a discontinued variant nobody delisted (the catalog sells it; the system won't replenish; aging accumulates silently), or a hero-SKU bet that was correct once and ordered four times more on the second wave.

The analysis practice that earns its keep:

- **Define age by receipt date** (first-in-first-out lot aging), not "days since last sale" — the latter hides new slow movers forever;
- **Tie aging to ABC/XYZ classes** ([ABC/XYZ](/t/abc-xyz-analysis)): A-item aging is a demand-forecast alarm; C-item aging is an assortment problem;
- **Report aging as % of inventory value AND the reorder freeze** — the actionable half of the table is "which SKUs are dead *and still on auto-replenish*".

The disposition ladder: bundle [attach](/t/attach-rate) onto moving heroes → targeted promo (not store-wide discount — see [discount burn](/t/discount-burn)) → clearance channel → write-off. Each step's margin should be priced against holding cost, because "we'll sell it eventually" converts a write-off into a slow one with interest charges.

When dead stock is *strategy*: seasonal buy-ahead (Ramadan stock at 300 days of "dead" age in July is a plan, check the calendar), and safety buffers on sole-source critical spares — age, but the alternative costs more.
