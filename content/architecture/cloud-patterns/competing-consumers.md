---
title: "Competing Consumers"
summary: "Several workers pulling from one queue to share the load."
levels: { backend: mid-level }
also: [messaging]
aliases: ["competing consumers", "competing consumer pattern", "parallel consumers"]
prereqs: ["message-queue", "producer-consumer"]
related: ["message-queue", "queue-based-load-leveling", "priority-queue-pattern"]
---
**Competing consumers** scale message processing horizontally: multiple instances pull from the same queue, each message handled by exactly one — throughput rising with consumer count, no coordination beyond the broker's delivery. The pattern behind worker fleets, order processors and notification senders everywhere.

```text
[queue] → worker A, worker B, worker C (each message → exactly one)
scale: add workers until the bottleneck moves elsewhere
```

Ordering, duplicates and poison messages are the design surface: competing consumers process concurrently (order only per-partition where supported), redeliver on failure (idempotence required), and need dead-lettering plus autoscaling driven by queue depth.

The classic mistakes:

- Assuming order. Concurrent consumers process out of order by nature; order-dependent work needs partitioning (key-affine consumers) or single-consumer queues.
- Non-idempotent handlers. Redelivery plus competing retries double-process; every handler idempotent, tested with duplicates.
- Scaling workers past downstream. Ten consumers hammering one database connection pool just move the queue into the database. Scale to the bottleneck, not past it.
- Poison-message stalls. One toxic message redelivered forever occupies consumers and delays everything behind it (on ordered queues, blocks entirely). Dead-letter after bounded attempts.
- Autoscaling on CPU. Consumer CPU idles while queues grow (I/O-bound waits); scale on queue depth and age, not processor load.
- Visibility timeout mismatch. Locks expiring before slow processing finishes duplicate work across competitors. Timeouts beyond p99 processing, with heartbeats for long tasks.
- Deploying all consumers at once. Rolling restarts rebalancing partitions cause duplicate processing storms; stagger, drain, and keep handlers idempotent through transitions.

**How to run them:** idempotent handlers, dead-lettering, depth-driven autoscaling, ordering only where partitioned. Competing consumers are horizontal scale made simple — simple, not thoughtless.
