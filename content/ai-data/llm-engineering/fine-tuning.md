---
title: "Fine-Tuning"
summary: "Further training a model on your own examples."
levels: { backend: senior, frontend: senior, data-engineer: senior , data-scientist: senior }
aliases: ["fine-tuning", "fine tuning", "model fine-tuning"]
prereqs: ["how-llms-work", "model-selection"]
related: ["model-selection", "prompt-engineering", "llm-evals"]
---
**Fine-tuning** continues training an existing model on a curated set of examples so it adapts to a particular style, format or task. Where prompting tells a model what to do each time, fine-tuning changes what it does by default, which can make behaviour more consistent and sometimes allows shorter prompts.

```text
base model + curated examples (input → desired output) → adapted model → evaluate
```

It is a significant investment: the examples must be high quality and representative, training must be repeated when requirements change, and the adapted model needs its own evaluation, deployment and monitoring. Many problems that look like they need fine-tuning are really prompt, retrieval or evaluation problems.

The classic mistakes:

- Fine-tuning to add knowledge. Models learn style and task behaviour more reliably than facts, which go stale. Use retrieval for knowledge.
- Training on noisy or inconsistent examples. The model learns the inconsistency. Clean and review the dataset first.
- No baseline. Without a strong prompted version to compare against, you cannot tell whether tuning helped.
- Overfitting to the examples. A small dataset can make the model rigid and worse on unseen inputs. Hold out an evaluation set.
- Forgetting maintenance. Each base model change or requirement change may require re-tuning and re-evaluation.

**Rule of thumb:** exhaust prompting and retrieval with an evaluation harness first. Fine-tune when a consistent behaviour gap remains and you can supply good examples.

Before investing in tuning, write the evaluation that would prove it worked. If you cannot describe the target behaviour and how to score it, the tuning run will produce a model that looks different without being demonstrably better.
