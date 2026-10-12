---
title: "Regression Analysis"
summary: "Fitting a line or curve so you can describe relationships and make estimates."
levels: { data-analyst: senior , data-scientist: mid-level }
aliases: ["regression", "regression analysis", "model fitting"]
prereqs: ["linear-regression", "residuals"]
related: ["linear-regression", "multiple-regression", "residuals", "overfitting", "causal-inference", "train-test-split"]
---

**Regression analysis** is the practice of fitting a model that relates an outcome to one or more
predictors, then reading the fitted relationship — either to describe how the outcome varies, or to
estimate it for cases you have not measured.

The shape of the work is the same whatever the model:

1. Specify. Decide what the outcome is, what goes in, and what form the relationship takes — straight
   line, spline, log transform. Every choice here is a judgement about the world.
2. Estimate. Fit by least squares or maximum likelihood, which produces coefficients and their
   standard errors.
3. Check. Look at the [residuals](/t/residuals) against the fitted values, against each predictor,
   and against row order or time. Curvature, a fan shape, or a drift means the specification in step
   one was wrong, and the coefficients are then measuring something other than what you said they
   measured.
4. Read. Report the coefficients, their uncertainty, and how much of the outcome the model accounts
   for — and keep the scope honest about what the model saw.

The distinction that separates a useful analysis from a misleading one:

- Description — "orders rise by about 4 per point of score in this cohort" — is supported by the fit
  alone.
- Prediction — "the expected order count for this new segment is 37" — depends on the new data looking
  like the data you fitted on. Test that with a held-out period or a
  [train/test split](/t/train-test-split) rather than reporting the fit's own r²
  ([overfitting](/t/overfitting)).
- Causation — "raising the score by one point would raise orders by 4" — is not supported by any of
  it. That claim **needs a design, not a fit** ([causal inference](/t/causal-inference)).

Three senior-level cautions. The first is about comparing across samples: out-of-sample accuracy is
always lower than in-sample accuracy, and the gap widens as you add predictors that do not help, so
judge a specification on data it has not seen. The second is about what is missing: a variable you
left out does not vanish, it biases the coefficients that are in the model, in a direction that
depends on how it relates to them ([multiple regression](/t/multiple-regression),
[confounding](/t/confounding-variable)). The third is about scope: every coefficient is conditional
on the sample it was fitted on, so a model fitted on last year describes last year
([trend](/t/trend), [seasonality](/t/seasonality), or a
distribution that [monitoring](/t/data-observability) exists to catch changing).
