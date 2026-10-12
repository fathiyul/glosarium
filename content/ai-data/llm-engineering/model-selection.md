---
title: "Choosing a Model"
summary: "Trading off quality, speed and cost across model sizes and providers."
levels: { backend: senior, frontend: senior, data-engineer: senior , data-scientist: senior }
aliases: ["choosing a model", "model selection", "picking an LLM"]
prereqs: ["llm-evals", "llm-cost-latency"]
related: ["llm-evals", "llm-cost-latency", "fine-tuning"]
---
**Choosing a model** means picking which model, at which size and in which deployment form, best meets a task's quality, latency, cost and data-handling requirements. There is rarely one best model; there is the best trade-off for a specific task, and that trade-off changes as models and needs change.

```text
task requirements → candidate models → evaluate on your data → weigh quality, latency, cost, privacy
```

Start from the requirements. A classification step handling millions of short inputs has different constraints than a long, careful drafting task. Larger models often do better on hard reasoning, but cost more and respond more slowly; smaller ones can be sufficient for narrow jobs.

The classic mistakes:

- Choosing by leaderboard alone. Public benchmarks rarely reflect your inputs. Evaluate candidates on a representative set from your product.
- Defaulting to the biggest model. Paying for capability the task does not need wastes money and latency. Test whether a smaller model is good enough.
- Ignoring data handling. Where data is processed, retained and used for training matters for many workloads. Check it before committing.
- Locking in without an exit. Hard-coding one provider's specifics makes switching expensive. Keep prompts and interfaces portable and re-evaluate periodically.
- One-time decision. Models and prices change. Re-run the evaluation on a schedule, not only at launch.

**Practice:** define requirements, build a small evaluation set, compare two or three candidates on quality and cost, and document the decision with its evidence.

Write down the decision and the evidence behind it, including the cost and latency figures at the time. When prices and capabilities change, that record makes the next evaluation a focused comparison instead of a restart from scratch.
