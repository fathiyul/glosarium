---
title: "Domain Event"
summary: "A record that something meaningful happened in the domain."
levels: { backend: senior }
aliases: ["domain event", "domain events", "business event"]
prereqs: ["ubiquitous-language", "aggregate-root"]
related: ["event", "event-sourcing", "aggregate-root"]
---
A **Domain Event** records something meaningful that happened in the domain, named in ubiquitous language: `OrderPlaced`, `PaymentFailed`, `SubscriptionLapsed` — past tense, immutable, carrying what happened (not instructions). Aggregates emit them as state changes occur; other aggregates, contexts and read models react.

```text
Order.ship() → emits Shipped {orderId, at, carrier} → billing, notify, analytics react
```

Domain events decouple within the model (reactions without direct calls), bridge bounded contexts (published dialect translated downstream), and feed event sourcing (events as the persistence truth). Naming them well — business-meaningful, past-tense, precise — is modelling work, not ceremony.

The classic mistakes:

- Technical naming. `OrderUpdated`/`RecordChanged` say nothing domain-meaningful; consumers can't distinguish semantics. Name the business occurrence precisely (`Shipped`, `Cancelled`, `Refunded`).
- Commands disguised. Events instructing ("ProcessRefund") couple producer intent to consumer action. Events state facts; separate commands request work.
- Missing events. State changing silently (direct writes, bulk updates) blinds reactive flows. Emitting is part of the state change, not optional telemetry.
- Anemic payloads. Id-only events forcing consumers to query back reintroduce coupling and load. Carry the facts reactors need (within size and privacy bounds).
- Ordering assumed. Concurrent aggregates emit concurrently; consumers must tolerate reordering (idempotence, versioning, causal metadata). Order per stream, design for the rest.
- Events as integration afterthought. Internal-only events that later must cross contexts carry wrong granularity and naming. Design publishable events from the start where contexts will need them.
- Unversioned evolution. Renamed/restructured events breaking downstream silently. Version like any contract; evolve compatibly.

**How to model them:** past-tense business facts, emitted by aggregates, named from the language, versioned like contracts. Events make the domain's history explicit — and its future extensible.
