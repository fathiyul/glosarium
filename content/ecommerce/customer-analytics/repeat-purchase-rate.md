---
title: "Repeat Purchase Rate"
summary: "Share of buyers who order again — retention in one number."
levels: { data-analyst: junior, tech-entrepreneur: pmf }
aliases: ["repeat rate", "second-order rate"]
prereqs: []
related: ["rfm-analysis", "cohort-analysis", "retention-analysis", "churn-rate", "net-revenue-retention"]
core: [data-analyst]
---

Repeat purchase rate: of the customers who bought in a window, what share bought again within a longer observation window. Always two windows, always stated:

```text
first orders Jan–Mar, observed through Jun:
1,000 first-time buyers → 240 ordered again = 24%
```

For stores without subscriptions, this is the simplest truth about whether customers actually come back. Founders reading it at PMF stage: a first order from flash-sale traffic is not yet a customer — segment the rate by acquisition channel before believing the blend. A store whose email-cohort returns at 40% and paid-social at 8% has a fit *mix* problem no dashboard can average away.

Three habits keep the number honest:

- **Cohort, don't blend.** "This quarter's repeat rate" mixes vintages of customer; build the [cohort curve](/t/cohort-analysis) — % of each first-purchase month buying again by month N — and compare cohorts at equal age.
- **Mind the timing.** Median time-to-second-order defines a sane observation window. Measuring 30-day repeat for a furniture store reads near zero and means nothing; those thresholds are exactly what [RFM](/t/rfm-analysis) recency bands are made of.
- **Define churn against it.** In non-subscription commerce, "churned" is a silence threshold — commonly ~90–180 days of inactivity — so the repeat curve and a [churn rate](/t/churn-rate) are two views of one distribution.

When it understates you: one-and-done categories (appliances, wedding goods) where healthy businesses survive on new demand. When it overstates you: households with shared accounts and resellers. And never confuse repeat *people* with [net revenue retention](/t/net-revenue-retention): a customer buying again at half the value is retention going the wrong way — pair the rate with per-customer margin before anyone calls it growth.
