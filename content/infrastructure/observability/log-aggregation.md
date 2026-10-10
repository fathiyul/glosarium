---
title: "Log Aggregation"
summary: "Collecting logs from every server into one searchable place."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["centralized logging", "log aggregation", "log shipping"]
prereqs: ["logging", "structured-logging"]
related: ["observability", "container-logs", "correlation-id", "logs-metrics-traces", "error-tracking"]
---

**Log aggregation** ships logs from every machine, container and service to one central place where you can search across all of them. Instead of SSHing to a box and grepping `/var/log` (see [reading system logs](/t/system-logs)), you query one store and see events from the whole system together.

A typical flow:

```text
apps/containers → collector/agent → central store → search & dashboards
```

Agents collect output and forward it; the store indexes it and lets you filter by time, service, level and fields. Common choices include hosted services and self-run stacks built around systems like Elasticsearch, Loki or OpenSearch — the pattern matters more than the product.

The value is correlation. A request that crosses five services produces log lines in five places; aggregation puts them side by side. Add a [correlation ID](/t/correlation-id) to every line and you can follow one request end to end.

The classic mistakes:

- **Logging unstructured text.** Free-text lines are hard to filter and count; [structured logging](/t/structured-logging) with named fields makes queries possible.
- **Losing container logs.** When a container is replaced, its logs go with it (see [container logs](/t/container-logs)). Ship them off the host before that happens.
- Logging too much, or the wrong things. High-volume debug output costs money and buries the signal. Control levels and retention.
- **Putting sensitive data in logs.** Tokens, passwords and personal data end up in the central store, where far more people can read them. Redact at the source.

Aggregation gives you the "what happened" of [observability](/t/observability); metrics and traces cover the other angles ([logs, metrics and traces](/t/logs-metrics-traces)). Search is the payoff during an [incident](/t/incident-response) — which is why the data should be structured and shipped *before* you need it.
