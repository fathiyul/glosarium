---
title: "Multicollinearity"
summary: "When predictors overlap and coefficients go unstable."
levels: { data-analyst: senior , data-scientist: mid-level }
aliases: ["collinearity", "multicollinear predictors", "correlated predictors"]
prereqs: ["multiple-regression", "correlation-coefficient"]
related: ["multiple-regression", "correlation-coefficient", "r-squared", "overfitting"]
---

Multicollinearity means your **predictors overlap so much the model cannot tell them apart**. Put both "TV spend" and "total marketing spend" (which is 80% TV) into a [multiple regression](/t/multiple-regression) and the maths has no clean way to split credit: coefficients swing wildly, standard errors balloon, signs flip when you add or drop a row.

Suspect it when individual predictors look insignificant yet the model as a whole explains a lot ([high R²](/t/r-squared)), or when a coefficient's sign contradicts common sense. Confirm with pairwise [correlations](/t/correlation-coefficient) and a variance-inflation check — rules of thumb often flag values above roughly 5–10, but treat that as a nudge to investigate, not a verdict.

The classic mistake is reading overlapping coefficients as independent levers: "holding total spend fixed, +$1k of TV adds $X" is nonsense when TV cannot move while the total stands still. The fixes: drop one of the pair, combine them into a single index the business understands, or regularise. Never "fix" it by silently dropping variables until the survivors look significant — that is storytelling tuned to this sample, not analysis.

## When to leave it alone

As a data analyst, if the model exists only to predict (forecasts, scoring) and it validates well out of sample, overlapping predictors are harmless — say the coefficients are not interpretable and move on. As a data scientist, act the moment anyone reads a coefficient as an effect: combine, drop with a documented reason, or regularise, then show the coefficients stabilise. Either way, report what you did; a model whose drivers quietly changed is worse than one that admits its drivers overlap.
