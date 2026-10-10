---
title: "Hexagonal Architecture"
summary: "Ports and adapters that isolate core logic from infrastructure."
levels: { backend: senior, frontend: senior }
aliases: ["hexagonal architecture", "ports and adapters", "ports adapters"]
prereqs: ["layered-architecture", "clean-architecture"]
related: ["clean-architecture", "onion-architecture", "seam"]
---
**Hexagonal architecture** (ports and adapters) isolates the application core behind ports (interfaces it defines: "I need persistence," "I publish events") with adapters plugging in implementations (Postgres, Kafka, REST). The core never imports infrastructure; infrastructure adapts to the core's contracts. Testability and replaceability follow structurally.

```text
core (domain + use cases) ← ports (interfaces core owns)
adapters (DB, queue, HTTP, UI) implement ports from outside
```

The inversion matters: traditional layering lets infrastructure concerns seep inward (ORM annotations on entities, HTTP types in services); hexagons forbid it — adapters translate at the boundary, and the core compiles against nothing external.

The classic mistakes:

- Ports owned by infrastructure. Interfaces shaped by frameworks (repository interfaces mirroring ORM quirks) invert the inversion. Ports express core needs in domain language.
- Leaky adapters. ORM entities, HTTP statuses or queue semantics escaping into the core defeat the boundary. Translate fully at adapters; core types stay pure.
- Port explosion. An interface per method fragments the boundary into noise. Cohesive ports (persistence, notification, clock) at sensible granularity.
- Testing only through adapters. Spinning databases to test business rules wastes the isolation ports provide. Test the core directly against in-memory fakes; test adapters separately.
- Framework-shaped cores. Entities decorated with persistence annotations, validation tied to HTTP libraries — infrastructure in domain clothing. Strip frameworks from the centre.
- Adapter logic creep. Business decisions migrating into mappers and controllers ("discount if premium") bypass tested cores. Adapters translate; cores decide.
- Hexagons for CRUD. Simple data-shuttling apps gain ceremony without decisions to protect. Apply where domain complexity justifies the boundary.

**When to adopt:** domain-rich applications with changing infrastructure — the core's longevity exceeds any adapter's. Ports protect decisions; adapters absorb change.
