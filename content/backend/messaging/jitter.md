---
title: "Jitter"
summary: "Randomizing retry delays so clients don't all retry in sync."
levels: { backend: senior, frontend: senior, data-engineer: senior }
also: [reliability]
aliases: ["jitter", "exponential backoff with jitter", "retry jitter"]
prereqs: ["backpressure", "message-queue"]
related: ["thundering-herd", "dead-letter-queue", "backpressure"]
---

**Jitter** is a small random variation added to timing — especially retry and backoff delays — so that independent clients don't all act at the same instant. Without it, clients that fail together tend to **retry together**, hitting the recovering service with a synchronized spike that knocks it over again.

```text
no jitter:   all clients retry at t=1s, 2s, 4s, ...   (synchronized burst)
with jitter: retry at 1s ± random, 2s ± random, ...    (spread out)
```

It's a standard part of retry strategy: **exponential backoff** (wait longer after each failure) plus **jitter** (randomise within the backoff window). The backoff reduces load; the jitter desynchronises.

The classic mistakes:

- Fixed-interval retries. Every client waits exactly the same time and retries simultaneously — a self-inflicted [thundering herd](/t/thundering-herd) on the service that just recovered.
- Backoff without jitter. Even growing delays synchronize if every client follows the same schedule. Jitter is what breaks the lockstep.
- Retry storms after an outage. When a dependency recovers, thousands of queued retries fire at once. Jitter plus a retry budget/circuit breaker prevents the recovery itself from being the next outage.
- Applying jitter only client-side. Servers and queues also benefit: delayed jobs, scheduled task start times, and cache expiry can all be jittered to spread load (see [cache warming](/t/cache-warming)).
- Over-randomising. Too much jitter makes timing unpredictable and hard to reason about; a bounded random factor around the backoff is the usual balance.
- Unbounded retries. Jitter doesn't fix a hopeless request; combine with a retry limit and dead-lettering (see [dead-letter queue](/t/dead-letter-queue)).
- Forgetting the server side. Client jitter spreads requests, but the server also needs [backpressure](/t/backpressure) and circuit breaking to protect itself.

How to use it: on any retry path, use exponential backoff with jitter (randomise the wait), cap attempts, and pair it with a circuit breaker. Jitter is a tiny change with an outsized effect on stability — it turns synchronized failure-and-recovery cycles into smooth, spread-out load. It's a standard tool for [backpressure](/t/backpressure) and resilience.
