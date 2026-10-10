---
title: "Supervised Learning"
summary: "Learning from labeled examples."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["supervised learning", "supervised", "labelled learning"]
prereqs: ["machine-learning", "train-test-split"]
related: ["classification-vs-regression", "unsupervised-learning", "train-test-split"]
---
**Supervised learning** trains a model on examples that come with the correct answer attached — each input paired with a label. The model's job is to learn the mapping from inputs to labels well enough to predict labels for inputs it has never seen. Spam filters, fraud scores and demand forecasts are all supervised problems.

```text
(input, label) pairs → learn f(input) ≈ label → predict on new inputs
```

Its strength is that the target is explicit, so performance can be measured directly against known answers. Its dependence is the labels: they must exist, be accurate, and reflect the thing you actually care about, which is often the hardest and most expensive part.

The classic mistakes:

- Labels that measure the wrong thing. A "good customer" label defined as "didn't churn in 30 days" optimises for a proxy that may reward the wrong behaviour.
- Noisy or inconsistent labelling. Different annotators disagreeing caps achievable accuracy; measure agreement and fix the guidelines first.
- Label leakage. Labels or features derived after the outcome give the model answers it will not have at prediction time.
- Imbalanced classes ignored. A model that predicts the majority class every time can look accurate; choose metrics that expose this.
- Evaluating on data the model was tuned on. Keep a test set untouched until the final check.

**When it fits:** you know what right looks like for a sample, and you can afford labels. When labels are scarce or expensive, consider unsupervised or semi-supervised approaches (see [unsupervised learning](/t/unsupervised-learning)).
