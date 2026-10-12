---
title: "Standard Deviation"
summary: "How far a typical value sits from the average, in the same units as the data."
levels: { data-analyst: junior , data-scientist: junior }
aliases: ["stddev", "std dev", "STDEV"]
prereqs: ["central-tendency", "descriptive-statistics"]
related: ["distribution-shapes", "normal-distribution", "outliers", "percentile", "standard-error"]
---

The standard deviation says how far a typical value sits from the mean, in the **same units as the
data itself**. If order values average 50 with a standard deviation of 8, a typical order sits
roughly 8 away from 50 — not 8 squared, and not 8 percent.

Two different quantities share the name, and they are worth keeping apart:

- The **population** standard deviation, written σ, is the true spread of everything you are
  describing. You only know it when you have every row of the population.
- The **sample** standard deviation, written s, is your estimate of σ from the rows you happened to
  measure. It divides the squared deviations by n − 1 instead of n, which makes it slightly larger
  and, on average, closer to the truth.

So describing every order from last quarter is one job — you have the population, and the
population formula is the right one. Estimating the spread of all future orders from 400 of them is a
different job, where you only ever have the estimate. Say which one a number is when you report it.

Most tools make you choose explicitly:

```python
import statistics as st
data = [10, 12, 11, 13, 12, 400]
st.pstdev(data)   # population version
st.stdev(data)    # sample version
```

Spreadsheets keep them as separate functions — `STDEV.S` for the sample version and `STDEV.P` for
the population version in Excel, with `STDEVA` and `STDEVPA` as the variants that treat text as
zero. In SQL there is no single default: `STDDEV` is engine-specific, some engines expose both
`STDDEV_SAMP` and `STDDEV_POP`, and one of them may be missing entirely. Read your engine's
documentation rather than assuming which you are getting.

The trade-off is that **outliers pull the standard deviation around**, so one very large value makes
a tight column look scattered when it mostly is not. On skewed data the
[IQR](/t/quartiles-and-iqr) or [percentiles](/t/percentile) describe spread more honestly. When a
column is roughly bell-shaped, about two thirds of values sit within one standard deviation of the
mean — see the [normal distribution](/t/normal-distribution) for that property and its limits.

For how much an average wobbles when you resample, see [standard error](/t/standard-error).
