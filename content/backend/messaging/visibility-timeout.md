---
title: "Visibility Timeout"
summary: "How long a received message stays hidden before it's delivered again."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["visibility timeout", "message visibility", "in-flight timeout"]
prereqs: ["message-queue", "message-acknowledgement"]
related: ["at-least-once", "poison-message", "message-acknowledgement"]
---

A **visibility timeout** is the period after a consumer receives a message during which it's **hidden** from other consumers. If the consumer acknowledges the message within the window, it's deleted; if the window expires first (because the consumer crashed or is too slow), the message becomes visible again and another consumer can take it.

```text
consume message → hidden for N seconds → ack? delete : reappear for redelivery
```

It's the queue's mechanism for recovering from failed consumers: a message that was handed out but never completed comes back. It's central to how at-least-once delivery works on queues that don't track per-consumer state.

The classic mistakes:

- Timeout shorter than processing time. A slow job exceeds the window, the message reappears, and **another consumer processes it while the first is still working** — duplicate processing, often concurrently. Make handlers idempotent (see [idempotence](/t/idempotence)) and set the timeout above worst-case time.
- Timeout too long. A crashed consumer's message stays hidden for the full window, delaying recovery. Balance: long enough for real work, short enough to retry promptly.
- Processing that can't extend the timeout. For long jobs, some queues let a worker "heartbeat"/extend the visibility while working; without it, long jobs are redelivered and duplicated. Use the extension mechanism if available.
- Assuming exactly-once because it's hidden. Hiding prevents *concurrent* delivery during the window but doesn't guarantee single processing — a timeout after partial work means a duplicate. Assume at-least-once.
- No dead-lettering after repeated timeouts. A message that always times out (a poison message) keeps reappearing; after a bounded number of attempts, send it to a [dead-letter queue](/t/dead-letter-queue).
- Forgetting the poison-message case. Poison messages may fail or time out forever; the timeout alone won't clear them (see [poison message](/t/poison-message)).

**How to set it:** pick a timeout comfortably above the p99 processing time (plus margin), make consumers idempotent, extend the visibility for genuinely long jobs if the broker allows, and dead-letter after a bounded retry count. It's the queue's safety net for lost consumers — tuned wrong, it creates duplicates or slow recovery. See [acknowledgement](/t/message-acknowledgement).
