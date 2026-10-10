---
title: "Pareto Chart"
summary: "Bars in descending order with a cumulative line, showing where the few big causes are."
levels: { data-analyst: mid-level }
aliases: ["Pareto diagram", "Pareto analysis", "80/20 chart"]
prereqs: ["bar-chart", "chart-selection"]
related: ["bar-chart", "dual-axis-chart", "chart-selection", "long-tail-distribution"]
---

A Pareto chart is a bar chart with the bars in descending order, plus a line showing the cumulative share as you walk down them. The bars say how much each cause contributes; the line says how much the first few account for together.

## What it is for

Prioritisation. Which defects to fix first, which ticket types cover most of the volume, which products carry most of the revenue. The chart prices the effort for you: the cumulative line shows how much of the total you have covered once you have dealt with the top few, and fixing the top three often beats fixing the bottom twenty.

```text
Defects by type, descending (e.g.)

Type | Count | Share | Cumulative
-----|-------|-------|----------
  A  |    52 |  52%  |  52%
  B  |    17 |  17%  |  69%
  C  |    15 |  15%  |  84%
  D  |     8 |   8%  |  92%
  E  |     5 |   5%  |  97%
  F  |     3 |   3%  | 100%
     |   100 |       |
```

## About the "80/20" label

The named principle behind the chart — that a small number of causes account for a large share of the effect — is often given a "vital few and trivial many" framing with a rough 80/20 label attached to it. **Treat that 80/20 as a name for the idea, not as a measured fact about your data.** The split is whatever your bars and your cumulative line say. Compute it; do not quote it. A dataset where the top cause is 30% of the total is not less valid, it is just less convenient.

## Practical notes

- **Sort by count, descending.** The sort is the analysis — a Pareto chart sorted by anything else is not a Pareto chart.
- Group the tail into "other" once the individual bars stop being worth reading.
- The cumulative line lives on a second, right-hand axis in percent. Because it is a second scale, read [dual axis charts](/t/dual-axis-chart) before you describe what the two lines are doing relative to each other.

## The trade-off

It inherits the bar chart's limit on categories, and when there are many similar-sized causes the bars flatten out and the cumulative line becomes a straight diagonal. That is not a broken chart — it is the finding: there is no vital few here, and "fix everything a bit" is the right strategy. Some distributions are [long tailed](/t/long-tail-distribution) by nature, and a Pareto chart of them will look unremarkable no matter how you sort.
