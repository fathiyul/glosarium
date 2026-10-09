---
title: "Batch vs Stream Processing"
summary: "Processing data in periodic chunks vs continuously."
levels: { backend: senior, data-engineer: junior }
aliases: ["batch vs streaming", "batch processing", "stream processing vs batch", "real-time vs batch"]
prereqs: ["etl"]
related: ["stream-processing", "event-streaming", "stream-windowing", "mapreduce", "distributed-batch-processing", "kafka"]
core: [data-engineer]
also: [batch-processing]
---

Two ways to process data:

- **Batch**: collect data over a period, then process it all together on a schedule (hourly, nightly). The input is a
  *bounded* chunk, with a start and an end.
- **Stream**: process each event **as it arrives**, continuously. The input is *unbounded*, with no end.

| | Batch | Stream |
|---|---|---|
| Latency | Minutes to hours | Seconds or less |
| Input | A finite file, table or partition | A never-ending flow of events |
| Typical use | Nightly reports, billing runs, model training | Fraud alerts, live dashboards, notifications |
| Complexity | Simpler | Harder: ordering, late data, state, recovery |
| Failure handling | Rerun the job | Needs checkpoints and careful replay |
| Cost pattern | Compute only while running | Always running |

```
Batch:   [ file/day ] ──► job runs at 02:00 ──► report
Stream:  event ► event ► event ► ... ──► processor ──► results continuously
```

## Why batch is still everywhere

Batch is simpler to build, test, debug and rerun: a failed run is just run again on the same input. Many questions don't need
fresh-to-the-second answers. A daily revenue report is fine as a batch.

## When streaming is worth it

When the value of the result drops quickly with time: blocking fraudulent payments, alerting on outages, updating
a live leaderboard, reacting to a user's action while they're still on the page.

## Things streaming makes you handle

- **Event time vs processing time**: the order events arrive in isn't the order they happened in.
- **Late and out-of-order data**, so you use [windows](/t/stream-windowing) and decide how long to wait.
- **State** (counts, sessions) that must survive restarts.
- **Delivery guarantees** and duplicates ([delivery guarantees](/t/delivery-guarantees)).

## In-between

**Micro-batch** processes small batches every few seconds, giving near-real-time results using batch ideas. Some
systems unify the two, treating a batch as a bounded stream. A common architecture is a stream for fresh, approximate
results plus batch to correct and reprocess history.

Start with the **latency you actually need**. Don't build a streaming system for a report read once a day. See
[stream processing](/t/stream-processing) and [ETL](/t/etl).
