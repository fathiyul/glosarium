---
title: "Saga Pattern"
summary: "A chain of local transactions with compensating actions instead of a distributed transaction."
levels: { backend: senior, data-engineer: senior }
aliases: ["saga", "sagas", "distributed saga", "saga orchestration", "compensating transactions saga"]
prereqs: ["transaction", "event-driven-architecture"]
related: ["compensating-transaction", "choreography-vs-orchestration", "transactional-outbox", "eventual-consistency", "distributed-transaction", "two-phase-commit"]
core: [backend]
also: [messaging]
---

In a monolith with one database, "place an order" is a **single transaction**: reserve stock, charge the card, create the shipment, all-or-nothing. When these steps live in **different services with their own databases**, there's **no shared transaction**, and distributed transactions (two-phase commit) are slow, fragile and often unsupported ([two-phase commit](/t/two-phase-commit), [distributed transactions](/t/distributed-transaction)).

A **saga** replaces it with a **sequence of local transactions**, each in one service, where **each step has a compensating action** that undoes its effect if a later step fails.

```
1. Orders:     create order (PENDING)                       compensate: cancel order
2. Inventory:  reserve stock                                compensate: release stock
3. Payments:   charge card                                  compensate: refund
4. Shipping:   schedule shipment                            compensate: cancel shipment
5. Orders:     mark order CONFIRMED

If step 3 fails → run compensations in reverse: release stock → cancel order.
```

([compensating transactions](/t/compensating-transaction)). The system is **eventually consistent**: partial progress is visible while the saga runs ([eventual consistency](/t/eventual-consistency)).

## Two ways to coordinate

- **Choreography**: each service reacts to events and emits the next ("StockReserved" triggers payment). No central brain. Simple for small flows, but the overall logic is scattered and hard to follow as it grows.
- **Orchestration**: a central **orchestrator** (a state machine or workflow engine) tells each service what to do and handles failures. Clearer and easier to monitor for complex flows, but adds a coordinator ([choreography vs orchestration](/t/choreography-vs-orchestration)).

## What you must handle

- **Compensations aren't perfect rollbacks.** Some actions can't be undone (an email sent, a package shipped). Compensation is a **business-level** reversal ("refund") and might not exactly restore the previous state.
- **No isolation.** Other transactions can see intermediate states (an order that's PENDING, stock that's temporarily reserved). Design with that in mind: use statuses, and "semantic locks" such as a `PENDING` flag that other operations respect.
- **Idempotency.** Steps and compensations may be retried or delivered twice, so each must be idempotent ([idempotent consumers](/t/idempotent-consumer)).
- **Reliable messaging**: publish events and update the database atomically ([transactional outbox](/t/transactional-outbox)).
- **Failure of compensations**: they can fail too, so they need retries and, ultimately, a human fallback (a stuck-saga alert).
- **Timeouts and long-running steps**: define what happens if a step never answers.
- **Observability**: track each saga's state and history, and correlate with an ID ([correlation ID](/t/correlation-id)).
- **Ordering and concurrency**: two sagas touching the same entity can interleave.

## When to use it

For **business processes spanning services** that need consistency without distributed transactions. Prefer to avoid needing one: if two things must be atomic, consider putting them in the same service or database ([database per service](/t/database-per-service), [microservices](/t/microservices)).
