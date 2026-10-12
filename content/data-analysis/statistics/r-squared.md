---
title: "R-squared"
summary: "How much variation a model explains — and what it hides."
levels: { data-analyst: mid-level , data-scientist: mid-level }
---

R-squared reports the share of a target's variation that a regression model explains: 1 minus the ratio of residual [variance](/t/variance) to total variance. An R² of 0.60 means the fitted values move with 60% of the wiggle your data shows. It is scale-free and quotable, which is precisely why people overread it.

Analysts use it as a first-fit health check — near-zero on a supposedly predictive relationship is a warning, and a suspiciously perfect 0.99+ deserves a look at [residuals](/t/residuals) and plots for leakage, collinearity or a mechanical relationship ("predict next month's revenue with this month's"). The memorable lesson from Anscombe-style examples: identical R² values can sit atop wildly different fit patterns, so R² is never a substitute for looking at the data.

Data scientists should know its arithmetic habits. R² almost always rises when you add predictors — some rise is signal, the rest is fitting noise — which is why [multiple regression](/t/multiple-regression) comparisons use the adjusted version or held-out [test-set](/t/train-test-split) scores instead. Comparing R² across transformed targets (log dollars vs dollars) is meaningless because the total-variance denominator changed. And for a [forecasting](/t/forecasting) question, prediction error on data the model never saw answers the real question; R² on training data answers a flattering one.

The classic misreadings come in pairs. High R² does not mean the model is correct — a missing interaction leaves a curved pattern that R² happily averages over ([interaction effects](/t/interaction-effect) hide that way). Low R² does not mean useless: in noisy human data, a small R² can still carry a large, real, decision-changing coefficient. [Correlation is not causation](/t/correlation-vs-causation), and neither is R² — it measures explained movement, not truth.

Quote it as one diagnostic among many, name the dataset it was computed on, and pair it with a residual plot whenever the audience is deciding anything.
