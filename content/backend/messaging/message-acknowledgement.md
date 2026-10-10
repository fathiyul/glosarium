---
title: "Acknowledgement (ack and nack)"
summary: "A consumer confirming a message was processed, or asking for it to be redelivered."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["acknowledgement", "ack", "nack"]
prereqs: ["message-queue", "producer-consumer"]
related: ["message-broker", "at-least-once", "dead-letter-queue", "visibility-timeout"]
---

An **acknowledgement** is a consumer's signal to the broker that it has finished with a message. **Ack** means "handled, remove it"; **nack** (negative ack) means "I couldn't handle it, redeliver or route it elsewhere". It's the mechanism that makes message processing reliable: without acks, a broker can't tell a completed message from one whose consumer crashed.

```text
consumer receives message → processes → ack (done) | nack (failed → retry/DLQ)
crash before ack → broker redelivers later
```

The key design decision is *when* to ack. Acking **after** processing gives at-least-once delivery: if the consumer crashes mid-process, the message is redelivered and processed again — so handlers must be idempotent. Acking before processing risks losing the message if the consumer then crashes.

The classic mistakes:

- Acking before processing. The message is gone; if the work then fails, it's lost forever. Ack after the work is done or durably recorded.
- Forgetting idempotency. At-least-once delivery (the usual guarantee) means duplicates happen on retries; a non-idempotent handler double-charges or double-sends. Make handlers safe to run twice (see [idempotence](/t/idempotence)).
- Never acking on failure. A message stuck "in flight" forever blocks or is redelivered endlessly. Use nack to trigger retry or send it to a [dead-letter queue](/t/dead-letter-queue).
- Infinite retries on a poison message. A message that always fails will loop forever; bound retries and dead-letter it (see [poison message](/t/poison-message)).
- Ack timeout mismatches. If processing takes longer than the broker's visibility/ack timeout, the message can be redelivered while still being processed — processing it twice concurrently. Set timeouts above worst-case processing time.
- Batching acks carelessly. Acking a batch after processing all is efficient, but a crash mid-batch redelivers the whole batch — fine if idempotent.

How to use it: ack only after the work is done (or durably queued); make handlers idempotent; nack failures for retry with a bounded count, then dead-letter; and set ack/visibility timeouts longer than processing. Ack semantics are the foundation of reliable messaging — get them right and the queue protects you; get them wrong and you lose or duplicate work. See [at-least-once](/t/at-least-once).
