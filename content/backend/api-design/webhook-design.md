---
title: "Designing Webhooks"
summary: "Signatures, retries, ordering and idempotency for outgoing webhooks."
levels: { backend: senior }
also: [messaging]
aliases: ["webhook design", "designing webhooks", "outgoing webhooks"]
prereqs: ["webhooks", "idempotence"]
related: ["message-ordering", "rate-limiting", "api-contract"]
---

**Designing webhooks** is building the *sender* side: your system notifies customers' endpoints when something happens (a payment succeeded, a record changed). Unlike a callback you control, the receiving endpoint is someone else's — it can be slow, down, or buggy, and it must be treated as unreliable.

The design must answer several questions:

- Signature and trust. Sign each delivery so the receiver can verify it came from you and wasn't tampered with. Never send unauthenticated events.
- Retries and backoff. Endpoints go down. Retry with exponential backoff and jitter, over a bounded window, then give up and mark the delivery failed (see [jitter](/t/jitter)).
- Idempotency and delivery. Retries mean duplicate deliveries; include an event ID so receivers can deduplicate (see [idempotence](/t/idempotence)).
- Ordering. Events may arrive out of order (see [message ordering](/t/message-ordering)); include a timestamp/sequence, and tell receivers not to assume order.
- Delivery guarantees. Be explicit: typically *at-least-once*. Don't promise exactly-once.
- Payload and versioning. Define the event shape as a [contract](/t/api-contract), include the event type and a version, and evolve it compatibly.
- Failure visibility. Give senders a way to see failed deliveries and replay them.

```text
event fires → sign payload → POST to subscriber → 2xx? done
                                            else retry with backoff → eventually failed
```

The classic mistakes:

- No signature. Anyone can forge a webhook to a public endpoint; receivers can't trust it. Always sign.
- No retries. A single POST that fails loses the event. Retry with backoff.
- Retries without idempotency. Retrying a non-idempotent receiver's operation can double-apply. Provide event IDs so they can dedupe.
- Assuming the receiver is fast. A slow endpoint shouldn't block your system; deliver asynchronously via a queue.
- Unbounded retry. Retrying forever can hammer a dead endpoint; cap attempts and surface failures.
- Promising what you can't. Claiming ordered, exactly-once delivery sets receivers up for subtle bugs. Be honest about at-least-once and no ordering.

**How to build it:** queue the event, sign it, deliver asynchronously with bounded retries, include an idempotency key and sequence, log delivery outcomes, and let senders replay. A well-designed webhook is a small reliable messaging system — see [webhooks](/t/webhooks) for the receiver side.
