---
title: "Event"
summary: "A record that something happened."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
also: [messaging]
aliases: ["event", "domain event", "integration event"]
prereqs: ["event-driven-architecture", "message-queue"]
related: ["domain-event", "event-vs-command", "event-schema-versioning"]
---
In integration, an **Event** is a immutable record that something happened: `OrderPlaced {orderId, items, at}` — past tense, broadcast to whoever cares, carrying the facts (not instructions). Producers emit without knowing consumers; consumers react independently. Time, ordering and schema discipline make events trustworthy; without them, event-driven systems decay into rumor networks.

```text
OrderPlaced → inventory reserves, email sends, analytics records (each independent)
```

Good events are self-contained (consumers act without querying back), versioned (schemas evolve compatibly), ordered where causality matters (per-entity sequencing), and retained (replayable for new consumers and recovery).

The classic mistakes:

- Commands disguised as events. `ProcessPayment NOW` (imperative, one recipient) dressed as an event couples producer intent to consumer action. Events state facts; commands request actions (see [event vs command](/t/event-vs-command)).
- Anemic events (ids only). `OrderChanged {id: 42}` forces every consumer to query back — reintroducing coupling and thundering reads. Carry the facts consumers need.
- No schema versioning. Unversioned JSON evolving silently breaks consumers on every producer deploy. Version, compatibly evolve, register schemas.
- Assuming global order. Cross-entity ordering doesn't exist in distributed logs; per-key order plus causal design covers real needs. Don't promise what physics forbids.
- No retention/replay. Ephemeral events strand new consumers (no history) and break recovery. Retain windows that cover onboarding and repair.
- God events. Kitchen-sink payloads coupling every consumer to everything. Right-size: domain-meaningful facts, lean fields.
- Events as the only integration. Queries still need synchronous answers sometimes; events complement request/response, they don't replace it.

**How to design them:** past-tense facts, self-contained, versioned, retained, ordered per entity. Events are the nervous system — keep the signals clean and every organ works.
