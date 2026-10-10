---
title: "Backpressure"
summary: "A slow consumer signalling a fast producer to slow down."
levels: { backend: senior, frontend: senior, data-engineer: senior }
also: [messaging, reliability]
aliases: ["backpressure", "flow control", "apply backpressure"]
prereqs: ["producer-consumer", "queue"]
related: ["message-queue", "rate-limiting", "load-shedding", "event-loop", "circuit-breaker"]
---

**Backpressure** is what happens when a consumer tells a producer to slow down, because the consumer can't keep up. Without it, a fast producer feeding a slow consumer doesn't fail cleanly — it builds a backlog. The queue grows, memory fills, latency climbs, and eventually something drops messages or crashes. Backpressure converts "we're going to blow up later" into "slow down now".

```text
no backpressure: producer → [queue grows, grows, grows] → consumer  ✗
backpressure:    producer → [bounded queue] ── signal ──▶ producer   ✓
```

The mechanism is a **bounded** buffer. When it's full, the producer's writes block, get rejected, or get throttled — any of which applies pressure back up the chain. That pressure has to propagate: if a queue deep in the system fills, the service feeding it must feel the slowdown too, or the backlog just moves upstream.

Common ways to apply it:

- Block or await — the producer waits until there's room (used in streams and channels).
- Reject or shed — refuse new work, or drop low-priority work (see [load shedding](/t/load-shedding), [rate limiting](/t/rate-limiting)).
- Throttle — reduce the producer's rate.

The classic mistakes:

- Unbounded queues. An unbounded buffer is not "handling" load; it's deferring the failure while memory fills. Bound every queue, even if the bound is generous.
- Not propagating the signal. If a consumer slows down but the producer keeps pushing, the buffer absorbs it until it overflows. The pressure must reach the source.
- Treating it as only a server problem. A frontend can create backpressure too: instead of firing every request at once, throttle in-flight requests, debounce, or pause a stream — so the browser and the backend aren't overwhelmed (see [event loop](/t/event-loop)).
- Confusing it with rate limiting. Rate limiting caps how much you *accept* by policy; backpressure is a *reactive* signal that the current consumer is saturated. They're often used together.
- Ignoring it in pipelines. A data pipeline whose last stage is slow will back up through every stage. Design each hop to feel the downstream limit (see [message queues](/t/message-queue)).

The healthy pattern is bounded buffers plus a clear policy for when they're full. That, combined with a [circuit breaker](/t/circuit-breaker) for failing dependencies, keeps a slow component from taking down everything feeding it.
