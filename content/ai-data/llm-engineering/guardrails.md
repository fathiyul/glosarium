---
title: "Guardrails"
summary: "Checks on model inputs and outputs for safety and correctness."
levels: { backend: senior, frontend: senior, data-engineer: senior , data-scientist: senior }
aliases: ["guardrails", "LLM guardrails", "safety layer"]
prereqs: ["prompt-injection", "input-validation"]
related: ["prompt-injection", "ai-agent", "output-encoding"]
---
**Guardrails** are the checks around a language model that constrain what goes in and what comes out: filtering unsafe or off-topic input, validating output format and content, blocking disallowed actions, and routing uncertain cases to people. They are a layered system, because no single check catches everything.

```text
input checks → model → output checks (schema, content, policy) → action gate → user
```

Guardrails can be rule-based (patterns, allowlists, schema checks), model-based (a classifier or second model judging content), or procedural (required approvals). Rule-based checks are predictable and cheap; model-based checks catch more nuance but add cost and their own errors.

The classic mistakes:

- A single filter as the whole defence. Any one check has blind spots. Layer checks at input, output and action boundaries.
- Guardrails that rely on the model behaving. Asking the model to police itself is the weakest layer. Enforce critical rules in code.
- Over-blocking. Strict filters reject legitimate requests and frustrate users. Measure false positives as carefully as misses.
- Unmeasured coverage. Teams often do not know what their guardrails miss. Build an adversarial test set and track results.
- Ignoring output encoding. Model output rendered as markup or executed as code is a separate risk. Encode it for its destination (see [output encoding](/t/output-encoding)).

**Practice:** define the policies, enforce the critical ones deterministically, add model-based checks where rules fall short, and red-team the whole stack regularly.

Review the guardrail logs on a schedule. Blocked requests show what users actually attempt, and allowed requests that were later reported show what the checks missed. Both feed directly into the next round of rules and tests.
