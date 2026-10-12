---
title: "Voucher Redemption Rate"
summary: "The share of distributed vouchers that become purchases — the gap between a campaign and a calendar event."
levels: { data-analyst: junior }
aliases: ["redemption rate", "coupon usage rate"]
prereqs: []
related: ["discount-burn", "discount-depth", "revenue-per-recipient", "promo-uplift"]
---

Redemption rate = vouchers used ÷ vouchers distributed. It converts "we sent a million vouchers" into evidence. The reading differs enormously by *distribution context*, and lumping them is the junior mistake:

```text
claim-in-store wallet    5–20% typical   (self-selected intent)
email to engaged list    low-single-digit→low-teens   (segment quality)
push / pop-up spam       ~1%             (volume vanity by design)
checkout-time only       near 100%       (not a funnel — it's a price)
```

The denominator is the story: a "10% redemption" that went to 50,000 random push users is 5,000 orders that mostly would have come anyway; 4% on a list of engaged cart-abandoners may be real recovered revenue. Always pair redemption with the *value* metrics: revenue per redeemed voucher, [discount burn](/t/discount-burn) per redemption, and whether the orders came from new or already-active customers.

Two operational truths analysts keep re-learning: **expiry cliffs** — redemption concentrates before expiry, so mid-campaign "it's not working" panic usually measures calendar position, not demand; and **min-spend mechanics** — a Rp 200k threshold on a Rp 30k basket converts the voucher into an [UPT](/t/upt) experiment, and the redemption that does happen carries a basket effect worth separating from the discount effect.

For campaign optimization: test eligibility and threshold, not just depth. Most voucher budgets are lost to distribution (given to buyers who'd pay anyway — [incrementality](/t/incremental-revenue) again), not to depth. The cheapest redemption-rate "improvement" is sending fewer, better vouchers.

When the number is meaningless: auto-applied discounts (denominator = every eligible visitor — there's no decision in there to measure), and stacked-promo periods where the voucher did nothing because a deeper platform sale was live anyway. Compare to a no-voucher holdout when the budget is big.
