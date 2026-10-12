---
title: "Evals"
summary: "Systematically measuring the quality of LLM output."
levels: { backend: senior, frontend: senior, data-engineer: senior , data-scientist: senior }
aliases: ["evals", "LLM evaluation", "model evaluations"]
prereqs: ["prompt-engineering", "train-test-split"]
related: ["llm-as-judge", "model-selection", "temperature"]
---
**Evals** are systematic tests that measure how well a language-model feature performs on the tasks it must handle. A set of representative inputs, expected behaviours and scoring methods turns "it seems good" into numbers that can be compared across prompts, models and releases.

```text
eval set (inputs + expectations) → run system → score (exact, rubric, judge) → compare to baseline
```

Evals are the feedback loop that makes prompt and model work tractable. Without them, every change is a guess and regressions go unnoticed until users report them.

The classic mistakes:

- Evaluating only on examples you wrote to pass. The set must reflect real usage, including messy and adversarial inputs.
- Measuring one number. Quality has several facets — correctness, format, safety, tone — and they can trade off. Track each.
- No baseline. A score means little without the previous version to compare against.
- Stale datasets. Usage changes; an eval set frozen at launch stops representing reality. Add failures from production regularly.
- Scoring only the final answer. For agents and multi-step systems, intermediate steps matter. Evaluate the path as well.
- Running once. Sampling variation makes single runs unreliable. Repeat or fix settings so comparisons are fair.

**Practice:** build a versioned eval set from real traffic, define scores per facet, run evals on every change, and treat a regression like a failing test.

Start with a small, honest set and grow it from production failures. Each bug a user reports should become an eval case, so the same mistake cannot return unnoticed. Over time the set becomes the most valuable asset the team has for changing the system safely.
