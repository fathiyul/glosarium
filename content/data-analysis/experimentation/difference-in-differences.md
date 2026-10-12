---
title: "Difference-in-Differences"
summary: "Estimating an effect by comparing a treated group's change with an untreated group's change."
core: [data-scientist]
levels: { data-analyst: senior , data-scientist: senior }
aliases: ["difference in differences", "diff-in-diff", "double difference"]
prereqs: ["quasi-experiment", "causal-inference", "regression-analysis"]
related: ["quasi-experiment", "causal-inference", "confounding-variable", "randomized-controlled-trial", "seasonality"]
---

Difference-in-differences (DiD) estimates an effect from a treated group and an untreated group, each measured before and after the change. The untreated group's change is used as the estimate of what would have happened to the treated group anyway.

Suppose a promotion runs in two regions and not in four others. You have weekly revenue for all six regions for the quarter before and the quarter after. The numbers below are illustrative, not a result:

| Group | Before | After | Change |
|---|---|---|---|
| Treated (2 regions) | 100 | 112 | +12 |
| Untreated (4 regions) | 100 | 106 | +6 |
| Estimated effect | | | +6 |

The treated group rose by 12, but the untreated group rose by 6 on its own, so only the difference of the differences is attributed to the promotion. Compare that with a naive before-and-after on the treated group alone, which would report +12.

## The assumption that carries it all

DiD rests on **parallel trends**: absent the promotion, the treated and untreated groups would have moved in parallel. That assumption **cannot be verified from post-period data** — once the treatment has been applied, there is no untreated version of the treated group left to observe. You can only argue for it from the pre-period: do the two series track each other over a long, stable stretch before the change, with a similar seasonal shape?

If they did not, your estimate is biased by the gap between their true trends, and the post-period data cannot tell you how big it is. So report the pre-period comparison alongside the estimate, and be specific about what would make you doubt it.

A randomised comparison avoids the argument entirely, because randomisation balances the groups instead of assuming they move together ([randomised controlled trial](/t/randomized-controlled-trial)).

## Things that break it

- Diverging pre-trends. The groups were drifting apart before the change, so the comparison over-corrects.
- Anticipation. Treated users change behaviour before the change lands, as when a promotion is advertised in advance.
- Differential shocks. A competitor action, an outage or a budget cut that hits one group and not the other.
- Measuring the unit wrong. Aggregating into coarse groups hides variation and makes the uncertainty look smaller than it is.
- Treating the two periods as independent samples. They are not: the same units are measured twice, so uncertainty has to account for that. Plain standard errors here will overstate your confidence.

## Where it fits

DiD is one of a family of designs used when you cannot randomise ([quasi-experiment](/t/quasi-experiment)); others include synthetic control and regression discontinuity, each with their own assumption. It is the right shape of answer for a rollout that was not random — a policy, a regional campaign, a price change by market — and it is only as good as the pre-period evidence you bring. The same discipline about confounders applies as in any observational estimate ([confounding variable](/t/confounding-variable), [causal inference](/t/causal-inference)).
