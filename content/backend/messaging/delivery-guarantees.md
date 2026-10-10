---
title: "Delivery Guarantees"
summary: "At-most-once, at-least-once and exactly-once delivery."
levels: { backend: senior, data-engineer: mid-level }
aliases: ["delivery guarantees", "delivery semantics", "message delivery"]
prereqs: ["message-acknowledgement", "at-least-once"]
related: ["exactly-once", "idempotence", "message-ordering"]
---

Messaging systems offer three fundamental **delivery guarantees**, and each is a trade between reliability and complexity:

- At-most-once — a message is delivered zero or one time. Fast and simple, but messages *can be lost* (if a consumer crashes after receiving but before finishing, it's gone). Acceptable only when losing a message is harmless.
- At-least-once — a message is delivered one or more times. If a consumer fails before acknowledging, the message is redelivered. Nothing is lost, but **duplicates** happen, so consumers must be [idempotent](/t/idempotence). This is the common default.
- Exactly-once — a message is processed exactly once. The ideal, but hard and often expensive: it requires coordination (transactional processing, deduplication, or idempotent sinks). True end-to-end exactly-once is rare; what's often provided is exactly-once *within* a system, with caveats at the edges.

```text
at-most-once:  may lose                    → simplest, risk of loss
at-least-once: may duplicate               → common; needs idempotent consumers
exactly-once:  neither, if attainable       → costly; often effectively-once
```

The classic mistakes:

- Assuming at-least-once is exactly-once. The most common messaging bug: a consumer that isn't idempotent double-processes on redelivery (double email, double charge). Duplicates are a *feature* of the guarantee; design for them.
- Believing "exactly-once" is free or global. It usually requires specific configurations and only covers certain paths; end-to-end exactly-once across systems is a design achievement, not a checkbox.
- Choosing at-most-once for important data. It's simple but lossy; use it only where loss is genuinely fine (some metrics, best-effort notifications).
- Ignoring the ack/commit timing. The guarantee depends on *when* you ack/commit relative to processing. Acking before processing turns at-least-once into at-most-once (lossy).
- No deduplication where needed. If you need to avoid duplicates, implement idempotent handlers or a dedup store keyed by message id (see [idempotency key](/t/idempotency-key)).
- Forgetting ordering interacts with them. Retries and rebalances can reorder messages; guarantees about delivery don't imply order (see [message ordering](/t/message-ordering)).

**How to choose:** default to **at-least-once with idempotent consumers** — robust and simple enough, and it's what most brokers give you. Accept at-most-once only for loss-tolerant messages. Reach for exactly-once (or "effectively-once" via idempotency) when duplicates are unacceptable *and* you can pay the complexity. The practical rule: make consumers idempotent, and the guarantee becomes far less of a worry. See [at-least-once](/t/at-least-once), [exactly-once](/t/exactly-once).
