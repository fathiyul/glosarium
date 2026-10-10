---
title: "Temperature"
summary: "A setting controlling how random a model's output is."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["temperature", "sampling temperature", "randomness setting"]
prereqs: ["how-llms-work", "llm-token"]
related: ["how-llms-work", "llm-evals", "structured-output"]
---
**Temperature** is a setting that controls how much randomness a model uses when choosing each next token. Low temperature makes the model favour its most probable choices, producing more consistent and conservative output. Higher temperature spreads probability across alternatives, producing more varied and sometimes more creative but less predictable text.

```text
low temperature  → consistent, repeatable, can be dull or repetitive
high temperature → varied, surprising, more chance of drifting off-task
```

It is a dial on sampling, not on correctness. Lowering it does not make a wrong answer right; it makes the model more likely to repeat whichever answer it already favours.

The classic mistakes:

- Treating temperature as a reliability control. Low values reduce variation but do not verify facts. Use retrieval, validation and evaluation for correctness.
- Using high values for structured tasks. Extraction and classification need consistency; randomness causes format and value drift.
- Expecting determinism at zero. Even at the lowest setting, implementations can vary slightly. Design for small variation.
- Tuning it by feel. Choose settings by measuring on an evaluation set, not by reading a few outputs.
- Forgetting interaction with other settings. Sampling controls work together; changing one can change the effect of another.

**Rule of thumb:** low for extraction, classification and anything that feeds code; moderate for drafting; test whatever you choose.

Record the sampling settings with every logged output. Without them, a change in quality may be blamed on the prompt or the model when the real cause was a silent change in randomness that someone set during a test and forgot to revert.
