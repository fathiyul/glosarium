---
title: "Event Streaming"
summary: "Processing a continuous flow of events."
levels: { backend: senior, data-engineer: mid-level }
aliases: ["event streaming", "streaming", "event log"]
prereqs: ["message-queue", "event-driven-architecture"]
related: ["kafka", "consumer-offset", "topics-partitions", "event-driven-architecture"]
---

**Event streaming** treats events as an append-only **log** rather than a transient queue. Producers append events to the end of a stream; consumers read at their own pace, tracking their own position, and can **replay** from any point. The log retains events for a configured period (or forever), so multiple consumers can read independently and late or new consumers can catch up from history.

```text
producer → [ event log: e1 e2 e3 e4 e5 ... ]  (append-only, retained)
consumer A reads from offset 0    (full history)
consumer B reads from offset 100  (live-ish)
```

This is different from a classic [message queue](/t/message-queue) in three important ways:

- Retention — the log keeps events; a queue typically removes a message once it's consumed.
- Multiple independent readers — every consumer group reads the whole stream, at its own offset; a queue delivers each message to one consumer.
- Replay — a consumer can rewind and reprocess, which queues don't support.

It's the model behind Kafka and similar platforms, and it fits event-driven systems, change data capture, stream processing and feeding many downstream consumers from one event source.

The classic mistakes:

- Treating it like a queue. Assuming a message disappears once read, or that one consumer's read affects another's. A log retains and lets everyone read independently.
- Ignoring retention. Events expire after the retention window; a consumer offline too long loses its place (or is reset), and old events are gone. Configure retention deliberately.
- Forgetting it's ordered per partition, not globally. The log guarantees order within a partition; across partitions, no global order (see [topics and partitions](/t/topics-partitions)).
- No offset management. Consumers track progress via [offsets](/t/consumer-offset); mishandling committed offsets causes reprocessing or skipped events.
- Unbounded growth ignored. Retention determines storage; a topic with heavy traffic and long retention needs capacity planning.
- Assuming exactly-once. Streaming platforms offer at-least-once by default and exactly-once with specific configurations; consumers should still be idempotent (see [delivery guarantees](/t/delivery-guarantees)).
- Reaching for it when a queue fits. A log is more machinery; if you just need background jobs, a queue is simpler.

**When to use it:** when events need retention and replay, several independent consumers must each process the whole stream, or you're doing stream processing and change data capture. For straightforward task distribution, a queue is the lighter tool. See [Kafka](/t/kafka) and [event-driven architecture](/t/event-driven-architecture).
