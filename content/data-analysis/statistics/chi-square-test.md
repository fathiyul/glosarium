---
title: "The Chi-Square Test"
summary: "Comparing counts and proportions between groups, and testing whether categories are independent."
levels: { data-analyst: mid-level , data-scientist: mid-level }
aliases: ["chi-square test", "chi squared test", "χ² test"]
prereqs: ["hypothesis-testing", "null-hypothesis"]
related: ["p-value", "statistical-significance", "non-parametric-test", "ab-testing", "experiment-design", "effect-size"]
---

The **chi-square test** compares observed counts with the counts you would expect if there were no
association. Each cell contributes a squared, standardised gap, and the gaps are added up:

```text
χ² = Σ over all cells of ( observed − expected )² / expected
```

It shows up in two shapes. A **test of independence** takes two categorical columns, builds a
contingency table, and asks whether the split of one is related to the split of the other; for a
two-way table the degrees of freedom are (rows − 1) × (columns − 1). A **goodness-of-fit test**
compares one observed distribution against a reference one — "are signups spread evenly across the
week?" — with degrees of freedom equal to the number of categories minus one, minus any parameters
estimated from the same data.

The [null hypothesis](/t/null-hypothesis) is that the observed counts are consistent with the
expected ones, so a large χ² gives a small [p-value](/t/p-value). For a two-by-two table, the
chi-square test and a two-proportion z test are testing closely related things and usually reach the
same conclusion.

**The catch is the expected count, not the observed one.** The χ² approximation to the sampling
distribution is poor when expected counts are small, which is a common situation when a rare category
meets a small sample. What counts as "too small" is a judgement your software and its documentation
should settle, and for small tables an exact test is usually the better option. Several tools also
offer a continuity correction for two-by-two tables, which slightly reduces χ² and shifts the
p-value; know which one you are quoting.

Two practical cautions. The test is sensitive to sample size, so a large enough sample makes a
trivial departure from even proportions significant — report the observed proportions
([effect size](/t/effect-size)) beside the verdict, and watch for
[Simpson's paradox](/t/simpsons-paradox) in a pooled table. And it compares counts, so it says
nothing about magnitudes: two groups can have identical totals and very different
[averages](/t/central-tendency).
