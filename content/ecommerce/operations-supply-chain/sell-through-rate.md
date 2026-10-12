---
title: "Sell-Through Rate"
summary: "Share of received stock that sold in a window — the assortment's early-report grade."
levels: { data-analyst: junior }
aliases: ["sell-through", "STR"]
prereqs: []
related: ["weeks-of-cover", "inventory-turnover", "dead-stock", "abc-xyz-analysis"]
---

Sell-through = units sold ÷ units received (or on hand at period start), over a defined window. Where [inventory turnover](/t/inventory-turnover) answers the year's velocity question, sell-through answers a *buying decision*: "was this order the right size?" — usually measured on new-arrival cohorts, the way merchandising teams actually live.

```text
new-arrival 90-day sell-through by category:
  fast fashion      62%   healthy sell, 38% left to mark down
  accessories       28%   slow start — check price or promotion
  appliances         9%   expected: this category sells over a year
```

The two windows people mix and must not: **period sell-through** (this month's sales ÷ this month's stock — a flow ratio) and **cumulative/cohort sell-through** (sales-to-date ÷ original buy — a *decision scorecard* on the buyer). The first tells operations what the shelf is doing; the second tells merchandising where buying went wrong, and is the number launch reviews should be built on.

Why fashion and drops live by it: sell-through at day 7-14 is the earliest signal separating a [star SKU](/t/bcg-matrix) from a future [dead stock](/t/dead-stock) line, and the action window (reorder, hold, mark down) closes fast. A 40% STR in week one is reorder-or-stop information while the supplier still has capacity.

Analyst traps: **stockouts understate it** (a SKU at 100% STR after selling out on day 5 did not "sell well" — it sold out; report STR *with* [fill rate](/t/fill-rate) or days-out-of-stock, or you rank SKUs by unfulfilled demand); return windows (fashion STR looks great until the 30-day [return rate](/t/return-rate) lands — realized STR nets returns); and the denominator drift (STR on received vs on-hand — receipts split across warehouses; pick one and enforce).

When STR is the wrong question: replenishment goods with infinite shelf life (toothpaste doesn't need a 90-day grade — turnover does the job), and marketplace drop-ship models where "received stock" isn't a real number.
