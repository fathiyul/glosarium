---
title: "Enterprise Integration Patterns"
summary: "A catalog of messaging patterns: routers, translators, aggregators."
levels: { backend: staff, data-engineer: staff }
aliases: ["enterprise integration patterns", "EIP", "integration patterns"]
prereqs: ["message-broker", "event-driven-architecture"]
related: ["message-broker", "event-bus", "event-vs-command"]
---
**Enterprise Integration Patterns (EIP)** — Hohpe and Woolf's catalogue — names the recurring solutions for connecting systems: message channels, routing (content-based router, splitter, aggregator, resequence), transformation (translators, envelopes), endpoints (polling/even-driven consumers, idempotent receivers), and system management (control bus, wire tap, dead letter channel).

```text
order → [channel] → router (by region) → translator (to shipper format)
→ aggregator (per truck) → shipper endpoint (idempotent, retried)
```

The catalogue's value isn't the inventory — it's the vocabulary: teams describing integrations as "content-based router into a dead-letter-backed endpoint" share precise meaning instead of bespoke diagrams. Modern implementations (Camel, Spring Integration, cloud pipes) embody the patterns; the thinking transfers everywhere messages flow.

The classic mistakes:

- Reinventing named patterns badly. Hand-rolled "sort of aggregator" with lost messages and no timeouts relearns documented lessons expensively. Learn the catalogue before improvising.
- Pattern maximalism. Every integration sporting routers, translators and buses "for completeness" over-engineers simple point-to-point needs. Apply what the complexity earns.
- Ignoring the management patterns. Channels without monitoring (wire tap), control (control bus) and poison handling (dead letter) operate blind. Management patterns aren't optional extras.
- Canonical model overreach. Enterprise-wide canonical data models ossify into change bottlenecks; bounded canonical models per domain integrate better.
- Request-reply over async. Forcing synchronous semantics onto messaging patterns adds correlation machinery for needs better served synchronously. Match pattern to synchrony honestly.
- Version-blind endpoints. Pattern implementations evolving message formats without versioning break counterparties silently. Version channels like APIs.
- Framework lock-in. EIP frameworks embedding routing logic in proprietary DSLs complicate migration; keep routing decisions visible and portable where longevity matters.

**How to use them:** learn the vocabulary, recognise the shapes in your integrations, reach for proven implementations over bespoke plumbing. Integration problems are old; their named solutions save relearning.
