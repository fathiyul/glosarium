---
title: "Promo Dependence"
summary: "How much of your 'normal' sales is actually borrowed from the next campaign — the addiction metric."
levels: { data-analyst: mid-level, tech-entrepreneur: growth }
aliases: ["promo share", "discount reliance", "deal-prone customers"]
prereqs: []
related: ["pull-forward", "discount-burn", "price-elasticity", "repeat-purchase-rate"]
---

Promo dependence: the share of sales that only happen inside promotions — measured by what your between-campaign weeks actually look like:

```text
promo week      Rp 900M
normal week     Rp 120M   ← this number is the store's real baseline
dependence = how flat the valley is
```

A healthy store's normal weeks hold a meaningful fraction of campaign weeks; a dependent store's calendar is a spike-and-flat line where full-price sales are a rounding error. The diagnosis matters because it *inverts the P&L reading*: in a dependent store, every campaign week's "profit" partly repays the discount given in the last one, and [pull-forward](/t/pull-forward) makes the inter-promo valleys worse each cycle.

How to measure it honestly: [basket-level](/t/basket-size), tag orders by price-paid-vs-list; dependence = full-price revenue ÷ total, by segment and category. The segment cut is the treasure — a store can be 70% dependent overall while its *repeat-purchasing* customers buy full price; the deal-only cohort is a separate business (and usually the negative-margin one).

Founders: this metric decides whether your "brand" exists. If customers arrive only when the price moves, you are not a store with campaigns — you are a campaign with a storefront. The escape route is boring and structural: cadence discipline (predictable, not perpetual), full-price value layers ([bundles](/t/market-basket-analysis), service, exclusive SKUs) and letting dependence in the numbers *improve slowly on purpose* while total revenue grows slower — the market will not see your 15% growth year if you're quietly converting to real margins.

Analysts: do not compute dependence with list price as your reference during double-date weeks (platform-forced discounts move the reference itself — see [discount depth](/t/discount-depth)). Compare to a control period you *can* defend, and show both the valley trend and the campaign trend; the gap between them is the metric.
