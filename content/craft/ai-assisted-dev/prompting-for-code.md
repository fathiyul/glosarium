---
title: "Prompting for Code"
summary: "Giving an AI enough context and constraints to produce useful code."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["prompt engineering for code", "writing prompts for coding assistants"]
prereqs: ["ai-coding-assistant"]
related: ["ai-coding-assistant", "reviewing-ai-code", "hallucination", "agent-instructions-file", "context-window"]
---

The quality of what an AI coding assistant produces depends a lot on what you give it. Prompting for code means supplying enough context and constraints that the answer is useful, instead of generic.

A weak prompt:

> write a function to process orders

A better one:

> In `orders/service.py` (Python 3.12, SQLAlchemy 2), add `cancel_order(order_id, user)`. It should: raise `NotFound` if the order doesn't exist, raise `Forbidden` if it belongs to another user, refuse to cancel orders already shipped, and set status to `cancelled` inside a transaction. Follow the style of `refund_order` in the same file. Add pytest tests next to the existing ones.

## What to include

- **The goal and the context**: what it's for, what already exists, where the change goes. Paste or point to the relevant code ([context windows](/t/context-window)).
- **Constraints**: language and versions, libraries to use or avoid, style, performance, security rules.
- **Behavior and edge cases**: inputs, outputs, errors.
- **Examples**: sample input and expected output, or an existing function to imitate.
- **The format you want**: just the diff, a plan first, tests included.

## Habits that work

- **Work in small steps.** Ask for one change, check it, then continue. Big requests produce big mistakes.
- **Ask for a plan first** on anything non-trivial, and correct it before code is written.
- **Show errors fully**: paste the whole message and stack trace, and what you expected.
- **Say what's wrong** when it misses, specifically, instead of repeating the request.
- **Keep project rules in a file** the assistant reads each session ([agent instructions file](/t/agent-instructions-file)).
- **Start fresh** when a long conversation drifts.
- **Verify the result**: run it, test it, read it ([reviewing AI code](/t/reviewing-ai-code)).

## Cautions

- Don't paste secrets or private data into tools you aren't cleared to use.
- Detail doesn't guarantee correctness. It can still [hallucinate](/t/hallucination).
- If you can't describe the problem clearly, work on understanding it first. The prompt is a mirror of your thinking.
