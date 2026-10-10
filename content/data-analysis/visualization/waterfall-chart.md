---
title: "Waterfall Chart"
summary: "Stepping from a start value to an end value through the rises and falls in between."
levels: { data-analyst: mid-level }
aliases: ["waterfall chart", "bridge chart", "waterfall graph"]
prereqs: ["bar-chart", "stacked-bar-chart"]
related: ["metric-definitions", "chart-annotation", "period-over-period", "line-chart", "stacked-bar-chart"]
---

A waterfall chart walks from a starting value to an ending value through the steps in between: a bar rising for each increase, a bar falling for each decrease, and a full bar at each end for the totals. It is the right form when the question is "what moved the number".

## The honesty condition

The end value is the start value plus the sum of the deltas, so **the chart is honest only if every step is a genuine contribution and nothing is counted twice**. That is harder than it sounds. Where a metric's definition has filters — refunds, test accounts, internal users, a changed event name — the waterfall has to apply the same filters as the metric itself, or the pieces will not add up to the total the reader has already seen on another page. See [metric definitions](/t/metric-definitions).

## Mechanics worth knowing

Each intermediate bar begins where the previous one ended, so the running total is the top of the last bar. Most tools build this as a stacked bar with an invisible base series, which is why the invisible series must never pick up a colour, and why the chart is sensitive to the order you place the steps in. Getting the order wrong produces a picture that does not resolve to the end value.

## Order is part of the analysis

**Sorted by size, the chart reads as "here is where the movement is". In operational order — price effect, volume effect, mix effect — it reads as a story about what happened.** Pick one and say which in the subtitle, because a reader will assume one or the other.

## Trade-offs

- A waterfall needs few steps. Twelve deltas and the reader cannot track the running total; the plot becomes decoration.
- It shows one path through one period. If the question is "how has this changed over time", that is a [line chart](/t/line-chart), and it answers in a fraction of the space.
- Each step hides its own composition. A "new customers" bar does not say which channel they came from, and if the debate is about the channel, the waterfall is the wrong level of detail.

Where it earns its keep: any [period over period](/t/period-over-period) conversation where people are arguing about which lever moved. Pair it with [chart annotation](/t/chart-annotation) for the step that needs a name, and remember it shares the stacked bar's encoding — see [stacked bar chart](/t/stacked-bar-chart) for the caveats.
