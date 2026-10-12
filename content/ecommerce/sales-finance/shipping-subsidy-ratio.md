---
title: "Shipping Subsidy Ratio"
summary: "The share of revenue you spend buying customers' delivery — the discount that hides in logistics."
levels: { data-analyst: mid-level, tech-entrepreneur: growth }
aliases: ["free shipping ratio", "shipping subsidy load"]
prereqs: []
related: ["discount-burn", "cart-abandonment-rate", "profit-waterfall", "cash-on-delivery"]
---

Shipping subsidy ratio = delivery costs absorbed by the seller (free-shipping funds, voucher-shipping campaigns, flat-rate-under losses) ÷ net revenue. Indonesian e-commerce makes this metric non-optional: "gratis ongkir" is a category expectation, and the cost lands somewhere between the ad budget and the margin line depending on who is counting.

```text
the three faces of shipping spend:
- product of the basket   (real cost: courier fee + packaging − paid freight)
- promo mechanic          (threshold-funded: free over Rp 100k)
- platform-funded         (not your burn, but shapes buyer expectation)
```

Only the first two belong in the ratio; mix them with platform-funded numbers and you get a subsidy that "improves" every time the platform spends more. The classic leak: a Rp 150k free-shipping threshold that pulls baskets *just* over the line while courier cost on that order exceeds the freight the customer paid — the [profit waterfall](/t/profit-waterfall) line "contribution margin" absorbs the difference and nobody owns the number.

Why it is the discount nobody debates: price discounts are visible to finance and marketing both; shipping funds sit in operations' budget, approved as "campaign mechanics". A 2-point drift in the subsidy ratio across quarters is a silent margin transfer that [discount burn](/t/discount-burn) never sees because it isn't a discount code.

The levers, in typical impact order: **threshold tuning** (lift the free-shipping line with [basket size](/t/basket-size), measure UPT elasticity — most of the cost is set by the threshold, not the courier), **weight/zone-aware pricing** (flat subsidies overpay light orders, under-recover heavy ones), **COD economics** (cash-on-delivery fees + rejection costs belong in the same conversation, see [cash-on-delivery](/t/cash-on-delivery)), and **courier negotiation** at scale.

When the ratio is *fine* high: acquisition-phase stores buying habit formation with a stated payback plan — but say the plan out loud: subsidy is a [CAC](/t/cac) wearing delivery clothes, and judge it with the same retention math.
