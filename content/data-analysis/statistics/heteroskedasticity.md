---
title: "Heteroskedasticity"
summary: "When variability itself varies across the range."
levels: { data-analyst: senior , data-scientist: mid-level }
aliases: ["heteroscedasticity", "non-constant variance", "heteroskedastic errors"]
prereqs: ["linear-regression", "residuals"]
related: ["residuals", "multiple-regression", "statistical-variance", "linear-regression"]
---

Heteroskedasticity means the **spread of the errors changes across the range** of your data. In a [linear regression](/t/linear-regression) of household spending on income, the misses might be ±$50 for low incomes and ±$2,000 for high ones: the model is equally "right on average" everywhere, but its precision is not.

Spot it by plotting [residuals](/t/residuals) against fitted values. Constant spread looks like a formless cloud; heteroskedasticity looks like a fan or funnel opening to one side. The cost is real: the coefficient estimates stay unbiased, but the standard errors, p-values and confidence bands around them can no longer be trusted — typically they understate uncertainty where the spread is widest, which is exactly where big decisions sit.

The classic mistake is quoting those statistics untouched. The fixes, from lightest to heaviest: transform a skewed target (often a log) so the spread evens out; use standard errors built to tolerate uneven spread; or fit a weighted regression that listens more to the precise region. Say which one you used — "heteroskedasticity-robust standard errors" is one honest sentence in a footnote.

## When not to fix it

As a data analyst, always look at the residual plot before putting uncertainty bands on a chart — but if nobody consumes the bands and you only need point predictions, even spread matters less. As a data scientist, fix it whenever you report inference (intervals, tests, feature importance from coefficients), since every one of those leans on the spread being modelled right; for pure prediction, judge the fix by out-of-sample error instead. Background on spread itself: [variance](/t/statistical-variance); for fitting several drivers at once see [multiple regression](/t/multiple-regression).
