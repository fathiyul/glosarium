---
title: "Odds Ratio"
summary: "Comparing chances between two groups."
levels: { data-analyst: mid-level , data-scientist: mid-level }
---

An odds ratio compares the odds of an outcome between two groups. Odds are p/(1-p): an outcome at 2% probability has odds 0.02/0.98 ≈ 0.0204. If the comparison group sits at 4% (odds ≈ 0.0417), the odds ratio is about 2.04 — roughly "twice the odds."

Analysts should immediately spot the sibling measure: the [relative risk](/t/relative-risk) divides *probabilities*, giving 2.00 in the example. When the outcome is rare, odds and probability barely differ and the odds ratio quietly equals relative risk — the classic mistake is quoting an odds ratio of "6.3×" for something common (40% vs 70% is OR ≈ 3.5 while RR = 1.75) and letting readers hear "3.5 times as likely." The gap between the two grows with the base rate, so when the outcome is not rare, translate back to probabilities before saying anything.

Data scientists meet odds ratios natively: [logistic regression](/t/logistic-regression) coefficients *are* log-odds-ratios per unit of a predictor, so exponentiating a coefficient yields the OR for a one-unit change — and the interpretation inherits all of the model's assumptions, including every other covariate held fixed. Odds ratios are also the natural output of case-control designs, where sampling destroys the real base rate and RR cannot be computed directly.

Practical rules: state the outcome probability in both groups next to the ratio; remember an OR is not symmetric in interpretation (the protective-side reading is its reciprocal); and do not pool ORs across strata without checking that the odds structure is comparable — that is the territory where [Simpson-style reversals](/t/confounding-variable) live.

When not to reach for one: plain business communication almost always lands better with percentages and [relative risk](/t/relative-risk). Use odds ratios when the model gives them, the design demands them, or everyone in the room has been trained on them.
