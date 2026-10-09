---
title: "Correlation / Request ID"
summary: "An ID passed through every service to tie one request's logs together."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["request ID", "correlation ID", "trace ID", "X-Request-ID", "request correlation"]
prereqs: ["logging", "http-headers"]
related: ["distributed-tracing", "request-context", "context-propagation", "structured-logging", "reading-production-logs", "span"]
core: [backend]
---

A **correlation ID** (or **request ID**) is a unique identifier generated when a request enters your system and **passed along to everything that handles it**: every service, every log line, every message it triggers. It lets you pull together everything that happened for **one request** out of millions of interleaved log lines.

```
Browser ─► API gateway ─► Orders service ─► Payments service ─► Notification worker
          request_id=req_8f3a2c on every hop, in every log line

orders:    {"request_id":"req_8f3a2c","msg":"order created","order_id":917}
payments:  {"request_id":"req_8f3a2c","msg":"card declined","reason":"insufficient_funds"}
```

Search for `req_8f3a2c`, and you get the whole story across services ([reading production logs](/t/reading-production-logs)).

## How it works

1. **Generate** it at the edge (gateway or first service) if the incoming request doesn't already have one. Accept a sensible incoming ID from trusted callers.
2. **Propagate** it in an HTTP header (`X-Request-ID` is a common convention) on every outgoing call, and in message headers for queues and events ([context propagation](/t/context-propagation), [message headers](/t/message-headers)).
3. **Log** it with every message, automatically, rather than relying on developers to remember ([structured logging](/t/structured-logging)).
4. **Return it** to the client in the response (and in error bodies), so a user's bug report includes it ("my request ID is req_8f3a2c").

```python
# middleware sketch (Python / contextvars)
request_id_var = contextvars.ContextVar("request_id")

@app.middleware("http")
async def add_request_id(request, call_next):
    rid = request.headers.get("X-Request-ID") or f"req_{uuid4().hex[:12]}"
    request_id_var.set(rid)                          # available to all code handling this request
    response = await call_next(request)
    response.headers["X-Request-ID"] = rid
    return response
```

## Relationship to distributed tracing

A correlation ID ties logs together. **[Distributed tracing](/t/distributed-tracing)** builds on the same idea with a standard **trace ID** (the W3C `traceparent` header) plus **span IDs** that record timing and the call tree. If you have tracing, the trace ID can serve as the correlation ID. If not, a request ID is the cheapest high-value step.

## Practical points

- **Keep it in request context** so all code in the request can read it ([request context](/t/request-context)).
- **Make it automatic**: middleware and logging filters, not manual calls.
- **Propagate through async work**: background jobs, queues and threads don't inherit it unless you pass it.
- **Don't trust incoming IDs blindly** from the public internet. Validate their length and format, to avoid log injection.
- **Use unique, non-sequential IDs**, and don't encode secrets or personal data in them.
- **Include it in error responses and support tooling.**
