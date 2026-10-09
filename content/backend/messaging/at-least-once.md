---
title: "At-Least-Once Delivery"
summary: "Messages may arrive more than once, so consumers must be idempotent."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["at least once delivery", "at-least-once semantics", "duplicate delivery", "delivery guarantee"]
prereqs: ["message-queue", "message-acknowledgement"]
related: ["delivery-guarantees", "exactly-once", "idempotent-consumer", "message-acknowledgement", "dead-letter-queue", "visibility-timeout"]
core: [backend]
---

**At-least-once delivery** means the messaging system guarantees every message is delivered **one or more times**. Nothing is lost, but **duplicates can happen**. It's the default for most queues and brokers, and a fact of life in distributed systems.

## Why duplicates happen

The broker can't know whether a consumer finished processing, only whether it **acknowledged**. If something goes wrong between "did the work" and "acknowledged", the broker sends the message again ([acknowledgement](/t/message-acknowledgement)):

```
consumer receives message ─► processes it (charges the card) ─► crashes before sending ack
broker: no ack → redelivers ─► the card is charged again
```

Other causes: a processing time longer than the [visibility timeout](/t/visibility-timeout), network failures, rebalancing in a consumer group, a producer retrying a send.

## The three guarantees

| Guarantee | Meaning | The catch |
|---|---|---|
| **At-most-once** | Delivered 0 or 1 times: no retries | Messages can be **lost** |
| **At-least-once** | Delivered 1 or more times | Messages can be **duplicated** |
| **Exactly-once** | Processed once | Hard and conditional: usually "at-least-once delivery plus idempotent processing" ([exactly-once](/t/exactly-once)) |

For most business systems, losing messages is unacceptable, so at-least-once is chosen, and **duplicates are handled by the consumer**.

## The consequence: make consumers idempotent

If handling the same message twice has the same effect as once, duplicates are harmless ([idempotent consumers](/t/idempotent-consumer)):

```python
def handle_order_paid(msg):
    if db.already_processed(msg.id):             # remember processed message IDs
        return
    with db.transaction():
        mark_order_paid(msg.order_id)
        db.record_processed(msg.id)              # in the same transaction as the work
```

Techniques:

- **A unique message ID** and a table of processed IDs.
- **Natural idempotence**: "set status to paid" can be repeated, unlike "add 100 to the balance".
- **Unique constraints** that reject the duplicate effect.
- **Idempotency keys** for calls to external APIs ([idempotency key](/t/idempotency-key)).

## Also design for

- **Poison messages** that fail every time ([poison messages](/t/poison-message), [dead letter queue](/t/dead-letter-queue)).
- **Ordering**: redelivery can reorder messages.
- Choosing when to acknowledge: **after** the work is done, not before, or a crash loses the message.

See [delivery guarantees](/t/delivery-guarantees) for the whole picture.
