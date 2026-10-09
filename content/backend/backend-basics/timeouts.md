---
title: "Timeouts"
summary: "Never waiting forever on a network call."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["timeout", "request timeout", "network timeouts", "read timeout", "connect timeout"]
prereqs: ["http", "port"]
related: ["connect-vs-read-timeout", "retry-with-backoff", "retry-storm", "context-propagation", "tail-latency"]
core: [backend]
also: [reliability]
---

A **timeout** is a limit on how long you'll wait for something. Every call that leaves your process (HTTP requests,
database queries, cache lookups) needs one. Without it, a slow or hung dependency makes **your** code hang as well, and
a waiting thread holds resources until you run out.

The classic mistake: many libraries have **no timeout by default**.

```python
import requests

requests.get(url)                      # can wait forever
requests.get(url, timeout=(3, 10))     # 3 s to connect, 10 s to read a response
```

```js
await fetch(url, { signal: AbortSignal.timeout(5000) });   // 5 seconds
```

## Kinds

- **Connect timeout**: how long to wait to establish the connection.
- **Read timeout**: how long to wait for data once connected (see [connect vs read](/t/connect-vs-read-timeout)).
- **Total / request deadline**: the maximum for the entire operation.
- **Query timeout**: for databases.
- **Idle timeout**: how long an unused connection is kept.

## Choosing values

- Base it on **how long a healthy call takes**, with margin: look at the p99 time ([percentiles](/t/percentile)) and add headroom. Not 0.5 seconds for a report that
  takes 20, and not 5 minutes for a call that normally takes 50 ms.
- **Your timeout must be shorter than your caller's**, or they give up while you're still working. With a chain
  of services, pass the remaining time along ([context propagation](/t/context-propagation)).
- Timeouts mean **you don't know** whether the other side finished. A timed-out payment might still have succeeded, so make
  retries safe with idempotency keys ([idempotency key](/t/idempotency-key)).

## What to do when one fires

- Fail with a clear error and a useful message.
- **Retry only if safe**, with backoff and a limit ([retry with backoff](/t/retry-with-backoff)). Retries without limits
  turn a slowdown into a [retry storm](/t/retry-storm).
- Show the user something useful. A timeout should not mean an endless spinner.

Set timeouts explicitly, in configuration, for every outbound call.
