---
title: "Long-Tail Distribution"
summary: "A few huge values and a very long tail of small ones, where the average misleads."
levels: { data-analyst: mid-level }
aliases: ["long tail", "heavy-tailed distribution", "long-tailed data"]
prereqs: ["distribution-shapes", "central-tendency"]
related: ["outliers", "percentile", "pareto-chart", "central-tendency", "distribution-shapes", "segmentation"]
---

A **long-tail distribution** has a small number of very large values and a very long stretch of
small ones. Revenue by customer, plays per song, file sizes, page views per URL: a handful of rows
carry most of the total, and a huge mass of rows carry almost none.

The consequence for reporting is that the mean sits above almost every value in the dataset.
Suppose, as an illustration, that five of three hundred customers account for most of the month's
revenue. A sentence like "**average revenue per customer** is 340" then describes none of the three
hundred. Reporting the [median](/t/central-tendency) and a high
[percentile](/t/percentile) such as p90 is more honest, and a
[Pareto chart](/t/pareto-chart) shows where the concentration actually sits.

Three places this bites:

- Comparison. Tests on long-tailed metrics need far more data to reach the same sensitivity as
  binary metrics, because a few units decide the answer. Settle
  [how much data you need](/t/sample-size-calculation) before you start, not after.
- Targets. A target to "raise average order value" on a long-tailed metric can be met by one large
  account. Tie it to the median or to an order count as well.
- Outlier handling. A long tail is not the same thing as
  [outliers](/t/outliers): if the extreme rows are real customers, they are the point of the metric,
  not a defect to remove.

The trade-off is this: a mean over a long-tailed metric is unstable, because it moves with whichever
big account happened to fall inside the window. A median is stable but throws away the fact that a
few rows matter enormously. Report both, and say which decision each one supports.

One last possibility to rule out: a long tail can be two simple distributions glued together.
Combining segments with genuinely different behaviour produces one
[tall-and-thin mixture](/t/segmentation), so splitting the data often reveals two easy shapes where
there seemed to be one exotic one.
