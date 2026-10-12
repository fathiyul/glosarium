---
title: "Discount Burn"
summary: "How much of GMV evaporates into vouchers and promos — the quiet tax on your own demand."
levels: { data-analyst: mid-level, tech-entrepreneur: growth }
aliases: ["discount load", "promo load", "voucher burn"]
prereqs: []
related: ["discount-depth", "promo-dependence", "profit-waterfall", "voucher-redemption-rate"]
---

Discount burn = total discount value (platform-funded excluded — count what *you* fund) ÷ GMV. The percent of gross value surrendered to vouchers, shop discounts, coin cashback, free-shipping funds and code campaigns. Where [AOV](/t/aov) measures the net price customers experienced, discount burn measures how much of the list price was fiction.

```text
GMV Rp 1,000M · platform-funded vouchers Rp 80M · own-funded discounts Rp 140M
discount burn (self-funded) = 14% of GMV  → each point ≈ one step off
                                            gross→contribution margin
```

Why it belongs on the board page: discount burn is the **slow tax that growth hides**. Sales rise at 12% burn, teams celebrate revenue; move to 18% and even flat volume quietly erodes [contribution margin](/t/contribution-margin) — the number every [profit waterfall](/t/profit-waterfall) ends at. The ratio's real value is *trend*: a 4-point rise across a quarter of "successful" campaigns says the store is now renting its own baseline.

Analyst mechanics: discount types behave differently — order-level vouchers (visible to customers, stackable) vs SKU price cuts (change the [ASP](/t/asp)) vs shipping subsidies (a separate line — count them in a sibling metric, see [shipping subsidy ratio](/t/shipping-subsidy-ratio), so you know which lever is burning). Split who funds: co-funded platform promos inflate your GMV *without* your burn; your own campaigns do the opposite.

The failure mode: burn measured only in aggregate misses the **concentration** — one hero SKU can carry 70% of the discount while looking fine in the total. Break by campaign, category and funding source.

When not to panic about burn: clearance (liquidation buys cash-out, that's a different objective — see pull-forward for its cousin), acquisition-window promos with a stated learning goal, and platform-mandated campaign participation — but *know* those exceptions by name; "we don't track it" turns them all into one number.
