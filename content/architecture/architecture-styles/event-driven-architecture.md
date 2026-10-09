---
title: "Event-Driven Architecture"
summary: "Services communicating by publishing and reacting to events."
levels: { backend: senior, frontend: senior, data-engineer: senior }
aliases: ["EDA", "event-driven", "event driven architecture", "event-based architecture", "publish-subscribe architecture"]
prereqs: ["message-queue", "microservices"]
related: ["event-bus", "event-vs-command", "choreography-vs-orchestration", "kafka", "saga-pattern", "transactional-outbox", "eventual-consistency"]
core: [backend]
---

In an **event-driven architecture**, components communicate by **publishing events** ("order placed", "payment received") and **reacting to events** they care about, instead of calling each other directly. The publisher doesn't know, or care, who listens.

```
Orders service ── publishes ──► "OrderPlaced" ─► event bus / broker ──┬─► Inventory (reserve stock)
                                                                       ├─► Billing   (create invoice)
                                                                       ├─► Email     (confirmation)
                                                                       └─► Analytics (record sale)
```

An **event** is a **fact about something that happened** (past tense, immutable). A **command** is a request for something to happen ("ReserveStock"). Keeping the two distinct matters ([event vs command](/t/event-vs-command)).

## What you gain

- **Loose coupling**: add a new consumer (fraud checks) without changing the publisher.
- **Resilience and smoothing**: a slow or down consumer doesn't block the producer, and queues absorb spikes.
- **Scalability**: consumers scale independently.
- **Extensibility and audit**: events form a record of what happened, and can feed analytics, search indexes and other views.
- **Natural fit for asynchronous, real-time flows.**

## What it costs

- **Eventual consistency.** Other services learn about changes after a delay, and you must design UIs and logic for it ([eventual consistency](/t/eventual-consistency)).
- **Harder to understand and debug.** The flow is spread across services and time. Tracing with correlation IDs and distributed tracing is essential ([correlation ID](/t/correlation-id), [distributed tracing](/t/distributed-tracing)).
- **Delivery semantics**: at-least-once means duplicates, so consumers must be idempotent, and ordering isn't guaranteed globally ([idempotent consumers](/t/idempotent-consumer)).
- **Publishing reliably** needs care ([transactional outbox](/t/transactional-outbox)).
- **Event schema evolution**: events are a public contract between teams ([schema evolution](/t/schema-evolution), [event schema versioning](/t/event-schema-versioning)).
- **Hidden coupling**: services depend on events' content and meaning, even without direct calls.
- **Operational overhead** of brokers.

## Common patterns

- **Event notification**: a small event says "something changed", and consumers fetch details if needed.
- **Event-carried state transfer**: the event includes the data, so consumers keep a local copy and avoid calling back.
- **Event sourcing**: the sequence of events *is* the system's state, and current state is derived by replaying them.
- **Choreography vs orchestration**: services react to each other's events on their own, or a central coordinator directs the steps ([choreography vs orchestration](/t/choreography-vs-orchestration), [sagas](/t/saga-pattern)).

## When to use it

For integrating services that don't need an immediate answer, for fan-out to many consumers, and for decoupling domains. **Not** for everything: a request that needs a result now is usually a plain synchronous call. Don't turn a simple application into a distributed event maze, and start with a few clear events and good observability ([monolith vs microservices](/t/monolith-vs-microservices)).
