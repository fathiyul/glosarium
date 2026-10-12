---
title: "Tool Use / Function Calling"
summary: "Letting a model call your functions and APIs."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["tool use", "function calling", "tool calling"]
prereqs: ["structured-output", "ai-agent"]
related: ["ai-agent", "structured-output", "guardrails"]
---
**Tool calling** (also called function calling) lets a model request that the application run a named function with arguments it has chosen. The developer describes each tool with a name, a purpose and a schema for its inputs. The model decides when a tool is useful and emits a structured call; the application executes it and returns the result for the model to use.

```text
model → {tool: "lookup_order", args: {id: "A123"}} → app runs it → result → model answers
```

The model never executes anything itself. That separation is the core safety property: the application decides what is actually allowed to run, validates arguments and enforces permissions.

The classic mistakes:

- Trusting arguments. Model-chosen arguments can be wrong, out of range or malicious after injection. Validate every argument as untrusted input.
- Over-broad tools. A generic "run query" tool gives the model far more reach than the task needs. Expose narrow, specific operations.
- Ambiguous tool descriptions. If two tools overlap in purpose, the model chooses inconsistently. Write distinct descriptions with clear when-to-use guidance.
- No handling of tool errors. Failed calls must return a clear result the model can act on, or the loop stalls or hallucinates success.
- Missing authorisation. The tool runs with the caller's permissions unless you scope it. Check the end user's rights inside the tool, not in the prompt.

**Practice:** few well-named tools, strict argument validation, least-privilege execution, and logs of every call for review.

Test the failure paths deliberately: a tool that times out, returns an empty result, or returns data in an unexpected format. The model's recovery from those cases is part of the feature, and it is often where the most embarrassing behaviour shows up.
