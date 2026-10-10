---
title: "Push vs Pull Consumers"
summary: "The broker delivering messages vs consumers fetching them at their own pace."
levels: { backend: senior, data-engineer: senior }
aliases: ["push vs pull", "push consumers", "pull consumers"]
prereqs: ["message-broker", "backpressure"]
related: ["backpressure", "queue-depth", "consumer-group", "message-broker"]
---

Messaging systems deliver in one of two directions:

- Push — the broker sends messages to the consumer as they arrive. Delivery is immediate, but the broker must know how fast each consumer can handle, or it floods them.
- Pull (poll) — the consumer asks the broker for the next batch when it's ready. The consumer controls the rate, which naturally provides **backpressure**: a slow consumer simply polls less.

```text
push: broker → consumer  (broker decides when to send)
pull: consumer → broker  (consumer decides when to fetch)
```

The trade-off is who controls flow. Push is lower latency and simpler for always-ready consumers, but risks overwhelming a slow one unless it supports flow control (credit/window). Pull gives natural rate control and batch efficiency, at the cost of some latency (polling interval) and empty polls when there's no work.

Streaming platforms (Kafka-style) are pull-based, and that's a big reason they scale: consumers read at their pace, track offsets, and can't be flooded. Many brokers offer both modes.

The classic mistakes:

- Push without flow control. A broker that pushes regardless of consumer speed floods a slow consumer, growing its in-memory buffer until it crashes (see [backpressure](/t/backpressure)). Push needs credit/window or the consumer must reject.
- Pull with too-aggressive polling. A tight poll loop hammers the broker with empty requests; use long-polling or sensible intervals.
- Pull starving latency. If a message arrives just after a poll, it waits for the next poll interval. Tune the interval or use long-poll to balance latency and load.
- Assuming push means ordered/fast processing. Push changes latency, not ordering or idempotency; those depend on the broker's model (see [message ordering](/t/message-ordering)).
- Mixing models carelessly. A consumer expecting pull but receiving push (or vice versa) mishandles messages; know which your client uses.
- No visibility into lag. With pull, a consumer that stops polling just falls behind — watch [consumer lag](/t/queue-depth) to catch it.

**How to choose:** pull when consumers have variable speed, need batching, or you want built-in backpressure — the default for scalable stream processing. Push when low latency matters and consumers are ready or support flow control. Either way, ensure a slow consumer can't be overwhelmed and that lag is monitored. See [message broker](/t/message-broker).
