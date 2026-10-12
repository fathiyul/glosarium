---
title: "Prompt Engineering"
summary: "Writing instructions that get reliable results from a model."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-analyst: mid-level , data-scientist: mid-level }
aliases: ["prompt engineering", "prompt design", "prompting"]
prereqs: ["how-llms-work", "system-prompt"]
related: ["system-prompt", "structured-output", "llm-evals"]
---
**Prompt engineering** is the practice of designing the input to a language model so it reliably produces the behaviour you want. The prompt carries the task, the context, the constraints, the output format and sometimes examples. Good prompts are specific about what success looks like and leave the model less to guess.

```text
role + task + context + constraints + output format + (examples) → response
```

It is less magic than it sounds. The gains come from the same disciplines as any interface design: being explicit, giving the reader the information it needs, removing ambiguity, and testing against cases you care about.

The classic mistakes:

- Vague instructions. "Summarise this well" leaves everything open. Say the audience, length, what to include and what to leave out.
- Stuffing irrelevant context. Extra material dilutes attention and raises cost. Include what the task needs.
- Relying on one example. A single example teaches the model its incidental features as well as the rule. Use a few varied examples and check what it copies.
- Untested prompt changes. A tweak that fixes one case can break three others. Keep a set of cases and rerun them after every change.
- Prompts as secrets of craft. Hard-to-read, undocumented prompts are unmaintainable. Version them, comment the intent, and keep them in source control.

**How to work:** write the prompt for a capable newcomer, test it on a representative set, and change one thing at a time. Measure with [evals](/t/llm-evals), not impressions.

A useful habit is to keep a short changelog next to each prompt, noting what changed and why, along with the eval results before and after. That turns prompt work from folklore into a record your team can review and reproduce.
