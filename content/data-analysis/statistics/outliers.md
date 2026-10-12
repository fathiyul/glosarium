---
title: "Outliers"
summary: "Values far from the rest of the data, and when to keep, cap or exclude them."
levels: { data-analyst: mid-level , data-scientist: junior }
aliases: ["outlier", "extreme value", "anomaly"]
prereqs: ["quartiles-and-iqr", "data-quality"]
related: ["long-tail-distribution", "data-cleaning", "data-anomaly-detection", "box-plot", "data-quality-check", "central-tendency"]
---

An **outlier** is a value far enough from the rest of the data that it needs a decision before it is
allowed into a summary. There is no universal cut: what counts as "far" depends on the spread of the
rest of the column and on the question you are answering.

Use the [IQR fence](/t/quartiles-and-iqr) — Q1 − 1.5 × IQR and Q3 + 1.5 × IQR — as a first screen,
and treat what comes back as a list to look at, not a list to delete. Each flagged row falls into
one of a few cases:

| Case | Example | What to do |
|---|---|---|
| Data error | order value of 999999 from a test account | Fix or exclude, and file it as a [data quality](/t/data-quality) bug |
| Wrong unit or currency | one row stored in cents | Correct the value, keep the row |
| Real and expected | a corporate order among consumer orders | Keep it, and say which measure you reported |
| Real and interesting | the customer who bought 500 times | Keep it, and report them separately |

The mistake that costs the most is the quiet one: sort by a metric, drop the top and bottom rows,
then report the average. That average is now a measure of a range chosen after seeing the data,
which is a decision made to flatter the result. A [box plot](/t/box-plot) puts the same rows outside
the whiskers without deleting anything, which is usually the better first move.

Where the outlier sits changes the fix:

- For a mean or a median, one row can move the mean a long way. Report the
  [median](/t/central-tendency) and the IQR alongside, or state exactly which rows you excluded and
  why.
- For a sum or a total, one bad row can move a whole revenue line. Check the largest contributors
  before the quarter closes.
- For correlation and regression, a single extreme pair can create or destroy an apparent
  relationship. Recompute the coefficient without it and see whether the story survives
  ([residuals](/t/residuals)).

A note on capping: **capping (winsorising) is a modelling choice, not a cleaning step.** If you
replace everything above a percentile with that percentile, say so in the write-up, because the
reader should know the top of the distribution no longer exists.

If the column simply has a long tail of legitimate large values, you may not have outliers at all —
see the [long tail](/t/long-tail-distribution). For an automated version of this scan, see
[anomaly detection](/t/data-anomaly-detection).
