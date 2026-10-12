---
title: "Real-Time vs Near-Real-Time"
summary: "Milliseconds vs minutes, and which one the business actually needs."
levels: { data-engineer: junior, backend: junior , data-scientist: junior }
aliases: ["real-time vs near real-time", "near-real-time", "real time data", "data latency requirements", "freshness requirements"]
prereqs: ["batch-vs-stream"]
related: ["micro-batching", "batch-vs-streaming-ingestion", "stream-table-duality", "lambda-architecture", "kappa-architecture", "apache-flink"]
core: [data-engineer]
---

"We need **real-time** data" is one of the most ambiguous sentences in data engineering. To one person it means milliseconds, to another
"updated every few minutes". The cost and design differ enormously, so pin down the actual requirement.

| Latency from event to result | Common name | Example |
|---|---|---|
| Milliseconds | Real-time (online) | Fraud check while a payment is being authorized, serving a recommendation |
| Seconds | Near-real-time / streaming | Live dashboards, alerting, "your order was just shipped" notification |
| Minutes | Near-real-time / micro-batch | Operational reports refreshed every 5-15 minutes |
| Hours to a day | Batch | Finance reports, daily KPIs, model training |

(Strictly, "real-time" in embedded systems means guaranteed deadlines. In data work, it just means "very fresh".)

## Ask the useful questions

- **What decision or action depends on this data?** If nobody acts within minutes, minutes won't matter.
- **What does being late cost?** A missed fraud signal costs money. A dashboard that's 10 minutes behind probably costs nothing.
- **Who looks at it, and how often?** A report opened once a day doesn't need second-level freshness.
- **How correct must it be?** Fast results are often approximate or revised later. Some uses can't tolerate that.

## What more freshness costs

- **Complexity**: ordering, [late-arriving data](/t/late-arriving-data), state, exactly-once concerns, failure recovery.
- **Money**: always-on infrastructure instead of a job that runs for a while.
- **Operations**: continuous systems need monitoring, on-call and careful upgrades.
- **Consistency trade-offs**: results computed from partial data may change when the stragglers arrive.

## Options along the spectrum

- **Frequent batches**: running a job every 5-15 minutes is often enough and keeps batch simplicity.
- **[Micro-batching](/t/micro-batching)**: very small batches, giving seconds-to-minutes latency with batch semantics.
- **True streaming**: record-by-record processing ([stateful stream processing](/t/stateful-stream-processing),
  [Flink](/t/apache-flink)).
- **Hybrid designs** that combine a fast, approximate path with a slower, corrected one
  ([Lambda](/t/lambda-architecture), [Kappa](/t/kappa-architecture)).

Rule of thumb: **buy the least freshness the business can use.** You can always tighten it later when a real need appears. See also
[batch vs stream processing](/t/batch-vs-stream).
