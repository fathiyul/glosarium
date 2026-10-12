---
title: "Quartiles and IQR"
summary: "Splitting data into quarters to summarise the middle half without letting extremes rule."
levels: { data-analyst: mid-level , data-scientist: junior }
aliases: ["IQR", "interquartile range", "quartiles"]
prereqs: ["percentile", "descriptive-statistics"]
related: ["outliers", "box-plot", "central-tendency", "percentile", "distribution-shapes"]
---

Quartiles cut a sorted dataset into four equal parts. The first quartile, Q1, is the value below
which a quarter of the data falls; the median is Q2; the third quartile, Q3, is the value below
which three quarters falls. The **interquartile range** is Q3 − Q1 — the width of the middle half of
your data.

That is what makes it useful when there are extremes in the column. For a set of order values that
sit around 15 with one at 4,000, the IQR does not move, while the range and the
[standard deviation](/t/standard-deviation) both do. It is the same reason a
[box plot](/t/box-plot) draws its box from Q1 to Q3 and leaves the far points outside it.

Three things to get right:

- Quartiles are percentiles, and percentile conventions differ by tool. There is no single answer to
  "the 25th percentile of these eight numbers" when the cut lands between two rows. Excel's
  `QUARTILE.INC` interpolates and `QUARTILE.EXC` uses a different position; numpy's `np.percentile`
  and the Python standard library's `quantiles()` default to different interpolation methods; SQL
  engines distinguish `PERCENTILE_CONT` from `PERCENTILE_DISC`. The differences are usually small
  and shrink as n grows, but a dashboard disagreeing with a notebook by a hair is often this. Pick
  the convention your reporting uses and stay with it.
- Quartiles of small samples are noisy. A Q1 from twelve rows is mostly a statement about two of
  them.
- You cannot average quartiles. Combining two groups by averaging their Q1 does not give the Q1 of
  the pooled data. Recompute it from the underlying rows, as with any percentile.

Outliers are commonly flagged with the fence Q1 − 1.5 × IQR and Q3 + 1.5 × IQR. The **1.5 is a
convention rather than a discovery** — it flags rows for inspection, it does not condemn them. See
[outliers](/t/outliers) for what to do next.

The trade-off against the standard deviation is that the IQR throws away information by using only
two values, so it is noisier on well-behaved data. It earns its keep on data that is not: skewed
columns, [long-tailed](/t/long-tail-distribution) metrics, and anything with a handful of extreme
rows. Report both when the shape is unclear, and use
[descriptive statistics](/t/descriptive-statistics) as the frame.
