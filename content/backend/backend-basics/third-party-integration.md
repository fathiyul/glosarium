---
title: "Third-Party Integrations"
summary: "Calling payment, email and other external APIs reliably."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["third-party integration", "external API integration", "integration"]
prereqs: ["http", "idempotence"]
related: ["webhooks", "circuit-breaker", "backpressure", "idempotency-key", "rate-limiting"]
---

A **third-party integration** is code that talks to a service you don't control — a payment provider, an email sender, a CRM, a maps API. Unlike your own code, the remote can be slow, down, rate-limited or simply changed without warning. Integrating well means treating every external call as something that *will* fail.

The essentials:

- Timeouts. Never wait forever. Set a timeout shorter than your own request deadline, so a slow dependency doesn't tie up your workers.
- Retries with backoff. Transient failures (a 503, a dropped connection) often succeed on retry — but only retry safe, [idempotent](/t/idempotence) operations, and back off with jitter.
- A [circuit breaker](/t/circuit-breaker). If the remote is clearly down, stop hammering it; fail fast for a while, then probe again.
- Rate-limit awareness. Respect the provider's limits; a burst that trips their limiter can get you throttled or blocked (see [rate limiting](/t/rate-limiting)).
- Webhooks for push. For asynchronous events, the provider may call *you* (see [webhooks](/t/webhooks)); verify and make those handlers idempotent.

```text
try external call (timeout, idempotency key) → on transient error, backoff retry
→ on sustained failure, circuit opens → fallback or surface the error
```

The classic mistakes:

- No timeout. A hanging external call exhausts your threads and cascades into an outage on your side.
- Retrying non-idempotent operations. Retrying a "create payment" without an [idempotency key](/t/idempotency-key) can double-charge. Only retry what's safe.
- Treating the third party as always up. Design for it being down: degrade, queue, or show a clear error — don't let it take your whole service with it.
- Blindly trusting the response. Validate the data and handle unexpected shapes; providers change.
- No observability. Track latency and error rates per integration. A slow third party is a common cause of a slow site.

**How to think about it:** each integration is a fragile dependency at your boundary — isolate it behind a clear client, bound its failures with timeouts and circuit breakers, and make retries safe. It's the practical application of [backpressure](/t/backpressure) and graceful degradation to the parts of the system you don't own.
