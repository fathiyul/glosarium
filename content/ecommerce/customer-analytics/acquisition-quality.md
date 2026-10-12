---
title: "Acquisition Quality"
summary: "Judging channels by what acquired customers become — not by what they spend on order one."
levels: { data-analyst: mid-level, tech-entrepreneur: growth }
aliases: ["channel quality", "cohort quality"]
prereqs: ["historical-clv"]
related: ["predictive-clv", "second-purchase-rate", "cac", "ltv-cac-ratio"]
---

Acquisition quality is what the customers from each channel *turn into*: [second-purchase rate](/t/second-purchase-rate) at fixed age, [margin realized at 6–12 months](/t/historical-clv), COD-rejection and return behavior, support load, unsubscribe velocity. It exists because every acquisition metric available on day one — CPA, first-order [AOV](/t/aov), even attributed [ROAS](/t/roas) — measures the *transaction*, and channels differ most in the people they bring *afterwards*.

```text
TikTok ads  CPA 18k · 2nd-order 9%  · return 22% · 12mo CLV 90k
Search      CPA 45k · 2nd-order 31% · return 6%  · 12mo CLV 410k
"cheapest CAC wins" — the table says otherwise
```

The measurement discipline is cohort-age, not calendar: compare channels' cohorts at equal customer age (a channel launched last month has no 12-month evidence, period) and hold the *offer* constant when you can — voucher channels bring voucher behavior; some of the "quality gap" is really the *deal* selecting deal-buyers, which is a pricing decision wearing a media hat ([promo dependence](/t/promo-dependence)).

Analysts: build the quality table per channel-quarter — [RFM](/t/rfm-analysis) mix and COD-share columns included — and let the CAC discussion use it: the channel whose cheap customers never repeat has a [blended CAC](/t/marketing-efficiency-ratio) that quietly includes the re-acquisition of the same intent every season.

Founders: this is the metric that reorders growth priorities. A 30%-higher CPA is *cheaper* when the cohort's lifetime margin is 3× — the arithmetic behind every [LTV:CAC](/t/ltv-cac-ratio) claim worth making. The uncomfortable corollary: some of your best-looking channels are renting buyers from a discount calendar; some of your ugly ones are building the base.

When quality measurement misleads: attribution windows that re-assign a customer's channel after their *later* behavior (last-touch hands your search re-marketing the credit a creator created), multi-account households, and reseller buyers masquerading as many customers ([purchase frequency](/t/purchase-frequency) patterns flag them).
