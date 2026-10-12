---
title: "ANOVA"
summary: "Testing whether several group averages really differ."
levels: { data-analyst: senior , data-scientist: mid-level }
---

Analysis of variance (ANOVA) tests whether three or more group means differ, using one pre-committed [null hypothesis](/t/null-hypothesis): all groups share the same mean. It does this by comparing two estimates of the same variance — how far the group means sit from the overall mean, versus how spread out the values are within each group. If the between-group spread is much larger than the within-group noise, at least one group really differs.

Why one test instead of pairwise [t-tests](/t/t-test)? Running every pair multiplies false alarms — three groups give three tests, six give fifteen — which is the [multiple comparisons](/t/bonferroni-correction) problem. ANOVA spends one α on one question: "are any of these means different?"

```python
from scipy import stats
groups = [g1, g2, g3]          # three lists of observations
F, p = stats.f_oneway(*groups)
```

If the omnibus result is significant, the follow-up question is which groups differ; that needs post-hoc comparisons with multiplicity control, not a free-for-all. The classic analyst mistake is skipping from "p < 0.05" straight to "region 3 is the winner," when ANOVA only licenses "they are not all equal."

Data scientists should keep the assumptions in view: roughly normal residuals per group, comparable within-group variances, and independence. With ordinal scores, heavy skew, or wildly unequal spreads, a rank-based [non-parametric](/t/non-parametric-test) alternative is the honest choice.

Where it fits the daily grind: analysts use it for "did any of these variants/cohort-weeks/segments move?" as a gate before drilling down; model builders use it when comparing several candidate treatments or features in one pass. A significant F with a tiny effect size is a sample talking louder than reality — report the size of the differences, not just the test, and remember that a designed [randomized experiment](/t/randomized-controlled-trial) supports causal reading while observational groups mostly support "these populations differ."
