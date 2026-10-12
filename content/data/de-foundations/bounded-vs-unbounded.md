---
title: "Bounded vs Unbounded Data"
summary: "A finite dataset vs a stream that never ends."
levels: { data-engineer: mid-level , data-scientist: mid-level }
aliases: ["bounded data", "unbounded data", "bounded vs unbounded data"]
prereqs: ["batch-vs-stream"]
related: ["batch-vs-stream", "stream-processing", "stream-windowing", "event-time-vs-processing-time", "batch-processing", "late-arriving-data"]
---

Bounded data is a finite dataset: it has a start and an end, so a job can read all of it, compute, and stop. A file, yesterday's events in a table, or a query result are bounded. Unbounded data is a stream that never ends: events keep arriving and there is no final input to finish on.

The distinction matters because it changes what you can compute. The classic mistake is treating a stream as if it were just a very large file. With bounded data you can sort the whole set, join it, and produce a total. With unbounded data you cannot wait for the end, so aggregations must be defined over time windows, and you have to decide what to do with events that arrive after their window has passed.

For example, "revenue per day":

- Bounded: group yesterday's orders by date and sum.
- Unbounded: sum events in each one-day [window](/t/stream-windowing), and handle orders that arrive after their day is closed ([late-arriving data](/t/late-arriving-data)).

Many systems bridge the two. Apache Spark models a stream as an unbounded table and processes it in small batches; Apache Flink is stream-first and has strong support for event-time windows. Those are engine-specific choices, not universal rules.

A useful idea from stream processing is that you can always turn unbounded data into bounded data by chopping it into windows, so a bounded job is a special case of a streaming one.

## When not to use streaming

Streaming adds operational complexity: state, watermarks, late data and delivery guarantees. If minutes or hours of latency are acceptable, [batch processing](/t/batch-processing) over bounded chunks is simpler and often cheaper. Reach for stream processing when the business needs low latency or the source genuinely never ends. See [batch vs stream processing](/t/batch-vs-stream) and [stream processing](/t/stream-processing).
