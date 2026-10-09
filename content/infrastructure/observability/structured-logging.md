---
title: "Structured Logging"
summary: "Logging key-value fields instead of free text."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["JSON logging", "structured logs", "logging with fields", "key-value logging", "JSON logs"]
prereqs: ["logging", "log-levels"]
related: ["logging", "correlation-id", "log-aggregation", "wide-events", "no-sensitive-data-in-logs", "reading-production-logs"]
core: [backend]
also: [backend-basics]
---

**Structured logging** means writing log entries as **data with named fields** (usually JSON), instead of free-form sentences. A person can still read it, and machines can **search, filter and aggregate** it reliably.

```
# Unstructured
2024-06-01 09:30:12 ERROR Payment failed for order 917 (user 42): card declined

# Structured (one JSON object per line)
{"ts":"2024-06-01T09:30:12Z","level":"error","msg":"payment failed","order_id":917,"user_id":42,"reason":"card_declined","request_id":"req_8f3a2c","duration_ms":812}
```

With the structured version, a log platform can answer "count payment failures by reason in the last hour" or "show all events for `request_id=req_8f3a2c`" **without writing regular expressions** to parse text, which break when someone rewords a message.

```python
import structlog
log = structlog.get_logger()
log.error("payment failed", order_id=917, user_id=42, reason="card_declined")
```

(Most languages have libraries for it, such as structlog, Python's `logging` with a JSON formatter, pino and winston for Node, and logback encoders for Java.)

## Good practice

- **Keep the message constant, and put the variable parts in fields.** `"msg":"payment failed"` plus `order_id=917` groups well. A message that embeds IDs (`"payment failed for order 917"`) produces thousands of distinct messages.
- **Use consistent field names** across services (`user_id`, not `userId` here and `uid` there), and consistent types (a field shouldn't be a number in one place and a string in another).
- **Always include context**: timestamp (UTC, ISO 8601), level, service name, version, and a [correlation ID](/t/correlation-id).
- **Add fields automatically** through context (request ID, user ID, tenant) so you don't repeat them in every call ([request context](/t/request-context)).
- **One event per line**, with no multi-line pretty printing. Stack traces go in a field.
- **Don't log secrets or unnecessary personal data**, and note that structured fields make accidental leaks more searchable ([sensitive data in logs](/t/no-sensitive-data-in-logs)).
- **Be careful with cardinality and size** in your log platform: a field with unbounded unique values and huge payloads costs money.
- **Keep it readable locally.** Many libraries offer a pretty console format for development and JSON in production.

A natural extension is the "wide event" approach: one rich event per request with many fields, instead of many scattered lines ([wide events](/t/wide-events)). See [logging](/t/logging) for the basics and [log aggregation](/t/log-aggregation) for searching them at scale.
