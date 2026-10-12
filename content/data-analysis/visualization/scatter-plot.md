---
title: "Scatter Plot"
summary: "Plotting two measures together to see whether they move in step."
levels: { data-analyst: junior , data-scientist: junior }
aliases: ["scatterplot", "scatter graph", "scatter chart"]
prereqs: ["chart-selection", "descriptive-statistics"]
related: ["correlation-coefficient", "correlation-vs-causation", "outliers", "heatmap", "axis-truncation"]
---

A scatter plot puts one measure on the horizontal axis and another on the vertical axis, with one dot per row. It answers "do these two numbers move together", and **it answers with a shape rather than with a number**.

## What to look for

- A rising or falling band: the two measures move together.
- A cloud with no direction: they do not.
- Clusters: more than one population is mixed into the same axes.
- Curves: the relationship is real but not a straight line, and a correlation number would have hidden that.
- Points far from everything else: see [outliers](/t/outliers). Often the most informative dot on the plot.

## The number and its limits

If you see a band, the number that describes its tightness is the [correlation coefficient](/t/correlation-coefficient). It is not the whole answer, and the reason is [correlation versus causation](/t/correlation-vs-causation): a scatter plot showing that taller customers spend more has not shown that height causes spending. Both may track age.

When you suspect a third factor, colour the dots by it. A band that splits into two clean coloured clusters has just told you that your single relationship was two.

## Classic mistakes

- **Overplotting.** Many rows land on the same spot and you see one dot where there are two hundred. Use transparency, or bin the pairs into a [heatmap](/t/heatmap) of the density.
- Scaling both axes so a strong relationship looks weak, or a weak one looks strong. The axis range is a choice — see [axis truncation](/t/axis-truncation) — and while zooming is legitimate here, say what you did.
- Categorical colour for eight categories, which turns the plot into confetti and tests the reader's colour memory instead of showing the data.
