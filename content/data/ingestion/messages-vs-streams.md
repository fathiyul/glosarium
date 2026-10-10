---
title: "Messages vs Streams"
summary: "Transient queued messages vs a durable, replayable log of events."
levels: { data-engineer: mid-level, backend: mid-level }
aliases: ["queues vs streams", "message vs stream", "queue vs log"]
prereqs: ["message-queue", "event-streaming"]
related: ["queue-vs-topic", "consumer-offset", "competing-consumers", "topics-partitions", "event-sourcing"]
---

A message is a unit of work that a producer hands to a broker and a consumer processes once, then it is done — think a job to send an email. A stream is an ordered, durable log of events that many consumers can read, replay and re-read from any position.

The classic mistake is choosing one when you need the other:

- A team puts events in a classic [message queue](/t/message-queue) for a new analytics consumer. The consumer starts late and can only see messages produced after it joined; the history is gone. Events needed a log.
- Another team uses a log such as [Kafka](/t/kafka) for task distribution, then is surprised that adding a second consumer group processes every message twice instead of sharing the work.

## The differences that matter

| | Message | Stream |
|---|---|---|
| Lifetime | consumed and removed | retained per policy, replayable |
| Readers | one consumer per message | many independent readers |
| Ordering | often per-queue, weak | ordered within a [partition](/t/topics-partitions) |
| Position | acknowledged | tracked as a [consumer offset](/t/consumer-offset) |
| Replay | usually none | rewind and reprocess |

For backend engineers: a queue is for work distribution (see [competing consumers](/t/competing-consumers)), a log is for event distribution and [event sourcing](/t/event-sourcing). Delivery is usually **at-least-once** in both, so consumers still need to be idempotent.

For data engineers: a stream is what makes reprocessing and backfills possible. Retention decides how far back you can replay, and it costs storage.

The trade-off: logs keep data, so they need **retention** and **compaction** policies and can be expensive; queues delete on acknowledgement, which keeps them small but means no history. Many brokers blur the line — some support both a point-to-point queue and a pub/sub topic — so read the semantics of your specific tool rather than the label.
