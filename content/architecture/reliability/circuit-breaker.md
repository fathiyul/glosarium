---
title: "Circuit Breaker"
summary: "Stopping calls to a failing service so it can recover."
levels: { backend: senior, frontend: senior, data-engineer: senior }
aliases: ["circuit breaker pattern", "circuit breakers", "Resilience4j", "Polly", "fail fast breaker"]
prereqs: ["timeouts", "retry-with-backoff"]
related: ["cascading-failure", "bulkhead", "timeouts", "degraded-modes", "retry-with-backoff", "fault-tolerance"]
core: [backend]
---

A **circuit breaker** wraps calls to a dependency and **stops sending requests when that dependency is clearly failing**, so callers fail fast instead of piling up on a dead or overloaded service, and the dependency gets room to recover. The name comes from the electrical device that trips to prevent damage.

## The three states

```
        failures exceed threshold
 CLOSED ───────────────────────────► OPEN
 (calls pass through)                 (calls rejected immediately, no network attempt)
    ▲                                   │ after a cool-down period
    │ trial calls succeed               ▼
    └──────────────────────────── HALF-OPEN
                                     (a few trial calls allowed)
                  trial calls fail → back to OPEN
```

- **Closed**: normal operation. The breaker counts failures (errors, timeouts) in a window.
- **Open**: the failure rate crossed a threshold. Calls fail **immediately** (or use a fallback) without contacting the dependency, for a cool-down period.
- **Half-open**: after the cool-down, a few **probe** requests are allowed. If they succeed, the breaker closes. If they fail, it opens again.

```python
breaker = CircuitBreaker(failure_threshold=0.5, window=20, open_seconds=30)

def get_recommendations(user_id):
    try:
        return breaker.call(lambda: recs_client.fetch(user_id, timeout=0.3))
    except CircuitOpenError:
        return popular_items()              # fallback: degrade gracefully
```

## Why it helps

- **Prevents cascading failures**: callers don't tie up threads and connections waiting on a failing dependency ([cascading failure](/t/cascading-failure)).
- **Gives the dependency breathing room**: you stop hammering it while it's down or overloaded, instead of adding retries ([retry storms](/t/retry-storm)).
- **Faster failure** for users: an immediate fallback instead of a 30-second hang.

## Using it well

- **Pair it with timeouts.** The breaker counts timeouts as failures, and without a timeout, a hanging call never gets counted ([timeouts](/t/timeouts)).
- **Provide a meaningful fallback** where possible: cached data, a default, a reduced feature, or a clear error ([degraded modes](/t/degraded-modes)).
- **Tune the thresholds** to the dependency's normal error rate and traffic. Too sensitive means it trips on noise. Too lax means it doesn't protect you. Require a minimum number of calls before judging.
- **Use one breaker per dependency (or per endpoint)**, not one global one.
- **Combine with bulkheads** and retries (retry *inside* the breaker's view, and not when it's open) ([bulkhead](/t/bulkhead), [retry with backoff](/t/retry-with-backoff)).
- **Monitor and alert on state changes.** An open circuit is a signal that something is wrong.
- **Count only the right failures.** A `404` or validation error isn't a dependency failure.
- Libraries exist for most languages (such as Resilience4j for Java and Polly for .NET), and service meshes and gateways can apply breakers outside your code.

## Caveats

- A breaker can **hide a problem** if nobody's watching the fallbacks.
- During half-open, a thundering herd of probes can re-trigger the failure, so limit them.
- It protects the **caller**. The dependency still needs its own protection: load shedding and capacity ([load shedding](/t/load-shedding)).
