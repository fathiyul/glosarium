---
title: "Distribution Shapes"
summary: "Symmetry, tails and peaks \u2014 the shape that tells you which summary is honest."
levels: { data-analyst: junior , data-scientist: junior }
aliases: ["distribution shape", "skew", "data distribution"]
prereqs: ["descriptive-statistics", "histogram"]
related: ["central-tendency", "long-tail-distribution", "normal-distribution", "histogram", "box-plot", "percentile"]
---

A distribution is just the picture of how often each value occurs. Its **shape** — symmetric or
lopsided, one peak or two, heavy tail or none — decides which summary numbers are honest.

Two shapes cover most of what an analyst meets:

- Symmetric, like the bell curve. The mean and the median land in the same place, and the
  [standard deviation](/t/standard-deviation) describes spread in a way that carries over into the
  [normal distribution](/t/normal-distribution).
- Skewed right, with a cluster of small values and a long tail of large ones. Order values, load
  times and salaries all look like this. The mean is dragged above the median, and one enormous value
  can move it a long way. This is the [long tail](/t/long-tail-distribution).

Form the habit of looking before you summarise. Two columns can share a mean and a range and still be
very different things — **one of them is really two populations**:

```text
Column A: 40 41 42 43 44 45      mean 42.5, median 42.5
Column B: 12 15 30 55 70 73      mean 42.5, median 42.5
```

Column B is really two groups mixed together, which usually means you have two populations inside
one column ([segmentation](/t/segmentation)) — and a pooled average can hide a trend that reverses
when you split it ([Simpson's paradox](/t/simpsons-paradox)).

Three readings worth doing every time:

- One peak or two. Two peaks normally mean two populations were pooled. Split them before reporting
  a single average.
- Where the tail is. A long right tail puts the mean above most of the data, so report the median
  and a high [percentile](/t/percentile) next to it.
- Where the gaps are. A sharp jump in the middle of the histogram is often a cap, a default, or a
  data error ([data quality](/t/data-quality)) rather than real behaviour.

A [histogram](/t/histogram) is the fastest way to see shape; a [box plot](/t/box-plot) shows the
same information with far less ink.
