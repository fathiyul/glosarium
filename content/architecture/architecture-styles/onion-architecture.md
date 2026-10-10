---
title: "Onion Architecture"
summary: "A layered style with the domain model at the center."
levels: { backend: senior }
aliases: ["onion architecture", "onion layers", "palermo onion"]
prereqs: ["layered-architecture", "clean-architecture"]
related: ["clean-architecture", "hexagonal-architecture", "seam"]
---
**Onion architecture** layers code in rings around a domain core — domain model centre, domain services around it, application services next, infrastructure outermost — with dependencies strictly inward. Cousin to clean and hexagonal styles, it emphasises the domain model's centrality: everything serves the model; nothing pollutes it.

```text
domain model ← domain services ← application services ← infrastructure/tests
```

The rings encode a rule with teeth: outer layers may know inner ones, never reverse. Infrastructure (ORM, messaging, UI) sits outermost, replaceable; tests target inner rings without infrastructure. Coupling points inward, toward stability, by construction.

The classic mistakes:

- Inward violations. Infrastructure types in the domain (ORM base classes on entities, HTTP exceptions in services) rot the centre silently. Enforce direction with module rules and reviews.
- Service-layer bloat. Application services accumulating domain logic hollow the model (anemia by accretion). Push rules inward relentlessly.
- Ring proliferation. Seven rings with subtle distinctions confuse more than they protect. Few rings, bright lines, enforced consistently.
- Infrastructure-shaped domain. Entities mirroring tables, services mirroring endpoints — the database/API designing the model by proxy. Model the domain first; map infrastructure after.
- Shared kernels abused. Common libraries sprawling into dumping grounds couple every ring to everything. Kernel minimal, versioned, dependency-free.
- Testing the onion skin. End-to-end-only testing leaves inner rings' rules unverified in isolation. Unit-test inward; integrate outward.
- Onion for simple apps. Ceremony without complexity to protect slows delivery measurably. Simpler layering (or modules) serves simple domains.

**How to practise it:** model the domain purely, ring outward by stability, enforce inward dependencies mechanically. The onion preserves what matters longest — the model — from what changes fastest.
