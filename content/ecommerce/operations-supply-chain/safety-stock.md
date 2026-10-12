---
title: "Safety Stock"
summary: "Buffer inventory that absorbs demand and lead-time surprises without stocking out."
levels: { data-analyst: senior, data-scientist: mid-level }
aliases: ["buffer stock", "SS"]
prereqs: ["standard-deviation"]
related: ["inventory-turnover", "forecasting", "long-tail-distribution", "variance"]
---

Safety stock is the cushion between expected demand during your replenishment lead time and the level you actually order to. The standard formula sizes it against demand *variability*:

```text
SS = Z × σ_demand × √LT
service level 95% → Z ≈ 1.65 · 99% → Z ≈ 2.33

40 units/day, σ = 12/day, LT = 9 days:
SS = 1.65 × 12 × 3 ≈ 60 units
reorder point = 40×9 + 60 = 420
```

The logic: lead time is the horizon you cannot shorten, so you buy insurance against how far reality strays from the [forecast](/t/forecasting) during it. Forecasting shrinks the average error; safety stock absorbs the rest.

The service level Z is a margin decision wearing a statistics costume. A 2%-margin accessory does not deserve 99% availability; a 40%-margin hero SKU that anchors its category page does — stocking it out costs the whole basket, not the unit. The senior-analyst job is pricing the trade per segment: holding cost of the extra buffer versus probability of a stockout times lost margin per sale (plus the cross-sell loss the missing item drags down).

Where the formula breaks — and the honest substitutes:

- **Erratic long-tail demand.** The √-scaling assumes reasonably smooth variation; a SKU selling 0.8 units a day with many zero days needs integer policies (stock one, reorder on trigger), not a bell curve laid over the [long tail](/t/long-tail-distribution).
- **Lead-time variability.** If suppliers slip, the real uncertainty is bigger than demand σ alone implies — add the lead-time term or inflate empirically from your own history.
- **Correlated demand.** One campaign lifts ten SKUs together; buffering each independently still stockouts on sets — keep a family-level cushion.

The real-world failure is never the arithmetic; it is one blanket rule ("two weeks for everything") applied to a portfolio whose variability differs by an order of magnitude between classes.
