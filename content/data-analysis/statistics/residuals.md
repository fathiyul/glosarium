---
title: "Residuals"
summary: "What the model failed to explain \u2014 the leftover that tells you where the fit breaks."
levels: { data-analyst: senior }
aliases: ["residual", "residuals", "error term"]
prereqs: ["linear-regression", "regression-analysis"]
related: ["linear-regression", "regression-analysis", "multiple-regression", "outliers", "overfitting", "normal-distribution"]
---

A residual is the difference between what the model predicted and what the data showed:

```text
residual_i = y_i − fitted_i
```

Residuals are the only place **the fit's failures** are visible. Two facts about them are always true
under an ordinary least squares fit **with an intercept**: the residuals sum to zero, and they are
uncorrelated with the fitted values. Both are properties of the fitting procedure, not of the world,
and they are often quoted as though they were evidence the model is fine. They are not.

The checks that earn their time:

- Residuals against fitted values. It should look like a shapeless cloud. A curve means the
  relationship is not straight; a fan or a cone means the spread grows with the level. Either way,
  the coefficients and their standard errors are being reported under assumptions you did not meet.
- Residuals against row order or time. A drift means something unmeasured changed during the window
  ([trend](/t/trend), [seasonality](/t/seasonality)) — which is what
  [distribution monitoring](/t/data-observability) exists to catch.
- A handful of very large residuals. These are the rows the model does not describe. Some are
  [outliers](/t/outliers), some are sub-populations that should be split
  ([segmentation](/t/segmentation), [Simpson's paradox](/t/simpsons-paradox)), and a few are the
  most interesting thing in the whole analysis.
- Residuals against a predictor that is not in the model. Structure here is the signature of an
  omitted variable, and it means the coefficients you did report are quietly absorbing it
  ([multiple regression](/t/multiple-regression)).

There is a trade-off in chasing them. Adding predictors until the residuals look random reduces
noise but buys you [overfitting](/t/overfitting), and the in-sample improvement is not evidence of
out-of-sample accuracy. Judge a specification on data it has not seen
([train/test split](/t/train-test-split)).

One further reading: "the errors look roughly normal" is a fair thing to check for the intervals you
are about to quote, since many [confidence intervals](/t/confidence-interval) and
[p-values](/t/p-value) lean on the [normal distribution](/t/normal-distribution). A heavy-tailed
residual column on a modest sample is a reason to widen your intervals, not a reason to start
deleting rows.
