---
title: "Linear Regression"
summary: "The straight-line fit that answers 'what changes when this number moves'."
levels: { data-analyst: mid-level , data-scientist: mid-level }
aliases: ["linear regression", "least squares", "OLS"]
prereqs: ["correlation-coefficient", "descriptive-statistics"]
related: ["regression-analysis", "residuals", "multiple-regression", "correlation-vs-causation", "scatter-plot", "causal-inference"]
---

**Linear regression** fits a straight line through a [scatter plot](/t/scatter-plot) of two
measures:

```text
y = a + b·x
```

`a` is the fitted value of y when x is zero, and `b` is the **slope**: the change in y associated
with a one-unit change in x, in y's units. Fitting by ordinary least squares means choosing the line
that minimises the sum of squared [residuals](/t/residuals).

The slope is the reason to use the tool — "a one-point increase in this score comes with about a
4-unit change in that spend" is a sentence a stakeholder can act on. It is also where careless
claims start.

The fitted line is **not a causal story**. It says x and y moved together in your data at a given
rate; it does not say that moving x moves y, and the coefficient can be inflated or reversed by a
[confounder](/t/confounding-variable). For "what happens if I move this", you need a design, not a
fit ([experiment design](/t/experiment-design)).

The straight line is an assumption. If the real relationship curves, flattens at the top, or turns
around, the fitted slope is an average over cases that behaved differently and describes none of
them ([distribution shapes](/t/distribution-shapes)).

Extrapolating outside the observed x-range is speculation. A slope fitted over x from 10 to 50 says
nothing about 200.

A few high-leverage points can move the slope considerably ([outliers](/t/outliers)). Compare the
fit with and without them.

Two shorthand numbers come with the fit and are easy to over-read. The
[correlation coefficient](/t/correlation-coefficient) is the same relationship stated unitlessly.
r² is the fraction of the variance in y that the line accounts for **in the sample you fitted**,
which is not the fraction of anything you would predict well out of sample
([overfitting](/t/overfitting)).

For several drivers at once, see [multiple regression](/t/multiple-regression).
