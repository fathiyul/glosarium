---
title: "Dual-Axis Charts"
summary: "Two scales on one plot, where the crossing points depend on the scales you chose."
levels: { data-analyst: senior }
aliases: ["dual axis chart", "dual-axis plot", "two y axes"]
prereqs: ["data-visualization", "axis-truncation"]
related: ["axis-truncation", "scatter-plot", "small-multiples", "correlation-coefficient", "chart-selection"]
---

A dual-axis chart puts two measures on one plot with two value axes — typically one series per axis, revenue on the left and conversion rate on the right. It exists to fit two things into one frame. The cost is that the relationship the reader sees is an artefact of the two scales you picked.

## The core problem

**The crossing point and the apparent relationship depend on the axis ranges, not on the data.** Rescale the right axis and the lines cross somewhere else, or never. Zoom one axis and the "divergence" you were about to present disappears entirely.

```text
Same two series, same plot, different right-axis range (e.g.):

revenue, left axis 0–120
rate, right axis 0–10%   →  the lines cross in March
rate, right axis 0–5%    →  revenue leads the whole way
```

There is no version of this chart in which the two lines' relative position means anything, **because their relative position was chosen by whoever set the axes.** A reader who says "revenue turned before rate did" is reporting a plot setting.

## When it is defensible

Dual axes are not simply wrong. The honest case is narrow:

- the two series are in different units and both are already well understood by the reader
- the question really is "did these happen at the same time", not "are these related"
- the scaling choice is visible and stated, not buried in the tool
- there are exactly two series, and neither is a component of the other

Even then, put "two scales" in the subtitle. Most readers will not look at the axis labels.

## When it is the wrong choice

- When the reader will read the gap or the crossing as a relationship. A sentence in the title does not reliably stop them.
- When the two measures differ enough in scale that a modest percentage change on the right axis renders as a cliff.
- When one series is the other's numerator or denominator — the chart will look like it is showing something independent when it is not.
- When either axis is truncated, because now the chart is wrong in the way described in [axis truncation](/t/axis-truncation), twice over.

## Better alternatives

Two stacked panels sharing an x-axis are almost always clearer and cost one extra row of height. If the question is genuinely about co-movement, rebase both series to 100 at a common start date and plot them on one axis — then the comparison is real and the scaling is a decision you can defend. If you actually want to claim a relationship, use a [scatter plot](/t/scatter-plot) and report the [correlation coefficient](/t/correlation-coefficient) with the caveat that it earns. When the categories are many and you are tempted to double up the axes, [small multiples](/t/small-multiples) with a shared scale usually beats both.
