---
title: "Moving Work Off the Request Path"
summary: "Doing slow work in the background to keep responses fast."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["moving work off the request path", "off request path", "async processing"]
prereqs: ["job-queue", "performance"]
related: ["job-queue", "event-driven-architecture", "read-heavy-vs-write-heavy"]
---
**Moving work off the request path** keeps responses fast by deferring everything the response doesn't need: enqueue emails, notifications, indexing, analytics and webhooks; return to the user now; process in the background. Request latency then covers only the essential synchronous core.

```text
before: request → validate + write + email + index + analytics → respond (2s)
after:  request → validate + write + enqueue → respond (50ms) → workers drain
```

What stays synchronous: validation (reject bad input now), the core state change (confirm it happened), and anything the response content needs. Everything else — side effects, derived data, notifications — moves behind queues with retries and observability.

The classic mistakes:

- Everything synchronous. Emails, PDF renders and third-party calls inline make latency the sum of all downstream slowness. Audit response paths; defer ruthlessly.
- Fire-and-forget without durability. In-memory handoffs lose work on crash; defer through durable queues with retries, not hope.
- No user feedback on deferred work. "Submitted" with no progress or completion signal strands users. Track job state; surface progress and completion.
- Ordering assumptions. Background workers process concurrently and out of order; order-dependent side effects need sequencing preserved explicitly.
- Failure invisibility. Deferred failures nobody monitors become silent data loss (emails never sent, indexes never built). Alert on queue depth, failures and dead letters.
- Over-deferring. Moving the core write async ("eventual everything") confuses users who just acted. Keep the acknowledged state change synchronous; defer the consequences.
- Testing sync only. Integration tests covering the request but not the workers miss the actual behaviour. Test through the queue, including failure and retry paths.

**The rule:** responses contain validation plus the core change; everything else enqueues durably with observed workers. Latency is what you do before responding — do less there.
