---
title: "Event Bus"
summary: "A channel through which events reach their subscribers."
levels: { backend: senior, frontend: senior, data-engineer: senior }
aliases: ["event bus", "event backbone", "central event log"]
prereqs: ["event-driven-architecture", "message-broker"]
related: ["event-driven-architecture", "message-broker", "event-schema-versioning"]
---
An **event bus** is shared infrastructure carrying every domain's events: one backbone (often partitioned topics on Kafka-class systems) where services publish facts and subscribe to what they need. Done well it's organisational decoupling made concrete — teams integrate through events without pairwise coordination.

```text
orders → bus: OrderPlaced → inventory, billing, analytics, fraud (each independent)
```

The bus provides transport, retention and ordering-per-key; governance (schemas, naming, ownership, access) decides whether it stays coherent or decays into an unmaintainable swamp of mystery topics. Technology is the easy half; ownership is the discipline.

The classic mistakes:

- No ownership per topic. Orphan topics (unknown producers, unknown schemas, unknown consumers) accumulate until nobody dares touch the bus. Every topic owned, schema-registered, documented.
- God topics. One `events` topic for everything destroys ordering, retention and access granularity. Topic per domain event family, partitioned by entity key.
- Sensitive data broadcast. PII/credentials on broadly-subscribed topics leak to every consumer (present and future). Minimise payloads; encrypt or tokenise sensitive fields.
- No retention policy. Infinite retention bankrupts storage; zero retention strands new consumers. Tier by domain need (days for commandish, longer for facts).
- Ordering assumed globally. Per-partition order only; cross-entity causality needs design (causal metadata), not hope.
- Bus as RPC. Request-reply patterns over events add latency and coupling events were meant to remove. Events notify; synchronous needs stay synchronous.
- Missing dead-lettering. Poison events blocking partitions stall entire domains. Dead-letter, alert, and replay deliberately.

**How to run it:** partitioned topics per domain family, schema-governed, owned, retained deliberately, poison-handled. The bus is commons — governed like one, or tragedy follows.
