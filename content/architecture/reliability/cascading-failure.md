---
title: "Cascading Failure"
summary: "One failure triggering failures in the systems that depend on it."
levels: { backend: senior, frontend: senior, data-engineer: senior }
aliases: ["cascade failure", "cascading failures", "failure cascade", "domino effect outage", "chain reaction failure"]
prereqs: ["distributed-system", "timeouts"]
related: ["circuit-breaker", "bulkhead", "load-shedding", "retry-storm", "thread-pool-exhaustion", "blast-radius", "degraded-modes"]
core: [backend]
---

A **cascading failure** is when a problem in one component **triggers failures in the components that depend on it**, which in turn overload or break others, until a small fault becomes a large outage. Many of the biggest outages are cascades, not single failures.

## How it unfolds

```
1. Service B gets slow (a bad query, a GC pause, a deploy).
2. Service A, calling B, waits. Its threads and connections stay busy waiting.
3. A's capacity is exhausted (thread pool exhaustion), so A becomes slow or fails.
4. Clients of A time out and RETRY, multiplying the load (a retry storm).
5. The extra load pushes B (still recovering) back over the edge.
6. The failure spreads upstream to everything that depends on A, and the system can't recover on its own.
```

In the sequence above, step 3 is [thread pool exhaustion](/t/thread-pool-exhaustion) and step 4 is a [retry storm](/t/retry-storm).

## Common amplifiers

- **Retries without limits or backoff**: a struggling service gets 3 to 10 times more traffic exactly when it can least handle it.
- **Long or missing timeouts**: callers pile up waiting, holding resources ([timeouts](/t/timeouts)).
- **Shared resources**: a common thread pool, connection pool or database that every feature uses, so one slow path starves the rest.
- **Load redistribution**: when one of N servers fails, the other N-1 take its traffic. If they were running near capacity, they fail next, one after another.
- **Cold caches**: a cache restart or failure sends all traffic to the database, which falls over ([cache stampede](/t/cache-stampede)).
- **Synchronized behavior**: all clients retrying or refreshing at the same moment.
- **Health checks that restart** overloaded instances, making things worse, so capacity drops further.
- **Slow failure is worse than fast failure**: a dependency that fails quickly is easier to handle than one that hangs.

## Defenses

| Technique | What it does |
|---|---|
| **Timeouts** on every call | Free resources instead of waiting forever |
| **Retries with backoff, jitter and budgets** | Don't amplify load ([retry with backoff](/t/retry-with-backoff)) |
| **Circuit breakers** | Stop calling a failing dependency so it can recover ([circuit breaker](/t/circuit-breaker)) |
| **Bulkheads** | Isolate resource pools per dependency, so one failure can't consume everything ([bulkhead](/t/bulkhead)) |
| **Load shedding and backpressure** | Reject excess work early and cheaply, instead of collapsing ([load shedding](/t/load-shedding)) |
| **Graceful degradation** | Serve a reduced but working experience when a dependency is down ([degraded modes](/t/degraded-modes)) |
| **Capacity headroom** and autoscaling | Absorb redistributed load (N+1 or N+2 redundancy) |
| **Rate limiting per client** | Stop one caller from overwhelming a service ([rate limiting](/t/rate-limiting)) |
| **Gradual rollouts** | Catch bad changes before they hit everything ([canary release](/t/canary-release)) |

## During an incident

- **Reduce load first**: shed traffic, disable non-essential features, pause retries and batch jobs.
- **Bring components back gradually**, since slamming full traffic onto a recovering system re-triggers the cascade.
- **Don't restart everything at once.**
- Find and fix the *trigger* afterwards, and the *amplifiers* too ([postmortems](/t/postmortem)).

## Testing

Fault injection and load tests reveal cascades before real traffic does: slow down a dependency, kill instances, and watch whether the failure stays contained ([chaos engineering](/t/chaos-engineering)). The design question: **what happens to everything upstream when this dependency gets slow?**
