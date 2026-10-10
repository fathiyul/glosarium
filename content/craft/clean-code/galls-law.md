---
title: "Gall's Law"
summary: "Complex systems that work evolved from simple systems that worked."
levels: { backend: senior, frontend: senior, data-engineer: senior }
aliases: ["gall's law", "galls law", "evolve complexity"]
prereqs: ["refactoring", "yagni"]
related: ["big-bang-rewrite", "technical-debt", "microservices", "monolith"]
---

**Gall's law** states: *"A complex system that works is invariably found to have evolved from a **simple system that worked**. A complex system designed from scratch never works and cannot be patched up to make it work. You have to start over with a working simple system."*

It's a warning against building the grand architecture first. Real working systems are grown: you start with something small that actually runs, and add complexity where it's needed, in steps, keeping it working throughout. A design that exists only on a whiteboard and is meant to be complex from day one usually doesn't survive contact with reality.

```text
Gall's law:  simple working → grow → more complex working → ...
not:         complex blueprint → build everything → works (rarely)
```

Why it holds: complexity comes from many interacting concerns, and you can't foresee how they'll actually interact. Each evolutionary step is informed by what the previous working system showed you, so surprises are caught early and the design is grounded in evidence rather than speculation.

The classic mistakes:

- Designing the perfect system up front. Teams plan microservices, event sourcing and a plugin model before the first feature works. The plan accumulates assumptions that break on contact with users.
- A [big bang rewrite](/t/big-bang-rewrite). Rewriting a working system into a designed-from-scratch complex one is Gall's law's failure mode in its purest form.
- Reading it as "never plan". Gall's law favours *incremental* design with clear direction, not no design at all. You still need a target; you get there in working steps.
- Using it to justify mess. "We'll evolve it" isn't licence for no structure. Evolve *simple, working, well-factored* systems — see [refactoring](/t/refactoring) and [YAGNI](/t/yagni).
- Ignoring scale. What grows a small system can stall at large scale; you still have to evolve the architecture deliberately as needs grow.

The practical reading: ship the simplest thing that works, then let real requirements drive the next increment. That's how [monoliths](/t/monolith) become [microservices](/t/microservices) or a modular monolith when there's evidence — not the other way round. It's a humbling, effective default.
