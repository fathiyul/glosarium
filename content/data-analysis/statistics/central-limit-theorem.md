---
title: "Central Limit Theorem"
summary: "Why averages and rates behave predictably even when the underlying data does not."
levels: { data-analyst: senior }
aliases: ["CLT", "central limit theorem"]
prereqs: ["probability-basics", "standard-deviation", "sampling-methods"]
related: ["law-of-large-numbers", "normal-distribution", "standard-error", "confidence-interval", "sampling-bias"]
---

Take repeated independent samples of the same size from a population with a finite variance, and
compute the mean of each. The distribution of those sample means approaches a normal distribution as
the sample size grows — centred on the population mean, with a standard deviation of σ/√n. That is
the **central limit theorem**, and it is why you can put a number on the uncertainty around an
average without knowing what the underlying data looks like.

Three parts are worth being exact about:

- "As the sample size grows." The approximation is not guaranteed at any particular n, and it
  converges far more slowly when the underlying data is heavily skewed. A rate built on a small sample
  of a rare event need not be anywhere near normal.
- It is about the mean, not the data. A long-tailed column does not become bell-shaped; only the
  distribution of its average does.
- Independence and finite variance are conditions, not details. If rows are not independent —
  repeated observations of the same user, for instance — the theorem does not apply in the form
  above. That is why [autocorrelation](/t/autocorrelation) in a time series is a genuine problem for
  any error bar you attach to it.

The everyday form is the same arithmetic behind every confidence interval:

```text
SE(mean) ≈ s / sqrt(n)          # s: sample SD, n: sample size
CI       ≈ mean ± t × SE        # normal multiplier, or t if the SD is estimated
```

Worked illustration only: with n = 400 and s = 8, the **standard error** is about 0.4. Scaling the
sample up 25-fold halves it, because it shrinks with the square root of n and not with n.

The theorem is also the reason a monitoring rule built on "three standard deviations from the mean"
checks the wrong thing when the rows are not independent, and the reason a
[long-tailed metric](/t/long-tail-distribution) converges more slowly than a binary one.

What it does not do is tell you anything about whether your sample was representative. A carefully
quantified average of a [biased sample](/t/sampling-bias) is still a biased average, and no increase
in n repairs it. For the different statement about averages settling on the true value, see the
[law of large numbers](/t/law-of-large-numbers).
