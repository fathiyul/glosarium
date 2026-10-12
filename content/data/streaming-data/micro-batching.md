---
title: "Micro-Batching"
summary: "Processing a stream as a series of tiny batches."
levels: { data-engineer: mid-level , data-scientist: mid-level }
aliases: ["micro-batch", "microbatch", "mini-batch streaming", "batch interval"]
prereqs: ["stream-processing", "batch-processing"]
related: ["stream-processing", "apache-spark", "batch-vs-stream", "real-time-vs-near-real-time", "stream-windowing", "apache-flink"]
---

Micro-batching processes a stream as a series of small batches: collect events for a short interval — often a fraction of a second to a few seconds — then process them together. It sits between record-at-a-time [stream processing](/t/stream-processing) and large scheduled [batch](/t/batch-processing) jobs.

**The classic mistake is expecting true streaming latency from a micro-batch engine.** A batch interval is a floor on latency: with a one-second interval, no result can appear sooner than about a second after the event, and results arrive in steps rather than continuously. That is usually fine for dashboards and aggregates, and not fine when you must react in milliseconds.

## Why batch the stream

- Throughput. Processing many events at once amortizes per-event overhead and lets the engine use vectorized or columnar execution.
- Simpler fault tolerance. A batch is a unit of work, so a failure can be retried as a transaction instead of tracking every record.
- Fits batch engines. [Apache Spark](/t/apache-spark) Structured Streaming is the well-known example: it repeatedly runs a small batch over the new data. Flink, by contrast, processes record by record.

## The costs

- Added latency, equal to the interval plus processing time.
- Tuning the interval: too long and results lag; too short and you pay per-batch overhead and produce many tiny files or commits.
- You still need the streaming concepts — [stream windowing](/t/stream-windowing), [watermarks](/t/watermark) and [late-arriving data](/t/late-arriving-data) — because events can be out of order or late within a batch.

## When not to use it

Choose record-at-a-time streaming when sub-second reaction matters, such as fraud checks or live alerts. Choose a plain scheduled batch when minutes or hours are acceptable and the simpler model wins. Micro-batching is the middle ground for "near-real-time" work — see [real-time vs near-real-time](/t/real-time-vs-near-real-time) and [batch vs stream](/t/batch-vs-stream).
