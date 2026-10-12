---
title: "Second Purchase Rate"
summary: "Share of first-time buyers who place a second order — the earliest honest signal of real fit."
levels: { data-analyst: junior, tech-entrepreneur: pmf }
aliases: ["2nd order rate", "repurchase rate", "second-order conversion"]
prereqs: []
related: ["repeat-purchase-rate", "rfm-analysis", "retention-analysis", "promo-dependence"]
---

Second purchase rate = customers placing a second order ÷ customers whose first order is old enough to have had the chance. The second clause is the whole craft: a customer who bought last week isn't "not repeating", they're just *recent* — fix an observation window per cohort age and compare like ages.

```text
Jan cohort, observed through Jun: 24% second-order
Jun cohort, observed through Jul: 6%   ← mostly calendar, not quality
age-matched: Jan cohort at 1 month was 9% → Jun is not a collapse
```

Why the *second* order specifically, and not the full [repeat rate](/t/repeat-purchase-rate): it is the earliest available evidence that the first purchase was a relationship, not an event. First orders arrive from ads, vouchers, curiosity and [promo](/t/promo-uplift); a second order is paid for by *memory* — the product did something worth returning for. Founders probing PMF: a rising second-purchase rate at shrinking first-order volume is a healthier signal than the reverse; the funnel that only ever produces first-time buyers is a leaky bucket no CAC fix will hold.

The diagnostic cuts that earn their keep:

- **By acquisition channel** — the second-purchase rate of voucher-hunter cohorts vs organic tells you which traffic is a customer pipeline and which is a discount arbitrage.
- **By first-category** — the [gateway category](/t/gateway-category) analysis is exactly this number by entry product.
- **Time-to-second** — the distribution shapes the re-engagement timing: if the median second order is 45 days, a win-back email at day 90 is writing notes to the absent. [RFM](/t/rfm-analysis) recency thresholds are this curve discretized.

Analyst traps: survivor bias (counting only customers whose first order was *delivered-and-kept* — COD rejects never had a relationship to repeat), and seasonality (Ramadan cohorts' second orders land on Eid calendars, not uniform weeks — age cohorts by calendar event, not by naive days-since).

When the metric stops meaning anything: categories whose natural repurchase cycle is years (sofas, phones) — the second purchase exists but not in the window you can measure; there, the honest proxy is referral and basket-expansion instead.
