---
title: "Predictive Analysis"
summary: "Estimating what will happen, and saying how sure you are."
core: [data-scientist]
levels: { data-analyst: mid-level , data-scientist: junior }
aliases: ["predictive analysis", "predictive modelling", "prediction"]
prereqs: ["regression-analysis", "train-test-split"]
related: ["regression-analysis", "forecasting", "prescriptive-analysis", "overfitting"]
---

**Predictive analysis** estimates future or unseen outcomes from past data: which leads will convert, which customers will churn, next month's demand. It differs from [forecasting](/t/forecasting) mainly in scope — forecasting extrapolates series over time, while prediction scores cases (users, transactions, days) from their features.

```text
features (past behaviour, attributes) ──▶ model ──▶ score per case + validation
```

The credibility of a prediction rests on validation, not sophistication. A model tested on data it never saw, scored with the metric the decision actually needs, and compared against a simple baseline ([naive](/t/naive-forecast) for series, majority-class or a rule of thumb for cases) is trustworthy in proportion to that evidence. Everything else is a demo.

The classic mistakes:

- No baseline. A churn model at 85% accuracy where "predict no churn for everyone" scores 90% is worse than nothing. Baselines first, always.
- Leakage. A feature that contains the answer — cancellation date predicting churn, future information in a "historical" snapshot. Leakage inflates validation and fails live; audit features for time-travel.
- Wrong metric. Accuracy on imbalanced classes, MAPE on intermittent demand. Score with the loss the decision cares about (see [classification vs regression](/t/classification-vs-regression)).
- [Overfitting](/t/overfitting) the validation. Tuning repeatedly against one holdout turns it into training data. Lock a final test set, or accept that the reported number is optimistic.
- Shipping scores without a decision rule. A churn probability nobody acts on is decoration. Define the threshold, the action and the owner before deploying.

**When not to predict:** when a rule suffices ("trial ended yesterday" needs no model), when the data cannot support the claim, or when the prediction would not change any action. Prediction is a means to a decision — start from the decision and work backwards (see [prescriptive analysis](/t/prescriptive-analysis)).
