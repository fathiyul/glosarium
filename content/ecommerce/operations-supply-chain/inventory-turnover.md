---
title: "Inventory Turnover"
summary: "How fast stock cycles from bought to sold — and why both extremes hurt."
levels: { data-analyst: mid-level, tech-entrepreneur: growth }
aliases: ["stock turnover", "turns", "inventory turns", "days of inventory"]
prereqs: []
related: ["safety-stock", "cash-flow", "forecasting", "gross-margin", "return-rate"]
core: [data-analyst]
---

Inventory turnover says how often the stock on your shelves completes its buy → sell cycle:

```text
turnover = COGS ÷ average inventory value
12,000M COGS / 2,000M avg stock = 6.0× per year
days of inventory (DOI) = 365 ÷ 6 ≈ 61 days
```

Low turns mean cash is sleeping in shelves — money parked in a warehouse cannot fund next month's campaign. High turns look efficient... until the number gets *too* high: a category turning 30× a year is usually stocking out constantly and throwing away sales that [forecasting](/t/forecasting) misses hid from the report.

The average is where juniors get bitten twice. Category mix: groceries and electronics in one warehouse average "8×" for nobody — cut turns per category, per supplier, per ABC class before anyone acts. Seasonality: (opening+closing)/2 smooths a pre-holiday build and a post-holiday clearance into a calm middle, flattering stores that actually run hot-cold; use monthly average inventory for seasonal retail.

As a founder, this metric sits next to [cash flow](/t/cash-flow) in every growth review because each day of inventory is a day of money unreturned: cutting DOI by ten days releases working capital without a new investor — often the cheapest money a scaling store can find. As an analyst, pair turns with margin — **high turnover at zero contribution is velocity, not performance**. The formal name for that combination is GMROI: gross margin per rupiah of inventory; it ranks SKUs the way the P&L feels them.

When not to chase it: consignment and dropship, where stock value barely lives on your books — measure availability and delivery reliability instead. And watch the returns tail: a category whose "sales" quietly come back ([return rate](/t/return-rate)) inflates apparent turns with phantom demand.
