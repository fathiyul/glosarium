---
title: "Fan-Out"
summary: "Sending one message to many consumers."
levels: { backend: senior, data-engineer: senior }
aliases: ["fan-out", "fanout", "message fan-out"]
prereqs: ["queue-vs-topic", "pub-sub-pattern"]
related: ["queue-vs-topic", "consumer-group", "pub-sub-pattern", "message-broker"]
---

**Fan-out** is delivering one message to **many** consumers, each getting its own copy. Where a queue sends a message to a single consumer (work sharing), fan-out broadcasts it: one "order placed" event reaches the email service, the analytics service and the inventory service — each processing it independently.

```text
"order placed" ─┬─▶ email service
                ├─▶ analytics service
                └─▶ inventory service
```

It's the essence of pub/sub and the reason event-driven systems are loosely coupled: the producer emits one event and doesn't know or care how many consumers react. Adding a new consumer doesn't change the producer.

The mechanism varies: a whole topic broadcasts by default, or a fan-out exchange copies to every bound queue, or a single event is written to several queues. In streaming, each [consumer group](/t/consumer-group) gets its own copy for fan-out to different systems.

The classic mistakes:

- Wanting fan-out but using a queue. A queue delivers each message to one consumer, so only one service reacts. Use a topic/exchange or fan out to separate queues.
- Forgetting that fan-out amplifies** load.** One message becomes N messages and N actions; a burst of events can trigger a storm across all consumers. Bound and monitor the total downstream load.
- No isolation between consumers. If one consumer's processing is slow or fails, it shouldn't hold up the others — give each its own subscription/queue so they're independent (see [message broker](/t/message-broker)).
- Assuming all consumers get every message reliably. Durability and retention per consumer matter; an offline, non-durable subscriber misses messages (see [subscription](/t/messaging-subscription)).
- Ordering across consumers. Fan-out means the copies are independent; there's no cross-consumer ordering, and a consumer that's slow sees them later.
- Uncontrolled growth of consumers. Every new subscriber multiplies processing and cost; fan-out to many systems needs governance and observability.

**How to use it:** when several independent systems must each react to the same event, fan out to separate subscriptions/queues (or a topic), keeping consumers isolated so one doesn't block the rest. Watch the amplification — one event triggering many actions is powerful and easy to underestimate. It's the broadcast half of [queue vs topic](/t/queue-vs-topic).
