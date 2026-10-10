---
title: "The t-Test"
summary: "Comparing two averages and asking whether the gap is bigger than chance."
levels: { data-analyst: mid-level }
aliases: ["t test", "Student's t-test", "Welch's t-test"]
prereqs: ["hypothesis-testing", "standard-error", "null-hypothesis"]
related: ["non-parametric-test", "p-value", "statistical-significance", "ab-testing", "confidence-interval", "outliers"]
---

The **t test** asks whether two group averages differ by more than the sampling noise you would
expect under the [null hypothesis](/t/null-hypothesis) that both come from the same distribution. The
gap goes on top; a scaled estimate of its variability goes underneath:

```text
t = ( mean₁ − mean₂ ) / SE( mean₁ − mean₂ )
```

A large absolute t means the gap is big relative to its own uncertainty, which produces a small
[p-value](/t/p-value).

Which variant you get matters more here than the formula. **The variant is a choice worth making
deliberately**, because your tool's default may not be the one you want:

- Independent samples versus paired. Comparing different visitors in each arm calls for an
  independent test. Comparing the same users' before-and-after values calls for a paired test, which
  strips out person-to-person variation and is far more sensitive for the same number of
  observations.
- Equal variances versus unequal. The classic Student form assumes both groups share a variance; the
  Welch form does not, and is generally the safer choice when group sizes or spreads differ. Most
  libraries implement both, and one of them is the default, so check which.
- Degrees of freedom differ by variant, so the exact p-value for the same t value changes with the
  choice. When a hand calculation disagrees slightly with a library output, this is usually the
  reason — read your tool's documentation rather than assuming.
- [Outliers](/t/outliers) and skew. One extreme pair can dominate a t test, and a heavily skewed
  metric with a small sample makes the approximation poor. For either,
  [non-parametric tests](/t/non-parametric-test) are often the more honest tool.

What the result licenses is a rejection of the null under the assumptions you chose, and nothing
more. It does not say the difference is big enough to matter — report the
[effect size](/t/effect-size) — and it does not say the treatment caused it, unless the design
supports that ([experiment design](/t/experiment-design)).
