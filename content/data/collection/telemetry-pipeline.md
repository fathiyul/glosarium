---
title: "Telemetry Pipeline"
summary: "The path from emitted logs, metrics and events to where they're stored and queried."
levels: { data-engineer: senior, backend: senior , data-scientist: senior }
aliases: ["observability pipeline", "telemetry collection", "telemetry ingestion"]
prereqs: ["logs-metrics-traces", "observability"]
related: ["opentelemetry", "telemetry-sampling", "log-aggregation", "cardinality", "data-retention-tiers", "backpressure"]
---

A telemetry pipeline carries logs, metrics and traces from where they are produced to where they are stored and queried. The path usually runs: instrumented service or device → local agent or SDK → collector → buffer or stream → storage → query UI and alerting.

Telemetry is not business data. It is **high volume**, mostly low value one event at a time, and losing a small fraction is often acceptable. The classic mistake is making the application **block** on telemetry: writing every log line synchronously to a shared database, or sending spans inline with the request. When the telemetry backend slows down, your users feel it. Emit to a local buffer or a collector and let it handle retries and [backpressure](/t/backpressure).

## For backend engineers

- Instrument once with a vendor-neutral standard such as [OpenTelemetry](/t/opentelemetry), then route to whichever backend you use.
- Keep emission non-blocking and bounded. A full buffer should drop or sample, not stall the request.
- Watch label [cardinality](/t/cardinality): a unique value per request (user id, URL with ids) can blow up [metrics](/t/metrics) cost.
- Propagate trace context across services so [distributed tracing](/t/distributed-tracing) joins spans into one request.

## For data engineers

- The pipeline is a streaming system: collectors, queues and a store built for append-heavy writes.
- Decide [sampling](/t/telemetry-sampling) early — head or tail — because you cannot store everything cheaply.
- Separate hot queryable data from cold archive with a [retention and tiering](/t/data-retention-tiers) policy.
- Expect [schema drift](/t/schema-drift) in logs; parse defensively and keep the raw line.

The three signal types have different shapes; see [logs, metrics and traces](/t/logs-metrics-traces). The trade-off is cost versus fidelity: sampling and short retention save money but make rare bugs harder to reproduce, so keep raw data long enough to investigate incidents, then down-sample.
