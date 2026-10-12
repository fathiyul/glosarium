---
title: "Predictive CLV"
summary: "Forecasting a customer's future margin — the number budgets actually run on."
levels: { data-analyst: senior, data-scientist: mid-level }
aliases: ["predicted lifetime value", "CLV forecast"]
prereqs: ["historical-clv"]
related: ["bg-nbd", "historical-clv", "acquisition-quality", "cohort-analysis"]
---

Predictive CLV estimates the margin a customer *will* produce from now (or from acquisition forward), and it is the number [CAC decisions](/t/cac) actually depend on — you cannot spend against history, you spend against futures. Three model families, in order of humility:

```text
cohort extrapolation: average curve at each customer-age
                      → cheap, honest, assumes nothing changes
probabilistic:        BG/NBD × Gamma-Gamma — cadence × spend
                      → the standard; small data, interpretable
supervised ML:        regress N-month margin on behavior features
                      → strongest with scale; needs a real
                        validation regime (aging-out tests)
```

The aging test is what separates a working CLV practice from a slide: predict at day-90, observe at day-365, score the model against [historical CLV](/t/historical-clv) *by cohort and channel*, every quarter, with the drift published. Cohorts whose predictions go stale fastest — new acquisition channels, promo-heavy segments, post-policy-change customers — are exactly where budgets move, which is where the model is weakest.

The traps specific to e-commerce data: **promo pollution** — a model trained during a voucher-war quarter learns that every customer is a discount chaser and under-forecasts the quiet cohort arriving after; **survivorship in training sets** — features collected only for retained customers teach the model that silence looks like nothing; **COD skew** — in Indonesian data the payment method correlates with return/rejection behavior, so the honest feature is delivered-and-paid margin, not checkout intent.

Data scientists: CLV regression is a *ranking* tool long before it is a *valuation* tool — P50 calibration is rare; if you cannot defend the point estimate, ship the decile ranking and let budget rules run on rank. Analysts: the number only means something next to its error bars — "CLV 340k ± " with nothing after the sign is the conversation-ender, not the opener.

When not to build it: pre-PMF (no stable pattern to extrapolate), one-shot categories (frequency collapse makes every model a distribution guess), and where decisions only care about the *top* of the value distribution — [RFM](/t/rfm-analysis) bands get you there with zero modeling.
