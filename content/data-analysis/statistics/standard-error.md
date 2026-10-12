---
title: "Standard Error"
summary: "How much your estimate would wobble if you repeated the measurement on new data."
levels: { data-analyst: senior , data-scientist: junior }
aliases: ["SE", "standard error of the mean", "SEM"]
prereqs: ["standard-deviation", "central-limit-theorem", "sampling-methods"]
related: ["confidence-interval", "margin-of-error", "standard-deviation", "sample-size-calculation", "law-of-large-numbers"]
---

The **standard error** of a statistic is the standard deviation of that statistic across repeated
samples of the same size. It answers "how much would this estimate wobble if I collected the data
again?", and it is the bridge between "this is the number I got" and "this is what I can say about
the number I would get next time".

For a mean, written SE or SEM:

```text
SE(mean) = σ / sqrt(n)          # if the population SD σ is known
SE(mean) = s / sqrt(n)          # the usual case: σ unknown, s is the sample estimate
```

**The σ/s distinction is the whole point.** σ is the true spread of the population you draw from, and
you rarely know it. s is what you can compute from the rows in front of you. Because s is estimated
from the same data, tests built on it use a [t test](/t/t-test) rather than a normal approximation,
and the difference is largest when n is small.

Every statistic has its own standard error, and they do not shrink at the same rate:

| Statistic | Standard error | Note |
|---|---|---|
| Mean | s / sqrt(n) | the slowest to shrink: double precision needs 4× the data |
| Proportion | sqrt( p(1−p)/n ) | p near 0 or 1 gives a smaller SE for the same n |
| Regression slope | depends on residual spread and the spread of x | a narrow x-range inflates it |
| Difference of two means | sqrt( SE1² + SE2² ) | the two sample sizes need not be equal |

Note what the standard error leaves out. It measures sampling variability only. It says nothing about
[bias in the sample](/t/sampling-bias), about rows
[recorded wrongly](/t/data-quality-check), or about the
[metric being defined differently](/t/metric-definitions) in the two groups you are comparing. A
precise standard error around a biased estimate is a confident wrong answer.

The standard error is the multiplier inside a
[confidence interval](/t/confidence-interval), the half-width behind a
[margin of error](/t/margin-of-error), and the denominator of the statistic in a
[t test](/t/t-test). None of those tell you how large an effect is — see
[effect size](/t/effect-size) for that half of the answer.
