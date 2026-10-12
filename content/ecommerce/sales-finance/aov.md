---
title: "Average Order Value (AOV)"
summary: "Net revenue divided by order count — the average basket size."
levels: { data-analyst: junior, tech-entrepreneur: mvp }
aliases: ["AOV", "average transaction value"]
prereqs: ["gmv"]
related: ["revenue-decomposition", "cart-abandonment-rate", "gmv", "pricing-page"]
core: [data-analyst]
---

AOV is what one order contributes to revenue on average: **AOV = net revenue ÷ number of orders**. One month brings Rp 95,000,000 net across 1,000 orders — AOV Rp 95,000. "Net" matters: discounts, cancellations and returns should be out of the numerator, or your AOV quietly measures [GMV](/t/gmv) instead.

AOV splits into two levers you can move separately:

```text
AOV = ASP × UPT
average selling price × units per transaction
4 items at Rp 23,750 avg → AOV Rp 95,000
```

More items per basket or pricier items — same headline number, very different playbooks. Bundles and add-on checkout offers push UPT; a premium assortment pushes ASP.

The classic junior-analyst mistake is reading an AOV movement as intent when it is usually **mix**. A paid-campaign week brings small first orders and AOV drops without anyone's basket shrinking; a big-ticket month lifts it for reasons that vanish next week. Decompose by category, channel and new-vs-returning before telling anyone AOV "improved".

As a founder chasing AOV, the trap is the discount ladder: "free shipping over Rp 150,000" lifts the average basket and the delivery subsidy with it — check the lift against [contribution margin](/t/contribution-margin), not revenue. AOV is a steering metric inside [revenue decomposition](/t/revenue-decomposition); it is not the destination.

When AOV misleads structurally: stores with wildly different price bands (refrigerators and phone cases averaged together produce a number that describes nothing). Quote category-level AOV, or the median order value next to the mean — order values are right-skewed, and the mean is always being dragged by a handful of whale baskets.
