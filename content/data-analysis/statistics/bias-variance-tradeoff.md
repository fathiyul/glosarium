---
title: "Bias-Variance Tradeoff"
summary: "Simple models underfit, complex ones overfit."
levels: { data-analyst: senior , data-scientist: mid-level }
---

The bias-variance tradeoff says a model's error has two competing sources. Bias is the error from being too simple to capture the pattern — a straight line through a curve misses systematically, whatever the data. Variance is the error from being so flexible it chases noise — refit on a fresh sample and the model swerves. Total error bottoms out somewhere in between, and the tradeoff is finding that point instead of picking a favorite end.

Analysts feel it without naming it: the heavily-simplified spreadsheet model that always "fits" and never surprises, versus the clever model that dazzled in the notebook and face-planted after launch. A dashboard metric cut into twenty tiny segments is the same disease — each slice is high-variance noise presented as insight.

Data scientists formalize it: on [training data](/t/train-test-split), more flexibility almost always lowers error; held-out error falls, then rises as the model memorizes — that U-shape is [overfitting](/t/overfitting), and choosing where to stop is part of [model selection](/t/model-selection). Regularization, bagging and ensembles are machinery for living on the curve: they trade a little bias for a lot of variance.

The classic mistake is reading the labels backwards under real conditions. "Complex" in parameter count is not complex in effective flexibility — a regularized giant network can be simpler than a tiny unregularized one, and a linear model with 200 correlated features can be wildly high-variance. Judge the fitted-to-data behavior, not the architecture name.

When not to optimize the curve at all: when sample size is genuinely small, the sensible move is a deliberately high-bias model and a clear statement of what it cannot see, not a heroic quest to eliminate its bias. A wrong-but-stable answer beats a right-looking-but-unstable one in decisions that repeat weekly.
