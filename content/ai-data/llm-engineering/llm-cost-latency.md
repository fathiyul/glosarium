---
title: "LLM Cost and Latency"
summary: "Managing tokens, model choice and caching."
levels: { backend: senior, frontend: senior, data-engineer: senior , tech-entrepreneur: pmf , data-scientist: senior }
aliases: ["LLM cost and latency", "cost and latency", "LLM economics"]
prereqs: ["llm-token", "model-serving"]
related: ["llm-token", "prompt-caching", "model-selection"]
---
**LLM cost and latency** are shaped mostly by how many tokens go in and come out, which model is used, and how many calls a feature makes. Unlike a fixed-price service, cost scales with every request and every token, so a feature that works well at small scale can become expensive when usage grows.

```text
cost ≈ (input tokens × input price) + (output tokens × output price), per call × calls
latency ≈ time to first token + (output tokens × time per token) + network
```

Both are controllable through design. Shorter prompts, smaller models for simple steps, caching of shared prefixes, batching of background work, and limits on output length all move the numbers, usually without changing user-visible quality.

The classic mistakes:

- Unbounded output. Letting generation run long inflates both cost and wait time. Set sensible maximums.
- One large model for every step. Routine steps such as formatting or classification rarely need the most capable model. Route by task difficulty.
- Chatty pipelines. Many sequential calls multiply latency. Combine steps where quality allows, and parallelise independent ones.
- Forgetting retries. Each retry is another full cost. Cap retries and add backoff.
- Estimating without measurement. Price per token multiplied by guessed volume rarely matches reality. Instrument tokens, calls and latency per feature.

**Practice:** track cost per successful task, not per call; set budgets per feature; and treat latency targets as design constraints from the start.

Report cost per successful task rather than cost per call. A cheap call that fails and is retried can cost more overall than an expensive call that succeeds first time, and only the per-outcome view makes that trade-off visible.
