---
title: "Exactly-Once Semantics"
summary: "The hard, often misunderstood guarantee of processing each message once."
levels: { backend: senior, data-engineer: senior }
aliases: ["exactly-once semantics", "EOS", "exactly once delivery", "effectively-once", "exactly-once processing"]
prereqs: ["at-least-once", "idempotent-consumer"]
related: ["at-least-once", "delivery-guarantees", "idempotent-consumer", "transactional-outbox", "kafka", "two-generals-problem"]
core: [data-engineer]
---

"**Exactly-once**" promises that each message is processed **once**: no losses and no duplicates. It's the guarantee everyone wants, and the most misunderstood, because **true exactly-once delivery over an unreliable network isn't achievable** in the general case. What systems offer is **exactly-once *processing* (or effects)** under specific conditions, built from simpler pieces.

## Why it's fundamentally hard

A sender transmits a message and never gets an acknowledgement. Did the receiver get it? There's no way to know ([two generals problem](/t/two-generals-problem)). So the sender must choose:

- **Don't retry** → the message might be lost (**at-most-once**).
- **Retry** → the message might arrive twice (**at-least-once**).

You can't avoid both with delivery alone ([delivery guarantees](/t/delivery-guarantees)).

## How "exactly-once" is actually built

**At-least-once delivery + idempotent processing = effectively once.** Retries guarantee nothing is lost, and the consumer's idempotence makes duplicates harmless:

```python
with db.transaction():
    if already_processed(msg.id):        # dedupe by message ID
        return
    apply_effect(msg)                    # the business change
    record_processed(msg.id)             # same transaction: all or nothing
```

See [idempotent consumers](/t/idempotent-consumer).

**Transactional processing within one system.** Some platforms provide exactly-once **within their boundaries**. For example, Kafka offers idempotent producers and transactions, so a "read from topic A, process, write to topic B, commit the offset" cycle can be made atomic. Stream processors use checkpointing and replay to give exactly-once state updates ([Kafka](/t/kafka), [stream processing](/t/stream-processing)).

**Atomic commit of state and progress.** Store the consumer's position (offset) and the results in the **same transaction**, so they succeed or fail together.

## Where the guarantee stops

- **External side effects**: sending an email, calling a payment API or hitting a third-party webhook aren't covered by the engine's transaction. Make those idempotent with **idempotency keys**, or accept possible duplicates ([idempotency key](/t/idempotency-key)).
- **Across system boundaries**: the guarantee applies to the data flow *inside* the platform. End to end, you still need idempotent sinks.
- **Publishing from a database**: committing a row and sending a message are two separate actions ([transactional outbox](/t/transactional-outbox)).

## Practical stance

- Treat **at-least-once + idempotent consumers** as the default design.
- Be **skeptical of marketing claims.** Ask: exactly-once for what, within which boundary, and under what failure assumptions?
- Understand the cost. Transactions and deduplication add latency and complexity.
- Design operations to be **naturally idempotent** wherever possible, so you rarely need the heavy machinery.
- Test with failures: kill consumers mid-processing, duplicate messages, and replay.

The honest summary: you can build systems where the **effect** happens once, but you build it, with idempotency, at the edges.
