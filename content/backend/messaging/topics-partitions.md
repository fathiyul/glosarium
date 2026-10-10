---
title: "Topics and Partitions"
summary: "How Kafka-style logs split and order messages."
levels: { backend: senior, data-engineer: mid-level }
aliases: ["topics and partitions", "partitions", "topic partitions"]
prereqs: ["event-streaming", "consumer-group"]
related: ["consumer-offset", "kafka", "message-ordering", "partitioning"]
---

In a streaming platform, a **topic** is the named stream of events, and it's split into **partitions** — independent, ordered logs. Partitions are the unit of parallelism and ordering: a topic's events are distributed across partitions (often by a **key**, so the same key always lands in the same partition), and order is guaranteed **within a partition**, not across the topic.

```text
topic "orders" → partition 0: [o1, o4, o7]   (ordered)
                 partition 1: [o2, o5, o8]   (ordered)
                 partition 2: [o3, o6, o9]   (ordered)
(no global order across partitions)
```

Why partitions exist: they let a topic scale. Multiple consumers in a [consumer group](/t/consumer-group) each take some partitions, so processing parallelises. Keying by entity (e.g. `orderId` or `userId`) keeps that entity's events in order while spreading different entities across partitions.

The classic mistakes:

- Expecting global ordering. Events in different partitions have no relative order; only per-partition order is guaranteed. If order matters across a group of events, key them to the same partition (see [message ordering](/t/message-ordering)).
- Too few partitions. Parallelism is capped by partition count — a consumer group can have at most one active consumer per partition. Too few partitions limits throughput. (Too many adds overhead; size deliberately.)
- A key that creates skew. If most events share one key (a hot entity), they all go to one partition — a hot partition while others idle. Choose keys for balance and ordering.
- Changing the partition count casually. Repartitioning changes key→partition mapping; existing keys can move, breaking order assumptions and requiring care.
- Forgetting per-partition offsets. Each consumer tracks offsets per partition (see [consumer offset](/t/consumer-offset)); lag and progress are per-partition, so a stuck partition hides in aggregates.
- Assuming a partition is a queue. A partition is an ordered log; a consumer group shares partitions among members, but the log itself is retained and replayable.

How to design: choose a partition count for the throughput and consumer parallelism you need; choose a key that preserves the ordering you require without concentrating load; and remember that "ordered" means per-partition. It's the structure that makes streaming both scalable and orderly where it matters — the streaming counterpart to [consistent hashing](/t/consistent-hashing) and [partitioning](/t/partitioning).
