---
title: "Train / Test Split"
summary: "Holding out data to evaluate a model honestly."
levels: { backend: senior, frontend: senior, data-engineer: senior }
aliases: ["train test split", "held-out data", "validation split"]
prereqs: ["machine-learning", "supervised-learning"]
related: ["overfitting", "supervised-learning", "classification-vs-regression"]
---
A **train/test split** divides available labelled data into a portion used to fit the model and a portion held back to measure how it performs on unseen examples. The held-out part stands in for the future: it is the only honest estimate of how the model will behave once deployed.

```text
all labelled data → train (fit parameters) | validation (tune choices) | test (final check, once)
```

Three roles are worth separating. Training data sets the parameters. Validation data guides decisions such as model type, features and thresholds. The test set is consulted rarely, so it still reflects unseen data after all that tuning.

The classic mistakes:

- Random splits for time-dependent data. Shuffling time series or event streams trains on the future and overstates performance. Split by time.
- Leakage across the split. Preprocessing (scaling, imputation, target encoding) fitted on the full dataset before splitting leaks test information. Fit transformations on training data only.
- Repeated peeking at the test set. Each check and adjustment makes the test set less honest. Lock it until the end.
- Same entity on both sides. If one customer appears in both training and test, the model can recognise them rather than generalise. Split by entity where that matters.
- Tiny test sets. A few hundred examples give wide error bars; report uncertainty, not just a point estimate.

**Rule of thumb:** decide the split strategy from how the model will be used in production, not from convenience.

Document the split in the project: what was held out, why, and how it was chosen. Six months later, the reason a particular split was used is usually lost, and an unexplained split is the first thing a reviewer will question.
