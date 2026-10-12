---
title: "Classification vs Regression"
summary: "Predicting categories vs predicting numbers."
core: [data-scientist]
levels: { backend: senior, frontend: senior, data-engineer: senior , data-scientist: junior }
aliases: ["classification vs regression", "classification", "regression"]
prereqs: ["supervised-learning", "train-test-split"]
related: ["supervised-learning", "overfitting", "train-test-split"]
---
Supervised problems split by what the output is. **Classification** predicts a category: spam or not, which of five product types, fraudulent or legitimate. **Regression** predicts a continuous quantity: a delivery time, a price, next month's demand. The distinction decides the model's output, the loss it optimises and the metrics you should trust.

```text
classification: input → {class A, class B, …}   (accuracy, precision, recall, AUC)
regression:     input → number                   (MAE, RMSE, error in real units)
```

Many business questions can be framed either way. "Will this customer churn?" is classification; "how many days until they churn?" is regression. The choice changes what decisions the output supports, so frame it around the action, not the algorithm.

The classic mistakes:

- Accuracy on imbalanced classes. A rare-event classifier that always says "no" can score very high accuracy and be useless. Use precision, recall or a calibrated probability.
- Thresholds set without cost thinking. The default 0.5 cutoff is rarely the business optimum. Choose the threshold by the relative cost of false positives and false negatives.
- Regression judged only by a single average error. Large errors on important cases can matter more than the mean; look at error distributions.
- Treating predicted probabilities as calibrated. A score of 0.9 does not automatically mean a 90% chance; check calibration before using it as a probability.
- Converting between the two lazily. Bucketing a regression output into classes throws away information; keep the continuous value until the decision needs the cut.

**Rule of thumb:** name the decision the output drives first. That decides the type of output, the loss and the metric.
