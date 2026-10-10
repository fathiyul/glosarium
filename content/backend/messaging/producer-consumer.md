---
title: "Producer and Consumer"
summary: "The two sides of a queue."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["producer and consumer", "producer consumer", "producer-consumer"]
prereqs: ["message-queue", "worker"]
related: ["message-queue", "backpressure", "worker", "queue-depth"]
---

**Producer and consumer** is the pattern of decoupling the component that *creates* work from the component that *does* it, connected by a queue. The producer enqueues a message and moves on; a consumer dequeues and processes it. Neither knows much about the other.

```text
producer ──enqueue──▶ [queue] ──dequeue──▶ consumer
```

The value is loose coupling and rate-matching:

- Independent scaling — add consumers to handle more volume without touching the producer.
- Burst absorption — the queue holds a spike; consumers work through it at their own pace.
- Isolation — a slow or crashed consumer doesn't break the producer; the queue buffers.

It's the base pattern under [job queues](/t/job-queue), message brokers, and much of asynchronous architecture.

The classic mistakes:

- Unbounded queues. Without a bound, a fast producer and slow consumer grow the queue until memory or disk fills. The backlog must be visible and handled (see [queue depth](/t/queue-depth) and [backpressure](/t/backpressure)).
- No backpressure to the producer. If consumers fall behind, the producer should eventually feel it (slow down, reject, or shed) rather than pushing forever. Otherwise the queue is just deferred failure.
- Non-idempotent consumers. Messages can be redelivered; a consumer that assumes exactly-once will double-process (see [idempotence](/t/idempotence)).
- Assuming order. Unless the queue guarantees it, consumers may see messages out of order; don't rely on it (see [message ordering](/t/message-ordering)).
- No visibility. A silent growing backlog is a brewing outage. Monitor queue depth, processing rate and failures.
- One consumer for a critical queue. A single consumer is a bottleneck and a single point of failure; run several (where order allows) for scale.
- Confusing it with request/response. Producer/consumer is asynchronous; the producer doesn't wait for a reply. If you need a response, that's a different pattern (request/reply over the queue).

**How to use it:** bound the queue, add backpressure to the producer, make consumers idempotent, monitor depth, and scale consumers to the load. It's the simplest way to make a system asynchronous and resilient, and the mental model for nearly everything built on queues. See [worker](/t/worker) and [message broker](/t/message-broker).
