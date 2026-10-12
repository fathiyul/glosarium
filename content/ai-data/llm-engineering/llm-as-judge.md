---
title: "LLM-as-Judge"
summary: "Using one model to grade another model's output."
levels: { backend: senior, frontend: senior, data-engineer: senior , data-scientist: senior }
aliases: ["LLM-as-judge", "model-graded evaluation", "judge model"]
prereqs: ["llm-evals", "train-test-split"]
related: ["llm-evals", "temperature", "model-selection"]
---
**LLM-as-judge** uses a language model to grade the outputs of another model against a rubric: is this answer faithful to the source, is this summary complete, does this reply follow the policy. It makes evaluation scalable where human grading is too slow or expensive for every change, and it is most useful as a complement to human review rather than a replacement.

```text
output + rubric (+ reference or source) → judge model → score + rationale → aggregate
```

A judge is itself a model with biases: it may prefer longer answers, favour its own style, or be inconsistent across runs. Its reliability is an empirical question that must be checked against human judgement on a sample.

The classic mistakes:

- Trusting the judge without calibration. Compare judge scores with human labels on a sample and measure agreement before relying on them.
- Vague rubrics. "Is it good?" produces noisy grades. Define criteria concretely with examples of each score.
- Judging with the same model family under test. Self-preference inflates scores. Use an independent judge where possible.
- Ignoring position and length bias. Pairwise comparisons can favour whichever answer appears first or is longer. Randomise order and control for length.
- Single-run scores. Judges vary between runs. Average several or fix the sampling settings.

**Practice:** write a precise rubric, calibrate against human labels, randomise and average, and keep humans in the loop for the cases that matter most.

Keep a small set of human-labelled examples as a permanent reference and re-check judge agreement whenever the judge model or rubric changes. A judge that agreed with people last quarter may not agree with them after a silent update.
