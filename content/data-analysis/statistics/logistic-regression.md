---
title: "Logistic Regression"
summary: "Predicting yes-or-no outcomes with a linear model and a cutoff."
levels: { data-analyst: mid-level , data-scientist: mid-level }
aliases: ["logistic regression", "logit model", "binary classifier"]
prereqs: ["linear-regression", "classification-vs-regression"]
related: ["linear-regression", "classification-vs-regression", "overfitting", "train-test-split"]
---

**Logistic regression** predicts yes-or-no outcomes — churn or stay, convert or not, fraud or legitimate — by fitting a linear combination of inputs and squashing it into a probability between 0 and 1. Despite the name, it is a classifier, not a regression: the output is a probability, and a cutoff turns it into a decision.

```text
score = w1·tenure + w2·usage + w3·tickets + …
P(churn) = 1 / (1 + e^-score)     →  predict "churn" if P > cutoff
```

Its strength is transparency: each coefficient says how much its input moves the log-odds, so the model explains itself to stakeholders in a way fancier models cannot. That makes it the default first model for binary business outcomes — fast to build, easy to defend, often surprisingly close to complex alternatives.

The classic mistakes:

- Reading coefficients as causal effects. A positive coefficient on "contacted support" does not mean support causes churn — struggling users both contact support and leave. Coefficients describe association in the fitted data (see [correlation vs causation](/t/correlation-vs-causation)).
- Default 0.5 cutoff. The threshold should reflect the costs of each error type, not mathematical convenience. A fraud model and a marketing model need different cutoffs from identical scores.
- Imbalanced classes judged by accuracy. Predicting "no churn" for everyone scores well and helps nobody. Judge with precision, recall or profit-weighted measures (see [classification vs regression](/t/classification-vs-regression)).
- Correlated inputs left in. Highly related features split credit arbitrarily and inflate standard errors, making coefficients unstable and uninterpretable. Check correlations and simplify.
- No validation. A model that fits history perfectly and fails next month is [overfit](/t/overfitting). Hold out recent data and validate there (see [train-test split](/t/train-test-split)).

**When to go further:** interactions and non-linearities the linear form cannot bend to, or text and image inputs — then gradient boosting or richer models, with logistic kept as the explainable baseline every complex model must beat.
