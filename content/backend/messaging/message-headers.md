---
title: "Message Envelope and Headers"
summary: "Metadata travelling with a message: IDs, timestamps, correlation and type."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["message headers", "message envelope", "message metadata"]
prereqs: ["message", "message-broker"]
related: ["correlation-id", "message-ordering", "structured-logging"]
---

Every message has two parts: the **payload** (your actual data) and the **envelope** — the metadata the broker and consumers need to route, trace and manage it. **Headers** on the envelope carry things like the message id, a correlation id, a content type, a routing key, the timestamp, and a retry count.

```text
envelope: { id, correlationId, contentType, routingKey, timestamp, retryCount }
payload:  { the actual business data }
```

Separating them keeps the payload clean (just the data) while the envelope carries the operational context. Consumers read headers for decisions — "is this a retry?", "which trace does this belong to?" — without digging into the payload.

The classic mistakes:

- Putting routing/tracing data in the payload. Routing keys, correlation ids and content types are envelope concerns; embedding them in the payload muddles the message and couples consumers to fields they shouldn't parse.
- Forgetting the correlation id. Without it, tracing a request across the async boundary is hard — logs and traces can't be tied together (see [correlation id](/t/correlation-id)). Put it in the envelope.
- Losing the content type. A consumer should know whether the payload is JSON, protobuf or binary. Without a content type, parsing is guesswork.
- No schema or version. Payloads evolve; a version field in the envelope lets consumers handle old and new messages during a rollout (see [schema and code deploys](/t/schema-and-code-deploys)).
- Retry metadata in the wrong place. A retry count belongs in the envelope (managed by the broker/consumer), not the payload; using the payload couples retry logic to business data.
- Headers too large. Some brokers limit header size; don't stuff big data into headers. The payload is for data, headers for metadata.
- Assuming standard header names. Header conventions differ across brokers; know which names yours uses.

**How to use it:** keep the payload purely business data and put operational context — id, correlation id, content type, routing, timestamp, retry count, version — in the envelope's headers. It makes messages routable, traceable and evolvable, and keeps consumers reading the right layer. It's the messaging counterpart to [structured logging](/t/structured-logging): context separated from content.
