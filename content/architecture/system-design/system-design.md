---
title: "System Design"
summary: "Designing the components, data flow and trade-offs of a whole system."
levels: { backend: mid-level, frontend: mid-level }
aliases: ["system design", "systems design", "designing systems"]
prereqs: ["software-architecture", "clarifying-requirements"]
related: ["system-design-interview", "capacity-planning", "non-functional-requirements"]
---
**System design** is the practice of turning requirements into an architecture that meets them: components and their responsibilities, data models and storage, communication patterns, scaling and failure strategies — at the level where the costly decisions live, above code and below operations. It starts from clarified requirements and ends at a buildable, reviewable plan.

```text
requirements → estimates → API/shape → data → components → scale/failure → review
```

The discipline is trade-offs made explicitly: consistency vs availability per workload, sync vs async per interaction, build vs buy per capability — each recorded with its reason, because every design is a bundle of bets about load, failure and change.

The classic mistakes:

- Solution-first design. Reaching for favourite components (Kafka! Kubernetes!) before requirements produces impressive diagrams solving nothing. Requirements, then shapes, then tools.
- No numbers. Designs without estimates (QPS, storage, bandwidth) can't choose between options that differ by orders of magnitude. Back-of-envelope first, always.
- Happy-path only. A design that never says what fails, and what happens then, isn't a design — it's a demo. Failure modes and degradation are core deliverables.
- Data as an afterthought. Storage, schema, partitioning and access patterns constrain everything above; bolting the database on last guarantees mismatch.
- Ignoring operations. No deploy story, no observability, no runbooks — a design nobody can run. Operability is a design requirement, not a handoff.
- Review-free finality. Undiscussed designs encode one person's blind spots. Review with operators and adjacent owners before building.

**How to practise it:** clarify, estimate, sketch alternatives, decide with reasons, plan failure and operations, review. System design is decision-making under constraints — the artefacts just record the decisions.
