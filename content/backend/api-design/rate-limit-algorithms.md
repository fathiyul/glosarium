---
title: "Rate Limiting Algorithms"
summary: "Token bucket, leaky bucket, fixed window and sliding window."
levels: { backend: senior }
aliases: ["rate limiting algorithms", "token bucket", "leaky bucket"]
prereqs: ["rate-limiting", "api-gateway"]
related: ["backpressure", "api-scopes", "redis"]
---

**Rate limiting algorithms** decide how to enforce "at most N requests per period" without either letting bursts through or being needlessly harsh. Each algorithm trades off burst tolerance, memory and accuracy, and the choice shows up in how the API feels to clients.

The common ones:

- Fixed window — count requests in fixed buckets (e.g. per minute), reject over the limit. Simple, but a burst at a window boundary can let through up to 2× the limit.
- Sliding window — track requests over a rolling period, smoothing the boundary problem. More accurate, slightly more bookkeeping.
- Token bucket — a bucket refills at a steady rate up to a capacity; each request takes a token. Allows short bursts up to the bucket size while enforcing an average rate. Very common and intuitive.
- Leaky bucket — requests enter a queue that drains at a fixed rate; excess is dropped. Smooths traffic to a constant rate rather than allowing bursts.

```text
token bucket: capacity 100, refill 10/s → burst up to 100, sustained 10/s
fixed window: 100/min → a burst across the boundary can sneak 200 through
```

The classic mistakes:

- Fixed windows and boundary bursts. Allowing 2× the limit at a boundary can still overwhelm a fragile backend. Use sliding windows or token buckets where that matters.
- Per-node limits in a distributed system. If each server limits independently, a client hitting many nodes gets N× the limit. Use a shared store (e.g. [Redis](/t/redis)) for a global limit.
- Limiting the wrong key. Per-IP breaks shared NATs; per-user ignores unauthenticated abuse. Usually limit by API key/account, with a separate layer per-IP for anonymous traffic.
- No headers or feedback. Clients can't back off gracefully if you don't tell them the limit and when it resets. Return standard rate-limit headers and `429`.
- Treating limits as security. Rate limiting reduces abuse; it's not authentication or authorisation. See [API scopes](/t/api-scopes).
- Forgetting the cost of distributed counting. A shared counter per request adds latency and load; batch, approximate, or use in-memory with periodic sync where precision is less critical.

**How to choose:** token bucket for a natural burst-plus-average limit; sliding window for stricter smoothing; fixed window only when simplicity outweighs precision. Whatever you pick, apply it consistently (distributed), communicate it via headers, and remember its real purpose is protecting the backend — see [backpressure](/t/backpressure).
