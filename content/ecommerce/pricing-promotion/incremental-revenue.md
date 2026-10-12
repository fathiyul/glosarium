---
title: "Incremental Revenue"
summary: "The revenue an action caused — total sales minus what would have happened anyway."
levels: { data-analyst: mid-level, data-scientist: mid-level }
aliases: ["incrementality", "true lift", "incremental sales"]
prereqs: []
related: ["promo-uplift", "ab-testing", "holdback-group", "guardrail-metrics", "unit-economics"]
---

Incremental revenue is the gap between what happened with a campaign, promo or change and what would have happened without it. A flash sale brought Rp 1,000,000,000 — if Rp 600,000,000 of that was people who would have bought anyway (next week, at full price, or you simply captured a decided purchase), the **incremental** revenue is Rp 400,000,000.

The naive and the honest arithmetic:

```text
promo cost (discounts + fees):     Rp 150M
naive ROI:        1,000 / 150 = 6.7×
incremental ROI:    400 / 150 = 2.7×
real test: is 400M × margin% > 150M?
```

Which of these numbers runs the budget meeting decides how next quarter gets planned.

Measurement options, weakest to strongest: pre/post baselines (trends and seasonality lie), user-split [A/B tests](/t/ab-testing) with a small [holdback group](/t/holdback-group) that sees no promo, geo or time-split tests when users cannot be split, and [difference-in-differences](/t/difference-in-differences) to subtract trending baselines from both groups. Data scientists should choose the counterfactual first and the model second — an "uplift estimate" from observational matching is a hypothesis, not a measurement.

Attribution reporting systematically overstates incrementality: last-click credits the ad that reminded a decided buyer, not the thing that created the decision. That is why mature teams keep one always-on holdout: the only number that answers "what does the *next* rupiah of spend return?"

Guard the downside while testing it: [guardrail metrics](/t/guardrail-metrics) (margin, refund complaints, delivery capacity) catch the promotion that "works" by making everyone buy at a loss. And when a channel genuinely cannot be tested (brand, one-off launches), say so — reporting total attributed revenue as if it were incremental is a [vanity metric](/t/vanity-metrics) with a P&L attached.
