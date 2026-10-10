---
title: "Consumer Offset"
summary: "A consumer's position in a log, which it commits as it goes."
levels: { backend: senior, data-engineer: senior }
aliases: ["consumer offset", "offset", "committed offset"]
prereqs: ["event-streaming", "consumer-group"]
related: ["topics-partitions", "kafka", "consumer-group"]
---

A **consumer offset** is a bookmark: it records how far a consumer (or consumer group) has read in a partition. Events in a partition are numbered sequentially, and a consumer stores the offset of the last event it processed, then resumes from there after a restart. **Committing** the offset is what makes progress durable.

```text
partition: [e0 e1 e2 e3 e4 e5 ...]
consumer committed offset = 3 → next read starts at e4
```

Offsets are the mechanism that makes streaming *resumable and replayable*: a consumer can restart without reprocessing everything, or deliberately rewind to reprocess. Each partition has its own offset, tracked per consumer group.

The classic mistakes:

- Committing before processing. If you commit the offset and then fail mid-processing, the event is skipped forever — data loss. Commit *after* the work is done (or durably recorded), giving at-least-once.
- Committing after, but non-idempotent processing. Commit-after gives at-least-once: a crash after processing but before committing means the event is reprocessed. Handlers must be idempotent (see [idempotence](/t/idempotence)).
- Ignoring offsets after a group change. A new group with no committed offset starts from the beginning (or the latest, per configuration) — surprising if you expected it to continue.
- Assuming global progress. Offsets are per partition; a stuck partition can lag while the group's other partitions are current. Monitor per-partition lag.
- Resetting offsets casually. Rewinding reprocesses events (useful, but it re-triggers side effects); skipping forward loses them. Know the consequences before resetting.
- No checkpoint durability. If offsets are only in memory, a restart reprocesses from an old point. Commit offsets durably.
- Confusing offset with message id. An offset is a position in a partition, not a stable identifier of a message; after retention expiry or compaction, offsets may not map to the same events.

**How to use it:** commit offsets only after processing is durably done, make handlers idempotent to tolerate reprocessing around commits and rebalances, and monitor per-partition lag. Offsets are what let a streaming consumer be both resumable and replayable — treating them carelessly causes either data loss or double-processing. See [consumer group](/t/consumer-group) and [topics and partitions](/t/topics-partitions).
