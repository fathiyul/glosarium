---
title: "Discount Depth"
summary: "How deep the markdown runs — the variable that converts 'we did a promo' into arithmetic."
levels: { data-analyst: mid-level, tech-entrepreneur: pmf }
aliases: ["promo depth", "markdown depth"]
prereqs: []
related: ["discount-burn", "price-elasticity", "voucher-redemption-rate", "promo-uplift"]
---

Discount depth = 1 − (effective price ÷ list price), averaged across discounted orders (weight by revenue, not by order count, or tiny vouchers on huge baskets distort it). Where [discount burn](/t/discount-burn) measures how *much* of GMV you surrendered, depth measures how *hard* you cut where it happens.

```text
same 10% burn, two worlds:
20% depth on half of orders    → promo junkies, elasticity plays
5% depth on double orders      → gentle nudge, cheaper loyalty
```

The pair of numbers is the real diagnostic: burn rising on **deepening** cuts (flat participation) means the market's price expectation has moved and you're chasing it down — an [elasticity](/t/price-elasticity) and [price index](/t/price-index) conversation. Burn rising on **wider** participation (flat depth) means the same discount is now leaking to people who'd have paid anyway — a targeting and voucher-eligibility conversation, and usually the cheaper fix.

Founders at PMF stage: depth is a **brand memory** asset. Buyers anchor on the deepest price they've seen you at — three campaigns at 40% off and your "list price" becomes fiction; the next *full-price* customer is comparing to the anchor, not to you. Every depth decision quietly sets the price your store is allowed to exist at. This is why one clean all-hands-down event beats four sloppy overlapping discounts — the market can forget one date; it cannot forget your pattern.

Analyst hygiene: define the reference price per SKU per day (list price drifts — platform-mandated "normal prices" and your own edits both move), and split depth by *who funds* (platform co-funded vouchers are not your burn but *do* move your depth anchor).

When depth is the right number to defend: clearance and dead-stock liquidation — deep, fast, visible, and *announced as clearance*, so the anchor stays on the regular line.
