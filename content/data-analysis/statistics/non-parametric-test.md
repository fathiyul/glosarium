---
title: "Non-Parametric Tests"
summary: "Tests that fall back to ranks when the data does not meet the assumptions of a t-test."
levels: { data-analyst: senior }
aliases: ["non-parametric test", "distribution-free test", "rank test"]
prereqs: ["t-test", "hypothesis-testing"]
related: ["t-test", "outliers", "hypothesis-testing", "p-value", "quartiles-and-iqr", "ab-testing"]
---

**Non-parametric tests** replace the values with their ranks and then run the test on the ranks. That
one substitution buys a great deal of robustness and costs some sensitivity, and knowing which you are
buying is the whole decision.

The ones an analyst reaches for most:

| Test | Design | Question it answers |
|---|---|---|
| Mann-Whitney U | two independent groups | do values in one group tend to be larger? |
| Wilcoxon signed-rank | two paired groups | do the paired differences tend one way? |
| Kruskal-Wallis | three or more independent groups | does at least one group tend to be larger? |

Why you would use one: the metric is heavily skewed or carries extreme values
([outliers](/t/outliers)); the sample is too small for a [t test](/t/t-test)'s normal approximation
to be credible; the data is ordinal — star ratings, survey scales — where the gap between adjacent
values is not a real quantity; or the two distributions have clearly different shapes, so comparing
means is misleading in the first place.

The trade-offs to state when you report one:

- Sensitivity. On well-behaved, roughly normal data, the rank version typically needs
  **more observations** to detect the same difference. If your data passes the assumptions, the
  parametric test is the more sensitive choice.
- What the null says. The Mann-Whitney U null is that a value from one group is no more likely to be
  larger than a value from the other, i.e. that the two distributions are similar. It is commonly
  described as a median test, which is not quite right: two groups can share a median and still
  differ enough for the test to detect. Report the medians and the
  [IQR](/t/quartiles-and-iqr) rather than claiming the test found a shift in the median.
- Ties and zeros. Rank tests on data with many tied values — common with counts, where a large share
  of rows are zero — need the tie handling and the exact null distribution from your tool. Small
  samples should use exact p-values rather than the large-sample approximation, and which of the two
  you get is a software choice. Check it.
- One-sided versus two-sided, and paired versus independent, all change the question. Consistency
  matters more than which you pick, and the
  [decision rule](/t/decision-rule) should be fixed before the data.

A rank test is not a licence to skip the plot. Look at the
[distribution](/t/distribution-shapes) first: the reason the parametric assumptions failed is often
the most interesting thing in the column.
