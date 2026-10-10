---
title: "Blackboard Pattern"
summary: "Independent components cooperating through a shared knowledge store."
levels: { backend: principal }
aliases: ["blackboard pattern", "blackboard architecture", "blackboard system"]
prereqs: ["design-pattern", "mediator-pattern"]
related: ["event-bus", "pub-sub-pattern", "domain-driven-design"]
---

**Blackboard** is an architecture where several independent specialists cooperate through a shared data store — the **blackboard**. Each specialist (a "knowledge source") watches the shared state, contributes when its expertise applies, and the combination of partial contributions gradually builds toward a solution. A control component decides which specialist acts next.

```text
knowledge sources:  parser, predictor, detector, ...
                        │ read/write
blackboard:        [ shared evolving state / partial solutions ]
                        │
control:           decides who runs next
```

The metaphor is a group of experts at a blackboard: each adds what they know, sees what others have written, and the answer emerges from the collaboration. It fits problems that are too varied for a single fixed algorithm — the system doesn't know in advance which combination of techniques will crack a given case.

Classic uses are AI-flavoured: speech recognition (acoustic, lexical and language models contributing incrementally), image understanding, planning. Outside AI, it appears as shared-state architectures where many agents contribute to a common model over time.

The classic mistakes:

- Confusing it with pub/sub. Pub/sub is a decoupled event broadcast; the blackboard is a *shared evolving model* that components read and update, with control logic deciding who acts. An [event bus](/t/event-bus) tells you *something happened*; a blackboard holds *the current partial answer*.
- No control strategy. Without a rule for which source runs next, you get either thrashing (everyone reacts to everything) or nothing progressing. The controller is essential, not optional.
- Unbounded blackboard growth. The shared state grows as contributions accumulate; without pruning or a termination condition, it keeps growing and the search never ends.
- No termination criteria. Because many specialists can keep refining, you need an explicit "good enough" or "no more progress" rule, or the system doesn't stop.
- Reaching for it over-engineering. Blackboard is heavyweight. For most problems a straightforward pipeline or a [mediator](/t/mediator-pattern) coordinating a few components is simpler and adequate.

**When to use it:** when the problem is naturally solved by heterogeneous specialists contributing to a shared solution that evolves — and no single algorithm fits all cases. It's a niche but powerful architecture, and it teaches a useful idea: sometimes the answer is a shared model plus contributors, not one monolithic solver. It sits near [domain-driven design](/t/domain-driven-design) in spirit when a complex domain needs several models contributing to one understanding.
