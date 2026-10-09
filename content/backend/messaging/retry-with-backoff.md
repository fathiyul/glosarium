---
title: "Retry with Exponential Backoff"
summary: "Retrying with growing delays so you don't hammer a failing service."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["exponential backoff", "retry with exponential backoff", "backoff and jitter", "retry policy", "retries"]
prereqs: ["timeouts", "idempotence"]
related: ["jitter", "retry-storm", "idempotency-key", "timeouts", "dead-letter-queue", "http-429", "circuit-breaker"]
core: [backend]
also: [reliability]
---

When a call fails, the right response is often "try again", but **not immediately, and not forever.** **Retry with exponential backoff** waits longer after each failed attempt, giving the failing service time to recover instead of hammering it.

```
attempt 1 fails → wait 1 s
attempt 2 fails → wait 2 s
attempt 3 fails → wait 4 s
attempt 4 fails → wait 8 s   ... capped at some maximum, then give up
```

```python
import random, time

def call_with_retries(fn, max_attempts=5, base=0.5, cap=30):
    for attempt in range(1, max_attempts + 1):
        try:
            return fn()
        except TransientError:
            if attempt == max_attempts:
                raise
            delay = min(cap, base * 2 ** (attempt - 1))
            time.sleep(random.uniform(0, delay))        # "full jitter": a random wait up to the delay
```

## Why add jitter

If a thousand clients fail at the same moment and all retry after exactly 1 s, 2 s, 4 s, they all hit the service **at the same instant**, again and again, a "thundering herd". **Jitter** adds randomness, so retries spread out over time ([jitter](/t/jitter), [retry storms](/t/retry-storm)).

## What to retry, and what not

- **Retry transient failures**: timeouts, connection resets, `502/503/504`, `429` (honor the `Retry-After` header) ([HTTP 429](/t/http-429)).
- **Don't retry permanent errors**: `400`, `401`, `403`, `404`, validation failures. They'll fail the same way every time.
- **Only retry operations that are safe to repeat** (idempotent), or protect them with an [idempotency key](/t/idempotency-key). A retried "charge card" without one can charge twice.

## Rules that prevent trouble

- **Always limit the attempts and the total time.** Unlimited retries create endless work and stuck requests. Respect an overall deadline, and give up when the caller has already given up.
- **Set a timeout on every attempt** ([timeouts](/t/timeouts)).
- **Retry at one level only.** If the client, the service and the SDK each retry 3 times, one failure becomes 27 calls (retry amplification).
- **Consider a retry budget**: a cap on the fraction of traffic that may be retries, so retries can't double the load on a struggling service.
- **Combine with a circuit breaker** that stops calling a dependency that's clearly down.
- **Log and measure retries.** Frequent retries are a symptom worth fixing, not hiding.
- **For messages**, retry with delays, then send failures to a [dead letter queue](/t/dead-letter-queue).

Many SDKs and HTTP clients include a retry policy. Check its defaults, and don't stack your own on top blindly.
