---
title: "Clean Architecture"
summary: "Concentric layers whose dependencies point inward to the domain."
levels: { backend: senior, frontend: senior }
aliases: ["clean architecture", "clean code architecture", "uncle bob architecture"]
prereqs: ["layered-architecture", "hexagonal-architecture"]
related: ["hexagonal-architecture", "onion-architecture", "framework-independence"]
---
**Clean Architecture** organises code in concentric rings with dependencies pointing inward: entities (business objects) at the centre, use cases around them, interface adapters next, frameworks and drivers outermost. The dependency rule is absolute — inner rings know nothing of outer ones — so business logic never depends on databases, frameworks or UI.

```text
entities ← use cases ← adapters ← frameworks (dependencies inward only)
```

Use cases orchestrate entities toward user goals; presenters and gateways translate across the adapter boundary (DTOs in, domain out); frameworks plug into ports, replaceable without touching logic. Testability follows structurally: inner rings test without infrastructure.

The classic mistakes:

- Rings as paperwork. Drawing circles while imports point outward anyway (framework types in entities, SQL in use cases) performs architecture without providing it. Enforce with dependency rules (linters, module boundaries).
- Anemic centre. Entities as data bags with logic stranded in use cases (or services) hollows the model. Behaviour lives with the data it constrains.
- Adapter logic leakage. Business decisions encoded in presenters/controllers ("if premium, discount") bypass the tested core. Adapters translate; use cases decide.
- Over-abstraction for CRUD. Full clean architecture on simple forms-and-tables apps adds layers without decisions to protect. Match ceremony to complexity (see [modular monolith](/t/modular-monolith)).
- DTO explosion. Mapping layers multiplying types (entity/DTO/viewmodel × N) bury intent in translation code. Map at boundaries only; share where safe.
- Framework contempt. Treating frameworks as unclean delays leveraging their strengths (migrations, admin, auth). Isolate frameworks; still use them well.
- Big-bang adoption. Rewriting to circles halts feature work for quarters. Carve new code cleanly; migrate hot spots incrementally (see [strangler fig](/t/strangler-fig)).

**When to adopt:** complex domains with long lifetimes and changing infrastructure — where protecting business logic pays across years. Simpler shapes serve simpler problems.
