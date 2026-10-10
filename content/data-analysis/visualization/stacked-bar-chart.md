---
title: "Stacked Bar Chart"
summary: "Totals plus their composition in one bar, and the readability cost of the choice."
levels: { data-analyst: junior }
aliases: ["stacked bar graph", "stacked column chart", "stacked bars"]
prereqs: ["bar-chart", "chart-selection"]
related: ["bar-chart", "treemap", "chart-selection", "pareto-chart", "waterfall-chart"]
---

A stacked bar puts the composition of a total inside the bar. One bar per category, segments inside it for each part, and the total being the full height of the bar.

## What it buys and what it costs

**It buys the total and the composition in a single mark**, which is why it is the natural choice for part-to-whole when there are only a few parts and the total matters.

It costs readability. **Only the segments sitting on the baseline are easy to compare**, because those are the only ones with a common starting line. A segment in the middle of the bar starts wherever the segment below it happened to end, so comparing "email" across five regions means measuring five different starting points. Readers rarely do that work; they compare the tops, which is the total.

## Rules that keep it readable

- Two to four segments. Six or more and the reader is guessing at colours.
- Put the biggest, or the most important, segment on the baseline where it is easy to read.
- Same segment order in every bar. Reordering between bars destroys the comparison silently.
- Label the totals on top, and the key segments inside where they fit.
- Say in the title whether the bars are counts or shares. A percent-stacked bar and a count-stacked bar look the same and mean different things.

## When it is the wrong form

If the question is "how does the mix change over time", a stacked bar answers it but badly — the segments shift and the reader has to hold each one's start and end in mind. If the question is "which segment is biggest", a sorted [bar chart](/t/bar-chart) is easier and answers faster. If the parts are many and uneven, a [treemap](/t/treemap) does the same job with a different, also imperfect, encoding. And if you need to show the movement between two totals rather than the composition of one, that is a [waterfall chart](/t/waterfall-chart).
