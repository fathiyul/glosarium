---
title: "Choosing a Chart"
summary: "Matching the comparison you want to make to a chart form that shows it."
levels: { data-analyst: junior }
aliases: ["choosing a chart", "which chart to use", "chart type selection"]
prereqs: ["data-visualization", "descriptive-statistics"]
related: ["bar-chart", "line-chart", "histogram", "scatter-plot", "stacked-bar-chart", "treemap"]
---

**Choosing a chart is matching the comparison the reader is making to a form that shows it.** The form is not the hard part; knowing what you were asked is.

## Start from the question

| You want to show | Reach for |
|---|---|
| Compare amounts across categories | Bar chart |
| Change over time | Line chart |
| Relationship between two measures | Scatter plot |
| Distribution of one measure | Histogram, or box plot |
| Part-to-whole | Stacked bar; treemap when there are many parts |
| Composition changing over time | Stacked bar, or area |
| Ranking with a long tail | Sorted bar chart; Pareto chart to show the concentration |
| One number against a target | The number, with a sparkline beside it |
| A single status over time | Sparkline |

Part-to-whole is worth a caveat: pies are weak for it. Angle and area are harder to judge than length, and a pie with eight slices cannot be read at all. A stacked bar does the same job with a comparison people can actually make.

## Three questions before you pick

1. What comparison is the reader making?
2. How many categories are there?
3. Is time one of the axes?

Most mis-chosen charts fail because **the answer to the first question was never settled** — the analyst charted the column they had rather than the comparison they were asked for. A scatter plot does not answer "which region is biggest" any more than a bar chart answers "do these two numbers move together".

## The classic mistake

Reaching for the form you know. If your default is a [bar chart](/t/bar-chart), every question becomes a ranking; if it is a [line chart](/t/line-chart), every question becomes a trend. Learn what each of the main forms is good at — [histogram](/t/histogram), [box plot](/t/box-plot), [scatter plot](/t/scatter-plot), [stacked bar chart](/t/stacked-bar-chart), [treemap](/t/treemap) and [Pareto chart](/t/pareto-chart) each have one — and the question picks the chart for you.
