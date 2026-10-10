---
title: "Software Architecture"
summary: "The high-level structure of a system and the decisions that are expensive to change."
levels: { backend: mid-level, frontend: mid-level }
aliases: ["software architecture", "system architecture", "architecture"]
prereqs: ["modular-monolith", "monolith"]
related: ["quality-attributes", "architecture-review", "fitness-function"]
---
**Software architecture** is the system's high-level structure plus the decisions that are expensive to change: component boundaries, data ownership, communication styles, deployment topology. Code details bend; these decisions don't — which is why architecture is decided early, revisited deliberately, and documented with its rationale rather than just its shape.

```text
architecture = components + relationships + principles + deferred decisions
```

Its job isn't diagrams — it's managing change cost: placing seams where the business varies, choosing constraints (sync vs async, shared vs owned data) that the whole system inherits, and making trade-offs explicit (consistency vs availability, speed vs safety) instead of accidental.

The classic mistakes:

- Big up-front over-design. Architecting for hypothetical scale and features produces complexity the business never needs. Decide the expensive things; defer the rest reversibly.
- No recorded rationale. A boundary nobody remembers the reason for gets "simplified" away — relearning the lesson at production cost. ADRs (decision records) preserve why.
- Architecture as pictures. Diagrams without principles, fitness functions and review are decoration. The architecture lives in what the system *enforces*.
- Ignoring the lasagna. "Microservices" sharing one database and deploying in lockstep pay distribution costs for monolith benefits — the worst of both (see [distributed monolith](/t/distributed-monolith)).
- Conway blindness. The system's seams mirror the org chart whether you plan it or not; plan it, or inherit accidental boundaries.
- Quality attributes as wishes. "Scalable, secure, resilient" without quantified NFRs and fitness functions never survives contact with deadlines.

**How to practise it:** decide the costly things early and explicitly, record why, enforce with fitness functions and reviews, and evolve the rest. Architecture is risk management for change — see [evolutionary architecture](/t/evolutionary-architecture) for keeping it alive.
