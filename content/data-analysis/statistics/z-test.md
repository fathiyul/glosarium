---
title: "Z-test"
summary: "Comparing rates and means with large samples."
levels: { data-analyst: mid-level , data-scientist: mid-level }
---

A z-test compares a mean or proportion against a reference using the normal distribution — appropriate when the standard deviation is effectively known or the sample is large enough that its estimate has settled down. The statistic is the distance between observed and expected, measured in standard errors: z = (x̄ − μ₀) / (σ/√n). Compare two conversion rates the same way with the proportion formula, and the [p-value](/t/p-value) drops out of the normal curve.

Analysts use it on rates and counts — the daily currency of dashboards. If checkout normally converts at 2.0% and today's 10,000 sessions produced 176 checkouts, the z machinery answers "is 1.76% outside the routine wobble?" The same arithmetic powers alert thresholds that beat "it looked lower."

Data scientists should know when z is the wrong letter. Its cousin the [t-test](/t/t-test) exists precisely because σ is usually estimated from the data: with small samples that estimate wobbles and the t's thicker tails fix the intervals. As n grows, t converges to z — the difference is mainly a small-sample issue.

The classic mistakes come in pairs. First, running z on a *small* sample of skewed data: the [central limit theorem](/t/central-limit-theorem) is the only reason normal-based tests work on non-normal inputs, and it needs the sample to actually be large. Second, big-sample theater: with millions of observations, a 0.01% difference clears any threshold — a significant z with a trivial [effect size](/t/effect-size) proves the spreadsheet works, not that it matters.

Check the mechanics before quoting: independent observations, a sensible null proportion for the standard error, and a one- or two-sided question chosen in advance. Then report the raw rates next to the z — a test statistic is a yes/no gate, not a measure of how much.
