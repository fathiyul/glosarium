---
title: "Confidence Interval"
summary: "The range a true value plausibly falls in."
levels: { data-analyst: mid-level , data-scientist: mid-level }
aliases: ["CI", "confidence interval", "confidence band"]
prereqs: ["standard-error", "p-value"]
related: ["standard-error", "margin-of-error", "p-value", "statistical-significance", "sample-size-calculation", "central-limit-theorem"]
---

A **confidence interval** is the range you quote around a sample estimate: the estimate plus or minus
a multiple of its [standard error](/t/standard-error). A sample conversion rate of 0.12 with a
margin of 0.02 is reported as "0.12 ± 0.02", or "0.10 to 0.14".

The reading that takes practice is this: the confidence level describes the *procedure*, not the
single interval. If you repeated the study many times and built an interval the same way each time,
about 95 in 100 of them would cover the true value — and which one you happen to have in front of
you, you cannot tell. Saying "there is a 95% chance the true value is in this interval" is the
Bayesian reading, and it needs a prior; see
[Bayes' theorem](/t/bayes-theorem) and
[Bayesian versus frequentist](/t/bayesian-vs-frequentist).

Three things drive the width:

- Sample size. Width falls as 1/√n, so going from 400 users to 1,600 shrinks it by roughly half.
- Variability. A stable metric gives a narrow interval; a heavily dispersed one gives a wide one
  for the same n.
- Confidence level. Higher confidence means a wider interval. "99%" costs precision; "90%" buys it.

What a confidence interval does and does not license:

- It gives a range of values that are *not ruled out* by the data at the chosen level. That is a
  statement about the data, not a ranking of how likely each value in the range is.
- It does not say where in the range the true value sits. The middle of the interval is not more
  likely than points near its ends.
- It does not prove anything. An interval that includes zero does not establish "no difference" —
  **absence of evidence is not evidence of absence** — it says the data is compatible with both.
  See [statistical significance](/t/statistical-significance).
- Coverage depends on the method and its assumptions. An interval built on a normal approximation
  for a small, heavily skewed sample will be optimistically narrow, and the variability it quantifies
  excludes [sampling bias](/t/sampling-bias) entirely.

The [margin of error](/t/margin-of-error) is the same idea stated as the ± half-width, which is the
form polls and surveys use.
