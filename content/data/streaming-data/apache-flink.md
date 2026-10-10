---
title: "Apache Flink"
summary: "A stream-first processing engine with strong event-time support."
levels: { data-engineer: senior }
aliases: ["Flink", "Apache Flink", "Flink SQL"]
prereqs: ["stream-processing", "stateful-stream-processing"]
related: ["stream-processing", "event-time-vs-processing-time", "watermark", "exactly-once", "stream-table-duality", "apache-spark"]
---

Apache Flink is a stream-processing engine built around unbounded streams, with strong support for event time and stateful processing. It treats a batch job as a stream with a known end, so the same operators work for both.

**The classic mistake is choosing Flink for its reputation when a simpler engine fits.** Flink's strengths — exactly-once state, event-time windows, and low-latency processing with [backpressure](/t/backpressure) — come with real operational work: state backends, checkpoints, savepoints, and tuning parallelism. A team that only needs results every few minutes may be better served by [micro-batching](/t/micro-batching) on an engine they already run.

## Core ideas

- Event time. Flink can group events by when they happened, not when they arrived, and uses [watermarks](/t/watermark) to decide when a time window is complete ([event time vs processing time](/t/event-time-vs-processing-time)).
- State. Operators keep keyed state — running counts, sessions, dedup sets — and Flink manages it ([stateful stream processing](/t/stateful-stream-processing)).
- Fault tolerance. It takes periodic [checkpoints](/t/checkpoint) of operator state; on failure it restarts from the last one and replays from a replayable source such as [Kafka](/t/kafka).
- Exactly-once. With checkpointing plus sources and sinks that support it, Flink can give [exactly-once](/t/exactly-once) results rather than at-least-once.
- Stream–table duality. A table is the latest state of a stream and a stream is a table's changelog, which is how Flink SQL joins and updates data ([stream–table duality](/t/stream-table-duality)).

Flink offers a DataStream API and a Table API/SQL layer; which one you use depends on how much of the logic is plain SQL. Names and APIs evolve quickly, so check the version you're on.

## When not to use it

Flink is not the lightest thing to operate. If your latency budget is minutes rather than seconds, a scheduled [batch](/t/batch-processing) job or a micro-batch engine may be simpler and cheaper. If your team already runs [Apache Spark](/t/apache-spark) for batch, adding Flink means a second engine, a second set of skills, and a second thing to monitor. And if the data fits on one machine, [single-node engines](/t/single-node-engines) beat any cluster.

See [stream processing](/t/stream-processing) for the broader picture.
