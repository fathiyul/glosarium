---
title: "Simpson's Paradox"
summary: "A trend that reverses when groups are combined."
levels: { data-analyst: mid-level , data-scientist: mid-level }
aliases: ["Simpson's paradox", "Simpsons paradox", "reversal paradox", "simpson's reversal"]
prereqs: ["confounding-variable", "descriptive-statistics"]
related: ["confounding-variable", "correlation-vs-causation", "segmentation", "sampling-bias", "correlation-coefficient"]
---

Simpson's paradox is what happens when a trend that **holds inside every subgroup** reverses when the subgroups are combined. The cause is usually a [confounding variable](/t/confounding-variable) whose proportions differ between the groups you are comparing: one group is simply made of easier cases.

An illustrative example — two treatments and two severity bands (the numbers are invented to show the arithmetic):

| Severity | Treatment A | Treatment B |
|---|---|---|
| Mild | 90 of 100 cured (90%) | 28 of 30 cured (93%) |
| Severe | 10 of 100 cured (10%) | 6 of 50 cured (12%) |
| Combined | 100 of 200 cured (50%) | 34 of 80 cured (43%) |

Treatment B has the higher cure rate in both bands. Yet treatment A appears better overall, because half of A's patients were mild while B's caseload was mostly severe. The mild/severe mix, not the treatment, is what drives the combined column.

The mechanism is plain arithmetic: a cure rate is a ratio, and combining ratios means **weighting by denominators**. In this case the mild band dominates the combined figure for treatment A and barely affects it for treatment B. The same pattern shows up whenever a rate is compared across groups of different sizes and different risk — conversion by region, churn by plan, pass rates by school.

What to do about it:

- Before believing a difference, split by the obvious confounders: time period, segment, severity, channel, region ([segmentation](/t/segmentation)).
- Then look at which direction the reversal runs. If each part favours one group and the whole favours the other, the total is misleading and the group-level numbers are the honest ones — report the mix separately as well.
- Ask whether the grouping is a cause or a symptom. The paradox is a sign that the comparison is wrong, not a property of arithmetic ([correlation vs causation](/t/correlation-vs-causation)).

One caution in the other direction: slicing a small sample into many subgroups produces apparent differences that are just noise. Check how much data sits behind each slice before you split ([sample size calculation](/t/sample-size-calculation)).
