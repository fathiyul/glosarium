---
title: "Lognormal Distribution"
summary: "Why money and latency skew right."
levels: { data-analyst: mid-level , data-scientist: mid-level }
aliases: ["log-normal distribution", "lognormal", "log-normal"]
prereqs: ["distribution-shapes", "normal-distribution"]
related: ["normal-distribution", "long-tail-distribution", "central-tendency", "standard-deviation"]
---

The lognormal distribution describes **values whose logarithm is bell-shaped**: strictly positive numbers with a hump near the low end and a long tail of large values. Money, latencies, file sizes and session lengths look like this because they grow multiplicatively — many small shocks multiply together rather than add.

The practical consequence is that the mean misleads. If page latencies have a median of 200 ms but a mean of 450 ms, the mean is being dragged by a few slow loads; report the median and a high [percentile](/t/percentile) instead, and think twice before feeding raw values into anything [built on the bell curve](/t/normal-distribution). The classic mistake is computing mean ± standard deviation on lognormal data and getting intervals that dip below zero — impossible for a quantity that cannot be negative. Work on the log scale (where the data is roughly symmetric) and transform back: the back-transformed centre is the geometric mean, typically close to the median.

A quick check: take logs of the column and plot a [histogram](/t/histogram). If the logged values look symmetric while the raw ones skew right, lognormal machinery fits — geometric means, log-scale t-tests, multiplicative models.

## When not to use it

As a data analyst, prefer plain medians and percentiles on dashboards; reach for the lognormal framing when you must model or compare skewed magnitudes. As a data scientist, use it as the default likelihood for positive right-skewed outcomes — but drop it when the data has exact zeros (log of zero is undefined, so shift or mix models), sharp cutoffs, or two humps ([shape](/t/distribution-shapes) first, model second). For the extreme-tail view see [long-tail](/t/long-tail-distribution); for which average to quote see [central tendency](/t/central-tendency).
