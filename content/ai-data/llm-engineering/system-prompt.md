---
title: "System Prompt"
summary: "Instructions that set a model's behavior for a conversation."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["system prompt", "system message", "system instructions"]
prereqs: ["prompt-engineering", "how-llms-work"]
related: ["prompt-engineering", "prompt-injection", "prompt-caching"]
---
A **system prompt** is the standing instruction set given to a model before any user input: its role, its rules, its tone, the tools it may use and the boundaries it must respect. Applications place it in a privileged position so that it frames every subsequent exchange, while user messages carry the individual requests.

```text
system: role, rules, format, tools, limits
user:   this turn's request
assistant: response
```

Because it shapes every interaction, the system prompt is effectively application logic. It deserves the same care as code: review, versioning, tests and an owner.

The classic mistakes:

- Stuffing the system prompt with everything. A huge, sprawling prompt dilutes the important rules and raises cost on every request. Keep it focused and move reference material into retrieval.
- Assuming it is secret. Users can often coax a model into revealing its instructions. Never put credentials or sensitive logic in it.
- Treating it as a security boundary. A system prompt does not reliably stop a determined user or injected content. Enforce limits in code.
- Untested edits. Changing a line can alter behaviour across many cases. Keep an eval set and rerun it on every change.
- No ownership or version. When behaviour changes, nobody knows which prompt produced it. Version it alongside the release.

**The discipline:** short, specific, versioned and tested. The system prompt describes intent; enforcement belongs in the surrounding system.

When a rule matters, state it once, clearly, in the place where it applies, and enforce it in code as well. Repeating a rule ten times in the prompt rarely makes it more reliable and quietly consumes the budget the rest of the instructions need.
