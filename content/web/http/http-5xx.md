---
title: "5xx Server Errors"
summary: "500, 502, 503, 504: the server failed."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["500", "502", "503", "504", "server error status codes"]
prereqs: ["http-status-codes"]
related: ["http-4xx", "retry-with-backoff", "health-check", "load-balancer", "error-tracking"]
---

Status codes in the 5xx range mean the server failed to fulfil a request that looked valid. The fault is on the server side (or a system in front of it), not the client's.

| Code | Name | Typical cause |
|---|---|---|
| **500** | Internal Server Error | an unhandled exception or bug in the application |
| **501** | Not Implemented | the server doesn't support that feature |
| **502** | Bad Gateway | a proxy or load balancer got an invalid response from the app behind it (crashed, wrong port) |
| **503** | Service Unavailable | overloaded, starting up or down for maintenance; may include `Retry-After` |
| **504** | Gateway Timeout | the proxy waited too long for the app to answer |

```http
HTTP/1.1 503 Service Unavailable
Retry-After: 30
```

## Debugging them

- **500**: look at the application logs and error tracker for the stack trace ([error tracking](/t/error-tracking), [reading production logs](/t/reading-production-logs)). The browser only shows the code. The cause is in the server.
- **502**: is the application running and listening on the port the proxy expects? Did it crash on a request?
- **503**: check load, deployments, health checks and capacity ([health checks](/t/health-check)).
- **504**: something is slow (a database query, a downstream call). Look at timeouts and slow requests ([timeouts](/t/timeouts)).

## For API authors

- **Don't leak internals** in the response body (stack traces, SQL). Return a generic message and a request ID, and log the details ([error response format](/t/error-response-format)).
- **Use 503 with `Retry-After`** for planned or overloaded states.
- **Alert on the 5xx rate**, since it's a direct signal of user-facing failures ([alerting](/t/alerting)).
- Make sure that errors in your own code return 5xx, not 200 or 4xx.

## For clients

5xx errors may be transient, so retrying with backoff is reasonable, **if the operation is idempotent** (or protected by an idempotency key) ([retry with backoff](/t/retry-with-backoff), [idempotency key](/t/idempotency-key)). A 500 on a `POST` may have partly succeeded, so check before repeating.

See [client errors (4xx)](/t/http-4xx).
