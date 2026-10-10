---
title: "Training vs Inference"
summary: "Building a model vs using it to make predictions."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["training vs inference", "training and inference", "offline vs online model"]
prereqs: ["machine-learning", "ml-model"]
related: ["model-serving", "ml-model", "llm-cost-latency"]
---
Every machine learning system has two distinct phases with very different needs. **Training** fits the model: it reads large amounts of historical data, adjusts parameters over many passes, and is typically run as a batch job that can take hours or days. **Inference** uses the finished model to produce predictions for new inputs, often one request at a time, and must answer within a latency budget.

```text
training:  data (large, historical) → heavy compute, batch, minutes–days
inference: one input → model → prediction (small, online, milliseconds–seconds)
```

Keeping them separate in design matters because they fail differently and cost differently. Training problems are about data quality, reproducibility and compute scheduling. Inference problems are about latency, throughput, cost per prediction and keeping the served model consistent with what was evaluated.

The classic mistakes:

- Designing for training speed only. A model that trains quickly but serves slowly can break the product's latency budget.
- Training-serving skew. Features computed differently at training and inference time silently degrade predictions. Use the same feature logic in both places.
- Assuming inference is free. Per-request cost multiplies with traffic and can dominate the total bill long after training was paid for.
- Retraining without re-evaluating serving. A new model may be better offline but slower or more expensive in production.
- Forgetting batch inference. Many predictions (nightly scores, precomputed recommendations) don't need an online path at all.

**The practical rule:** decide the inference budget (latency and cost per prediction) before choosing the model. The serving constraint often narrows the model choice more than accuracy does.
