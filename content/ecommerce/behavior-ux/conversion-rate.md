---
title: "E-commerce Conversion Rate"
summary: "Share of sessions that end in an order — state the denominator or it means nothing."
levels: { data-analyst: junior, frontend: junior }
aliases: ["CR", "order conversion rate", "purchase conversion"]
prereqs: []
related: ["funnel-analysis", "cart-abandonment-rate", "aov", "ab-testing", "cash-on-delivery"]
core: [data-analyst]
---

Conversion rate is orders divided by sessions — usually the share of sessions containing at least one purchase. Two stores can both report "CR 1.8%" and mean different things: one counts orders/sessions (a repeat buyer in the same session inflates it), the other counts converting-sessions/sessions. Write the formula on the chart; without it, nobody can compare two numbers honestly.

Blended CR hides everything interesting. Segment it or it lies:

```text
organic 3.1% · paid 1.4% · email 4.8%
app 2.6% · mobile web 1.1%
new visitor 0.9% · returning 5.2%
```

Paid traffic's "low" CR is often correct behavior — cold visitors need more visits before buying; reading it as a defect manufactures a witch hunt against the media buyer. Category CR differs for the same reason: furniture at 1% is healthy, phone cases at 1% are a fire. Compare each thing against its own history.

Seasonality note: during [double-date campaigns](/t/promo-uplift), CR lifts platform-wide — the campaign-week spike is the market's achievement, not your funnel's. Compare like-for-like weeks, not like-for-any-week.

Frontend readers, this is where your work shows up in numbers. The usual suspects, roughly in order of damage: total-with-shipping appearing only at checkout (surprise costs kill carts — see [cart abandonment](/t/cart-abandonment-rate)), mandatory account creation, payment steps that leave the app ([COD](/t/cash-on-delivery) and local rails matter more than global checkout best-practice lists admit), and forms that assume a desktop. When you suspect friction, walk the [funnel](/t/funnel-analysis) step by step instead of guessing which page hurts, and fix through [A/B tests](/t/ab-testing), not vibes.

And the honest ceiling: CR is a ratio, not a plan. Squeezing conversion on a fixed audience eventually buys diminishing increments; sometimes 2% of ten times the traffic beats 4% of none. Pair it with [AOV](/t/aov) in [revenue decomposition](/t/revenue-decomposition) before anyone celebrates.
