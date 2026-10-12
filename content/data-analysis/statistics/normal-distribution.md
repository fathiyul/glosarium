---
title: "Normal Distribution"
summary: "The bell curve many natural and sampled quantities roughly follow, and the results that lean on it."
levels: { data-analyst: mid-level , data-scientist: junior }
aliases: ["bell curve", "Gaussian distribution", "Gaussian"]
prereqs: ["central-tendency", "standard-deviation", "distribution-shapes"]
related: ["central-limit-theorem", "standard-error", "confidence-interval", "long-tail-distribution", "histogram", "percentile"]
---

The **normal distribution** is the symmetric bell curve defined by two numbers: its centre and its
standard deviation. Move one standard deviation out from the centre and you cover roughly two thirds
of the area, two standard deviations covers roughly 95%, three covers roughly 99.7%. Those are
properties of the ideal shape, not promises about your data.

Why an analyst needs it:

- Averages and rates from reasonably large samples are approximately normal even when the raw data
  is not. That is the [central limit theorem](/t/central-limit-theorem) doing the work, and it is
  what makes normal-based machinery usable.
- [Confidence intervals](/t/confidence-interval) and [p-values](/t/p-value) for means and
  proportions are usually computed from this curve, with a [t test](/t/t-test) standing in when the
  standard deviation is estimated from the same data.
- Many monitoring rules ("alert when the value is more than three standard deviations from the
  mean") quietly assume it.

The mistake is to assume data is normal because a bell curve is familiar. Most business measures are
not: revenue, session counts and response times are usually right-skewed, with a few enormous values
([long tail](/t/long-tail-distribution)). Before relying on anything like "95% of values fall within
two standard deviations", plot the column — a [histogram](/t/histogram) or
[box plot](/t/box-plot) settles it in seconds.

It also helps to know what the normal assumption does not fix. It is a claim about the
**sampling distribution** of an estimate, and about nothing else. It will not repair a biased
sample ([sampling bias](/t/sampling-bias)), a broken
[metric definition](/t/metric-definitions), or a
[correlation with a confounder behind it](/t/confounding-variable). A precise answer to the wrong
question is still the wrong answer.

Related reading: [standard deviation](/t/standard-deviation) and
[percentiles](/t/percentile) for describing a column, and
[distribution shapes](/t/distribution-shapes) for whether the bell is a reasonable model in the
first place.
