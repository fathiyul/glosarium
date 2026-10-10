---
title: "Sparkline"
summary: "A tiny line that shows a shape over time inside a table cell or a headline."
levels: { data-analyst: junior }
aliases: ["sparklines", "micro chart", "inline chart"]
prereqs: ["line-chart", "table-design"]
related: ["table-design", "line-chart", "drill-down", "dashboard-design", "kpi-design"]
---

A sparkline is a very small line chart — usually one per row of a table, or one beside a headline number — that shows the shape of a measure over time without axes, labels or a legend. **It is a word-sized chart: you read its direction, not its values.**

## Where it earns its space

A table of twenty accounts becomes a table of twenty trends. The reader picks out which accounts are falling without sorting anything or leaving the table.

Beside a headline number, it tells you what the number means: "1,240 this week" is a fact, and with a sparkline it becomes "that is a new high" or "it has been flat for six months".

## Design rules

- No axes, no gridlines, no tick labels. A sparkline with an axis is a small chart, and small charts are hard to read.
- One series per sparkline. Two lines inside one is not readable at that size.
- Anchor the endpoints with a dot, and often the minimum and maximum.
- Keep it one row tall, short enough that the shape survives.
- Keep the same time window for every sparkline in a table, and put it in the column header. Mixed windows invite a false comparison.
- Give the numbers somewhere: a tooltip, a [drill-down](/t/drill-down), or the same series as a proper chart.

## The trade-off

**A sparkline hides level, spread and scale.** Two sparklines with the same shape can be wildly different in size, and a sparkline's vertical range is usually its own rather than shared. That is fine for shape and misleading for comparison — if the reader needs to compare magnitudes, they need a [line chart](/t/line-chart) with a shared axis.

It also hides the denominator. A falling line may be a falling rate or a shrinking base, and the sparkline shows neither. Use it as a pointer to the number, not a substitute for it, and keep it beside the digit that carries the value: that pairing is the substance of [table design](/t/table-design) and the practical core of [kpi design](/t/kpi-design).
