---
title: "Machine Learning"
summary: "Software that learns patterns from data instead of following explicit rules."
core: [data-scientist]
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-analyst: mid-level , data-scientist: junior }
aliases: ["machine learning", "ML", "statistical learning"]
prereqs: ["supervised-learning", "train-test-split"]
related: ["supervised-learning", "unsupervised-learning", "deep-learning"]
---
**Machine learning** is the practice of building programs whose behaviour is learned from data rather than written as explicit rules. Instead of coding "flag transactions above this amount," you give the system many examples of transactions labelled fraudulent or legitimate and let it find a function that separates them. The output is a **model**: a learned mapping from inputs to predictions.

```text
data (inputs + outcomes) → training algorithm → model → predictions on new inputs
```

Machine learning sits between statistics and software engineering. The statistics decide whether a pattern is real and generalises; the engineering decides whether the pipeline, data and serving are reliable enough to matter.

The classic mistakes:

- Starting with the model instead of the question. Without a clear prediction target and a decision it will inform, the most accurate model is still useless.
- Evaluating on the training data. A model that memorised its examples looks perfect. Hold data back and measure on what it has never seen.
- Leakage. Features that secretly contain the answer (a field filled in after the event) inflate results and collapse in production.
- Ignoring the baseline. A rule of thumb or the majority class is the floor any model must beat, and often the honest answer is "no model needed."
- Treating a deployed model as finished. Data changes; predictions degrade quietly unless monitored.

**How to start well:** define the prediction, the metric that reflects the business cost of errors, a simple baseline, and a held-out evaluation before any modelling. Most of the difficulty is in those choices, not the algorithm.
