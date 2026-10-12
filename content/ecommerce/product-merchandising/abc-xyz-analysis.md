---
title: "ABC/XYZ Analysis"
summary: "Ranking SKUs by value contribution (ABC) and by demand predictability (XYZ) — one grid, two different decisions."
levels: { data-analyst: mid-level, tech-entrepreneur: growth }
aliases: ["ABC analysis", "XYZ analysis", "Pareto classification", "FSN"]
prereqs: []
related: ["long-tail-contribution", "safety-stock", "reorder-point", "dead-stock"]
---

ABC/XYZ is a two-axis sort of your catalog. **ABC** ranks by value: A SKUs carry ~80% of revenue or margin (Pareto thinking), B the next slice, C the long remainder. **XYZ** ranks by *predictability*: X sells smoothly (forecast error small), Y swings with trend/season, Z is erratic — bought rarely, in bursts. The 3×3 grid is where the decisions live, because the two axes justify different policies:

```text
       X predictable      Y seasonal        Z erratic
A  auto-reorder, lean SS   calendar plans   joint ops/sales review
B  standard replenishment  promo-linked     min-max / manual triggers
C  cheap & on-shelf        review for delist  make-to-order / delist
```

The point juniors miss: a Z-class SKU is not a forecasting *failure* — it is a demand *type*. Buffering an erratic C-item with [safety stock](/t/safety-stock) tuned for normal variation converts forecast noise into permanent [dead stock](/t/dead-stock); its right policy is often delist, print-on-demand, or stock-one-with-rapid-replenish. Conversely, the A-items' forecast error is the whole store's forecast error — that's where the accuracy effort earns rent.

XYZ classification needs a stable window (erratic "because new" is lifecycle, not behavior — exclude recent launches from the scoring or grade them separately) and a stated metric: coefficient of variation per period is the standard cut, MAPE-like error for items with demand ([WAPE](/t/wape) handles zero-ish cases better).

The cousin FSN (Fast/Slow/Non-moving) drops the value axis and just sorts by velocity — useful for *cash* decisions (aging capital) while ABC is the *attention* decision.

Where the grid goes wrong: static classification — mix shifts every campaign season, so re-rank per quarter and *log* movers, because an A→B slide is a strategy alarm; and value-ABC computed on revenue instead of [margin-per-SKU](/t/margin-per-sku), which quietly promotes your best discount victims to priority replenishment.
