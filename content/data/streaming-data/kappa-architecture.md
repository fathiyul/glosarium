---
title: "Kappa Architecture"
summary: "Everything as a stream, with reprocessing by replaying the log."
levels: { data-engineer: senior , data-scientist: senior }
aliases: ["Kappa", "kappa architecture", "stream-only architecture", "streaming-first architecture", "log-centric architecture"]
prereqs: ["stream-processing", "kafka"]
related: ["lambda-architecture", "kafka", "stream-processing", "event-sourcing", "stream-table-duality", "real-time-vs-near-real-time"]
core: [data-engineer]
---

**Kappa architecture** treats **everything as a stream**: there is **one processing pipeline**, a streaming one, over a **durable, replayable log** such as Kafka. There's no separate batch layer. To **reprocess history** (after a bug fix or a logic change), you **replay the log from the beginning** through the new version of the streaming job. The idea was proposed by Jay Kreps (of LinkedIn and Kafka) in 2014 as a simplification of the Lambda architecture.

```
sources ──► durable log (retains events) ──► stream processor ──► serving store / outputs
                    ▲
        reprocess: start a second job reading the log from offset 0 with the new code,
        write to a new output, then switch consumers to it
```

## How reprocessing works

1. Deploy **version 2** of the job, reading the log from the start (or from a chosen point).
2. It writes results to a **new output table or topic**.
3. When it **catches up** with the live stream and the results look right, **switch** readers to the new output.
4. Retire version 1.

The **log is the source of truth**, and outputs are derived views that can be rebuilt ([event sourcing](/t/event-sourcing) uses the same principle).

## Why it appeals

- **One codebase and one set of logic** for both real-time and historical processing, instead of two that must agree ([Lambda architecture](/t/lambda-architecture) needs two).
- **Simpler operations**: one system to run and debug.
- **Natural fit** for event-driven data.
- **Freshness**: results are continuously updated.

## Limitations and costs

- **The log must retain the history** you may want to replay, so storage and retention have costs (tiered storage helps). Replaying years of data can take a long time and a lot of compute.
- **Streaming semantics are harder**: event time, late data, ordering, state and exactly-once behavior ([event time vs processing time](/t/event-time-vs-processing-time), [stateful processing](/t/stateful-stream-processing)).
- **Stream engines are less convenient** for some analytics (large joins across history, ad-hoc queries, complex batch-style transformations) than warehouses and batch engines.
- **Output stores must support updates or replacement** when you swap in a rebuilt version.
- **Replaying through a changed schema** and handling old event formats takes care ([schema evolution](/t/schema-evolution)).
- **Not everything is an event stream.** Some sources are snapshots or files.

## Where it fits today

Streaming-first platforms and unified engines blur the line: many systems process bounded and unbounded data with the same API, and lakehouse tables allow both streaming and batch writes. In practice, many teams run mostly-streaming pipelines for fresh data, and use **batch for backfills and heavy history**, with the same code where the engine supports it. The Kappa idea, **one logic, a replayable log**, is the lasting contribution. See [batch vs stream](/t/batch-vs-stream) for the base trade-off.
