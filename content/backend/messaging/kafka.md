---
title: "Apache Kafka"
summary: "A distributed, durable log for high-volume event streaming."
levels: { backend: senior, data-engineer: mid-level }
aliases: ["Apache Kafka", "Kafka topics", "Kafka streaming", "event streaming platform"]
prereqs: ["message-queue", "topics-partitions"]
related: ["topics-partitions", "consumer-group", "consumer-offset", "event-streaming", "stream-processing", "message-ordering"]
also: [integration, streaming-data]
core: [data-engineer]
---

**Apache Kafka** is a distributed platform for handling streams of events. Where a traditional [message queue](/t/message-queue) delivers each message to a consumer and then deletes it, Kafka is a **durable, append-only log**: events are written to disk, kept for a configured time (or forever), and **many different consumers can read them
independently, at their own pace, and replay them**.

```
Producers ─► topic "orders" ─────────────────────────────────────────►
              partition 0: [e0][e1][e2][e3] ...
              partition 1: [e0][e1][e2] ...
              partition 2: [e0][e1] ...
                                   ▲ consumer A is at offset 2 ▲ consumer B is at offset 0
```

## The core concepts

- **Topic**: a named stream of events (`orders`, `page-views`).
- **Partition**: a topic is split into partitions for scale. Order is guaranteed **within** a partition, not across the whole topic ([topics and partitions](/t/topics-partitions), [message ordering](/t/message-ordering)).
- **Key**: events with the same key go to the same partition, so everything for one customer stays in order.
- **Offset**: each event's position in its partition. Consumers track how far they've read, and can rewind ([consumer offsets](/t/consumer-offset)).
- **Consumer group**: consumers sharing the work of a topic. Each partition is read by one member of the group, so you scale by adding consumers (up to the number of partitions) ([consumer groups](/t/consumer-group)).
- **Brokers and replication**: the cluster stores partitions across servers, with replicas for fault tolerance.

## What it's used for

- **Event streaming between services** (decoupled, durable).
- **Data pipelines**: moving data into warehouses and lakes, change data capture ([event streaming](/t/event-streaming)).
- **Real-time processing and analytics** ([stream processing](/t/stream-processing)).
- **Event sourcing and audit logs**, since the log is replayable.
- **High-throughput ingestion** of logs, metrics and clickstreams.

## Things to know

- **At-least-once delivery is the common default**: consumers may see duplicates, so they must be idempotent ([at-least-once](/t/at-least-once), [idempotent consumer](/t/idempotent-consumer)). Stronger guarantees exist but with conditions ([exactly-once](/t/exactly-once)).
- **Choose keys and partition counts carefully.** A poor key creates hot partitions, and the partition count is hard to change later.
- **Consumers commit offsets.** When they commit relative to processing decides whether you can lose or repeat messages.
- **Retention** is a storage-and-replay trade-off.
- **It's operationally heavy**: clusters need care (managed services take that on). Don't use it where a simple queue would do ([message brokers](/t/message-broker)).
