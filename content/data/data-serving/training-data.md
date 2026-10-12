---
title: "Training Data"
summary: "Labeled examples prepared for machine learning."
levels: { data-engineer: mid-level , data-scientist: mid-level }
aliases: ["ML training set", "training dataset", "labeled data", "training examples"]
prereqs: ["machine-learning", "dataset"]
related: ["feature-store", "overfitting", "data-cleaning", "sampling-data", "data-versioning", "model-serving"]
---

Training data is the set of labeled examples a machine learning model learns from. For a model that predicts churn, each example is a customer with their features and a label saying whether they churned. The quality and correctness of this data usually matter more than the choice of model.

The classic mistake is building the training set with information the model will not have at prediction time. Suppose you label "churned" for customers who left in March, then compute "support tickets in the last 30 days" using today's data. That feature includes tickets that happened after the customer churned, so the model learns from the future and looks far better in testing than in production. This is **leakage**, and it is easy to introduce when features are computed with a single "latest" query instead of **as of each example's date**. A [feature store](/t/feature-store) exists partly to do point-in-time joins that prevent it.

## What good training data needs

- Correct labels. Labels are often the hardest part: they come from human annotation, from outcomes, or from proxies, and each source has bias and noise. Wrong labels cap how good any model can be.
- Representative examples. The training set should look like the data the model will see. Sampling only easy or recent cases makes the model fail on the rest ([sampling data](/t/sampling-data)).
- Clean features. Handle nulls, duplicates and bad values the same way in training and serving, or you get training-serving skew ([data cleaning](/t/data-cleaning), [overfitting](/t/overfitting)).
- A held-out test set. Split examples into train, validation and test, and keep the test set untouched, so the reported accuracy is honest.
- Reproducibility. Version the dataset and the code that built it, so you can retrain and explain what changed ([data versioning](/t/data-versioning), [data lineage](/t/data-lineage)).

## Where data engineers fit

Building training sets is a data pipeline problem: join labels to features at the right time, keep it reproducible, and monitor it. Treat training data as a [data product](/t/data-product) with an owner, tests and freshness, and handle personal data under the same [governance](/t/data-governance) rules as anything else ([PII](/t/pii)).

## When not to reach for ML

If a rule answers the question reliably, a rule is easier to maintain and explain. Training data is only worth the effort when the pattern is genuinely hard to write down and you have enough good examples to learn it.
