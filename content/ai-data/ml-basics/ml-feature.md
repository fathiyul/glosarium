---
title: "Feature"
summary: "An input variable a model uses."
core: [data-scientist]
levels: { backend: senior, data-engineer: senior , data-scientist: mid-level }
aliases: ["feature", "features", "ML feature"]
prereqs: ["machine-learning", "train-test-split"]
related: ["feature-store", "overfitting", "training-vs-inference"]
---
A **feature** is an input variable a model uses to make predictions: a customer's tenure in months, the number of logins last week, the words in a support ticket. Features are the model's view of the world, and the quality of that view usually determines results more than the choice of algorithm.

```text
raw data (events, tables, text) → transform → features → model
```

Good features encode what the prediction depends on, are available at the moment the prediction is made, and are computed the same way in training and in production. That last point is where many systems break.

The classic mistakes:

- Features unavailable at prediction time. "Total refunds this year" computed at month end cannot inform a prediction made on the first of the month. Use only information from before the prediction moment.
- Training-serving skew. Computing a feature one way in a notebook and another way in the service silently changes the model's inputs.
- Too many features. Redundant or noisy features invite overfitting and make the model harder to explain and maintain.
- Undocumented meaning. A column named `score` that means different things across versions quietly corrupts models. Name features precisely and record their definitions.
- Ignoring missing values. Missingness itself is often informative; handle it deliberately rather than letting imputation hide it.

**The practice:** define each feature's source, time window and definition in one place, verify it is available when predictions are made, and compute it through shared code for training and serving.
