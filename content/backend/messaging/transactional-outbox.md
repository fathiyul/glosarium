---
title: "Transactional Outbox"
summary: "Saving events in the same database transaction, then publishing them reliably."
levels: { backend: senior, data-engineer: senior }
aliases: ["outbox pattern", "outbox table", "transactional outbox pattern", "dual write problem", "reliable event publishing"]
prereqs: ["transaction", "message-queue"]
related: ["change-data-capture", "inbox-pattern", "idempotent-consumer", "event-driven-architecture", "at-least-once", "saga-pattern"]
core: [backend]
also: [distributed-systems]
---

A service often needs to **change its database and publish an event** ("order created") as a result. Doing both is a **dual-write problem**: two systems, with no shared transaction.

```python
db.insert_order(order)          # 1. commit to the database
broker.publish("order_created") # 2. publish... but the process crashes here → the event is lost
```

Reverse the order, and you can publish an event for an order that then fails to save. Either way, the database and the rest of the system disagree, and retries don't fix a crash between the two steps.

## The pattern

Write the event into an **outbox table in the same database transaction** as the business change. A separate **relay** process then reads the outbox and publishes to the broker.

```sql
BEGIN;
INSERT INTO orders (id, customer_id, total_cents) VALUES (917, 42, 5000);
INSERT INTO outbox (id, aggregate_id, type, payload, created_at)
VALUES (gen_random_uuid(), 917, 'order_created', '{"order_id":917,"total_cents":5000}', now());
COMMIT;                            -- both rows commit together, or neither does
```

```
service ──(one transaction)──► orders table + outbox table
                                      │
                       relay (poller or CDC) reads new outbox rows
                                      ▼
                               message broker ──► consumers
```

Because the event is saved atomically with the state change, **an event exists if and only if the change was committed**.

## The relay

- **Polling**: a worker queries unpublished rows (`WHERE published_at IS NULL ORDER BY id`), publishes them and marks them published. Simple, with some latency.
- **Change data capture**: tail the database log and publish outbox inserts directly ([change data capture](/t/change-data-capture)). Lower latency and no polling load. Tools such as Debezium support an outbox mode.

## Guarantees and consequences

- **At-least-once delivery.** The relay may publish a row and crash before marking it, so it republishes. **Consumers must be idempotent** ([idempotent consumer](/t/idempotent-consumer)), typically by deduplicating on the event ID ([inbox pattern](/t/inbox-pattern)).
- **Ordering**: events from one aggregate can be kept in order by processing the outbox in insertion order and keying messages by aggregate ID. Global ordering isn't guaranteed.
- **Latency**: events appear after commit plus relay delay (milliseconds to seconds).

## Operational notes

- **Clean up** published rows (delete or archive), or the table grows forever.
- **Monitor the backlog**: unpublished rows and their age. A stuck relay is silent data loss waiting to happen.
- **Keep the payload stable and versioned** ([schema evolution](/t/schema-evolution)). The outbox is a public contract.
- **Scale the relay carefully**: several relay instances can reorder or duplicate. Partition work or use locking (`FOR UPDATE SKIP LOCKED`).
- Don't expose your internal table structure as the event. Publish **deliberate domain events**.

It's a core building block of [event-driven systems](/t/event-driven-architecture) and sagas ([sagas](/t/saga-pattern)): reliable messaging without distributed transactions.
