---
title: "Model"
summary: "The learned function that turns inputs into predictions."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["model", "trained model", "ML model"]
prereqs: ["machine-learning", "training-vs-inference"]
related: ["training-vs-inference", "model-serving", "overfitting"]
---
A **model**, in machine learning, is the learned artefact: the set of parameters and structure produced by training, which maps inputs to outputs. It is not the code that trains it, and not the data it was trained on. In practice a model is a file or a service with a version, the features it expects, and a record of how it was evaluated.

```text
training code + data → model artefact (weights + schema + metadata) → serving
```

Treating the model as a versioned, documented thing is what makes it operable. Two models with the same architecture but different training data are different products, and the team needs to know which one is running.

The classic mistakes:

- Losing the link to its training data and code. A model that cannot be reproduced cannot be debugged or safely retrained.
- Deploying without the feature contract. The model expects specific inputs in a specific form; a silent change in a feature's meaning breaks predictions with no error.
- Confusing a model with a system. The model scores; the surrounding system decides what to do with the score, including thresholds, fallbacks and human review.
- Keeping only the latest version. Rollback needs the previous artefact, and comparisons need the old evaluation results.
- Overvaluing a single metric. A model is judged on the errors that matter for its use, including who bears them, not on one headline number.

**Why it matters:** a model is the unit you version, evaluate, deploy, monitor and retire. Naming and tracking it like any other production dependency turns machine learning from an experiment into an engineering practice.
