---
title: "Line Chart"
summary: "Showing how a measure moves over an ordered scale, usually time."
levels: { data-analyst: junior , data-scientist: junior }
aliases: ["line graph", "line plot", "trend chart"]
prereqs: ["chart-selection", "time-series"]
related: ["chart-selection", "small-multiples", "chart-annotation", "axis-truncation", "moving-average"]
---

A line chart shows how a measure moves over an ordered scale, usually time. The line's job is direction and shape: rising, flat, seasonal, one-off step.

## Reading one

Read it in three passes. First the overall direction — the [trend](/t/trend). Then any repeating pattern, which is [seasonality](/t/seasonality) if it tracks the calendar. Then the points that break the pattern, which are the ones needing an explanation. **That last pass is where the analysis usually is, and it is the one people skip.**

## What makes one good

- One measure, or a handful. Name each line directly on the line rather than in a legend at the edge.
- Time on the horizontal axis, evenly spaced. A gap in time is a gap on the axis, not a point to be skipped over.
- A vertical axis that fits the movement. Unlike a bar chart, a line chart **may** start above zero, because the reader compares the height of a point against the gridline rather than the length of a mark — see [axis truncation](/t/axis-truncation).
- Smooth only when the underlying measure is smooth. A [moving average](/t/moving-average) over a spiky daily series is a modelling choice, and it should be labelled as one.

## The classic mistake

A line chart over categories with no order. Connecting regions A to B to C produces a shape that means nothing, because the horizontal axis has no order to preserve. Lines join ordered scales. If the axis is unordered, use a bar chart.

The second mistake is too many lines. Past roughly five, the plot becomes spaghetti and the reader tracks none of them. Split by category into a grid of small charts instead, each with its own panel: [small multiples](/t/small-multiples). And whatever you discover needs a note on the chart — [chart annotation](/t/chart-annotation) — or the reader will invent a cause.
