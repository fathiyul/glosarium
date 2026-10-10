---
title: "Waterfall"
summary: "Sequential phases from requirements to release."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["waterfall model"]
prereqs: ["sdlc"]
related: ["sdlc", "agile", "requirements", "scrum"]
---

Waterfall is a development approach where a project moves through distinct phases in order: requirements, design, implementation, testing and release. Each phase finishes before the next one starts, and work flows downward like a waterfall.

```
requirements -> design -> implementation -> testing -> release
```

The strength of the model is predictability. Requirements and design are settled up front, so the scope and the plan are clear. It's still used where requirements are stable and changes are expensive to make, such as some regulated or hardware-linked projects.

The weakness shows up when requirements change. Testing happens late, so a misunderstanding made during requirements can surface only at the end, when fixing it costs the most. [Agile](/t/agile) approaches were partly a response to that, by delivering smaller pieces and checking them early.

The classic mistake is treating waterfall as a single pass with no feedback. Teams that use this approach still need to check their assumptions along the way, such as reviewing requirements with users before design begins. For the stages themselves, see the [software development lifecycle](/t/sdlc).
