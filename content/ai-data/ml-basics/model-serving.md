---
title: "Model Serving"
summary: "Deploying a model behind an API."
core: [data-scientist]
levels: { backend: senior, data-engineer: senior , data-scientist: mid-level }
aliases: ["model serving", "serving models", "ML inference service"]
prereqs: ["training-vs-inference", "ml-model"]
related: ["training-vs-inference", "ml-model", "feature-store"]
---
**Model serving** is the infrastructure that makes a trained model available to the application: loading the artefact, accepting requests, computing features, running inference and returning results within the latency and reliability the product needs. It is the production half of machine learning, and most of the operational risk lives there.

```text
request → fetch features → load model version → predict → post-process → response
```

Common shapes are a dedicated inference service behind an API, batch scoring that writes predictions to a store for later lookup, and embedded models running inside the application. The right one depends on how fresh predictions must be and how many there are.

The classic mistakes:

- Serving a model without knowing its feature contract. The service must fetch and shape features exactly as training did.
- No versioning or rollback. A bad model should be reversible in minutes, which requires keeping and routing to previous versions.
- Cold starts and resource spikes. Loading a large model on first request produces latency spikes; warm instances before traffic arrives.
- Unbounded input and queueing. Large or unexpected inputs and unbounded request queues can exhaust memory; validate inputs and cap concurrency.
- Silent degradation. Serving succeeds while predictions drift. Log predictions and monitor their distribution alongside latency and errors.
- Ignoring fallbacks. When the model or feature service is down, the product needs a defined behaviour: a default, a cached score, or no prediction.

**The essentials:** versioned artefacts, a tested feature path, bounded resources, prediction logging and a fallback that the product has agreed to.
