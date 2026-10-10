---
title: "Distributed Transaction"
summary: "A transaction that spans several databases or services."
levels: { backend: senior, data-engineer: senior }
aliases: ["distributed transaction", "distributed transactions", "cross-service transaction"]
prereqs: ["transaction", "idempotence"]
related: ["two-phase-commit", "saga-pattern", "message-broker", "inbox-pattern"]
---

A **distributed transaction** spans multiple databases or services and needs to be atomic across all of them — charge the payment *and* create the order *and* update inventory, all or none. It's hard because the clean ACID guarantees of a single database don't extend across independent systems.

Two broad approaches:

- Two-phase commit (2PC) — a coordinator makes all participants prepare, then commit together. Gives atomicity across systems, but is slow, blocking, and fragile if the coordinator fails (see [two-phase commit](/t/two-phase-commit)).
- Sagas — break the work into local transactions, each publishing an event for the next; if a step fails, run compensating actions to undo prior steps. More available and scalable, but you get eventual consistency, not atomicity, and must design compensations.

```text
2PC:    prepare all → commit all   (atomic, blocking)
saga:   step1 → step2 → step3 ...  (each committed; on failure, compensate)
```

The classic mistakes:

- Assuming a single ACID transaction across services. It doesn't exist natively; pretending it does leads to lost or duplicated work when a step fails midway.
- Ignoring partial failure. The hard case is when step 2 fails after step 1 committed. Without compensation (saga) or coordination (2PC), you're left inconsistent.
- Compensations that aren't idempotent. Retries and replays are normal; every step and compensation must be safe to run more than once (see [idempotence](/t/idempotence)).
- Using 2PC casually. Its blocking nature and coordinator-failure risk make it a poor fit for high-throughput or highly-available systems. It's used where strict atomicity is worth the cost.
- Forgetting that ordering and delivery aren't guaranteed. Sagas run on messages that can be delayed, duplicated or reordered; design steps to tolerate that (see [message ordering](/t/message-ordering)).
- No recovery path. A saga stuck halfway needs a way to retry or compensate — the [outbox](/t/inbox-pattern) and reliable queues exist for exactly this.

**How to choose:** prefer a saga with compensations and idempotent steps for most cross-service workflows — it's the scalable, available default. Use 2PC only when you genuinely need atomicity across systems and can accept its cost. Often the better answer is to avoid distributed transactions by keeping related data in one service's database and coordinating with reliable events. See [saga](/t/saga-pattern).
