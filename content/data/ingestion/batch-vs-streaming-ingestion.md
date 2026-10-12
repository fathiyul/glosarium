---
title: "Batch vs Streaming Ingestion"
summary: "Loading data on a schedule vs continuously as it's produced."
levels: { data-engineer: junior , data-scientist: junior }
aliases: ["batch ingestion", "streaming ingestion", "micro-batch ingestion", "real-time ingestion"]
prereqs: ["data-ingestion"]
related: ["batch-vs-stream", "log-based-cdc", "full-vs-incremental-load", "messages-vs-streams", "push-vs-pull-ingestion", "high-water-mark"]
core: [data-engineer]
---

Ingestion can bring data in **on a schedule (batch)** or **continuously as it's produced (streaming)**. The choice sets freshness, cost and
complexity.

| | Batch ingestion | Streaming ingestion |
|---|---|---|
| How | Run a job every N minutes or hours; load what's new | Consume events continuously from a stream or change log |
| Freshness | Minutes to a day | Seconds |
| Complexity | Lower: simple jobs, easy reruns | Higher: ordering, duplicates, late data, state |
| Cost | Pay when running | Always-on infrastructure |
| Typical sources | Database extracts, file drops, API pulls | Event streams, message queues, change data capture |

```
Batch:     source ─(every hour: SELECT ... WHERE updated_at > :last_run)─► landing zone
Streaming: source ─(each change/event)─► stream ─► consumer ─► storage within seconds
```

## Batch in practice

Typically: remember where you stopped (a [high-water mark](/t/high-water-mark)), pull everything newer, write it, and advance the mark. Or
load files that landed since the last run ([full vs incremental load](/t/full-vs-incremental-load)). Failures are easy to
handle: rerun the batch. It's the right default.

## Streaming in practice

Changes arrive as a flow: from an event bus, or from a database's change log ([log-based CDC](/t/log-based-cdc)), which
captures every insert, update and delete without hammering the source with queries. You have to handle:

- **Duplicates**: at-least-once delivery is common, so deduplicate ([deduplication](/t/deduplication)).
- **Ordering**: events can arrive out of order.
- **Back-pressure and recovery**: replaying from a saved position after a failure
  ([messages vs streams](/t/messages-vs-streams)).

## Choosing

Ask: **how fresh does the consumer really need it?** "The dashboard is read each morning" means batch is enough. "Fraud must be
flagged before shipping" means stream. Streaming costs more to build and operate, so adopt it for use cases that need it.

There's a middle ground, **micro-batching**: tiny batches every few seconds or minutes, which is often good enough for
"near real time". Many pipelines also mix the two: stream in for freshness, batch to reconcile and reprocess. See
[batch vs stream processing](/t/batch-vs-stream) for the processing side of the same trade-off.
