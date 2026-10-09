---
title: "Stream Processing"
summary: "Computing over events as they arrive, as with Flink."
levels: { backend: senior, data-engineer: mid-level }
aliases: ["stream processing", "streaming data processing", "real-time processing", "Flink", "Kafka Streams", "Spark Structured Streaming"]
prereqs: ["message-queue", "batch-vs-stream"]
related: ["apache-flink", "stateful-stream-processing", "stream-windowing", "watermark", "event-time-vs-processing-time", "kafka"]
core: [data-engineer]
also: [streaming-data]
---

**Stream processing** means computing over data **as it arrives**, event by event or in tiny batches, instead of waiting to collect a bounded dataset and process it later ([batch vs stream](/t/batch-vs-stream)). Results are continuously updated.

```
events ──► [filter] ──► [enrich] ──► [count per user over 5-minute windows] ──► alerts, dashboards, other topics
```

Typical uses: fraud and anomaly detection, live dashboards, real-time recommendations, monitoring and alerting, keeping caches and search indexes in sync, transforming data on its way into a warehouse.

Common tools: Apache Flink, Kafka Streams, Spark Structured Streaming, and cloud services built on similar ideas ([Flink](/t/apache-flink), [Kafka](/t/kafka)).

## The concepts that make it different from batch

**Unbounded input.** The stream never ends, so you can't "sort everything" or "wait until the end". Aggregations are computed over **windows** ([stream windowing](/t/stream-windowing)): tumbling (fixed, non-overlapping, such as every 5 minutes), sliding and session windows.

**Event time vs processing time.** When something *happened* differs from when you *see* it. Mobile events can arrive minutes late, out of order. Correct results use event time ([event time vs processing time](/t/event-time-vs-processing-time)).

**Watermarks and late data.** A watermark is the system's estimate of "I've probably seen everything up to time T". It decides when a window can be closed, and what to do with stragglers ([watermarks](/t/watermark), [late-arriving data](/t/late-arriving-data)).

**State.** Counting, joining or deduplicating requires remembering things (counts, recent events). That state must be stored, bounded and **recoverable after a failure** ([stateful processing](/t/stateful-stream-processing)).

**Delivery semantics.** Failures cause replays. Engines offer at-least-once or exactly-once processing within their own boundaries, with side effects to external systems still needing care ([exactly-once](/t/exactly-once), [idempotent consumers](/t/idempotent-consumer)).

## Things to weigh before choosing it

- **It's more complex to build, test and operate than batch**: state, ordering, replay, backpressure.
- **Do you need it?** If minutes or hours is fine, simple batch or micro-batch is cheaper and easier ([real-time vs near-real-time](/t/real-time-vs-near-real-time)).
- **Reprocessing history** needs a replayable source such as a log, a reason Kafka-style systems and stream engines are used together.
- **Monitoring** is crucial: lag, throughput, watermark progress and state size.

Start from the question "how fresh must the answer be?", not from the technology.
