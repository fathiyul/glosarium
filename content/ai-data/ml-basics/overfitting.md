---
title: "Overfitting"
summary: "A model memorizing its training data instead of generalizing."
levels: { backend: senior, frontend: senior, data-engineer: senior , data-analyst: mid-level }
aliases: ["overfitting", "overfit", "memorisation"]
prereqs: ["train-test-split", "supervised-learning"]
related: ["train-test-split", "classification-vs-regression", "neural-network"]
---
**Overfitting** is when a model learns the particular quirks of its training examples, including noise, instead of the pattern that generalises. Its training performance looks excellent while performance on new data is disappointing. The model has memorised rather than learned.

```text
training error: low   ·   held-out error: high   →   overfitting
```

It is a gap between what the model saw and what it will face. Flexible models (large networks, deep trees, many features) overfit more readily, and small or unrepresentative datasets make it worse.

The classic mistakes:

- Judging the model on its training score. The training score is the most optimistic number you have. Always compare against held-out data.
- Tuning on the test set. Repeatedly checking the final test set turns it into a second training set and hides overfitting from you.
- Too little data for the model's capacity. More parameters than the data can constrain will fit noise. Simplify the model or get more data.
- Leakage that looks like skill. A feature that carries the answer produces a model that seems to generalise until it meets production. Overfitting to leakage is especially deceptive.
- Discarding the signal of a drift. A model fitted tightly to last year's patterns can overfit to a period that no longer exists.

**Ways to detect and reduce it:** validate on data held back from training, use cross-validation on small datasets, apply regularisation, simplify features and models, and watch the gap between training and validation curves over time.

A practical check is to plot training and validation error against training set size or epochs. Diverging curves are an early and clear warning, and they tell you whether the next step is more data, a simpler model or stronger regularisation.
