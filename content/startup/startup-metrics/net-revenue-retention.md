---
title: "Net Revenue Retention"
summary: "Revenue kept from existing customers after churn, downgrades and expansion."
levels: { tech-entrepreneur: growth }
core: [tech-entrepreneur]
---

Net revenue retention (NRR) measures what happened to the revenue of a starting cohort of customers over a period — counting expansion, contraction and churn together. Start of period they were $100K ARR; you added $12K upsell, lost $4K downgrades and $6K logos; end of period that cohort is $102K, NRR 102%. It is the cleanest single answer to "is the installed base growing on its own?"

Above 100% is the SaaS holy grail: even with zero new customers, revenue compounds, because each cohort grows while it lives. Below 100%, every period's growth must be bought, and growth spending decides your fate ([CAC payback](/t/cac-payback-period) and [burn multiple](/t/burn-multiple) both matter more). Investors use NRR bands roughly as "110%+ excellent, 90s means a product or pricing problem" — conventions worth knowing, not physical laws; NRR expectations shift hard with average contract size.

The measurement traps:

- Cherry-picked cohorts. NRR on "customers who onboarded well" is marketing, not math. Use the cohort that started the period, all of it.
- Expansion masking churn. If three upsells hide twelve quiet downgrades, NRR says fine while [logo churn](/t/logo-churn-vs-revenue-churn) is sick. Report gross NRR (churn + downgrades only) alongside net.
- Pricing-model incomparability. Usage-based and seat-based products produce different NRR shapes by construction; comparing across competitors requires knowing which.

```text
NRR = (start ARR + expansion − contraction − churn) / start ARR
```

When not to use it: very early, small cohorts make it a lottery; in services-adjacent businesses renewal timing and one-off projects distort it. And never optimize it naked: NRR at 120% achieved by squeezing expansion hard while support erodes shows up in logos eventually. Pair it with [customer success](/t/customer-success) health signals, not just the number.
