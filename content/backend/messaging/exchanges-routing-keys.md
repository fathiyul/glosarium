---
title: "Exchanges and Routing Keys"
summary: "How brokers like RabbitMQ route a message to the right queues."
levels: { backend: senior, data-engineer: senior }
aliases: ["exchanges and routing keys", "exchange", "routing key"]
prereqs: ["message-broker", "queue-vs-topic"]
related: ["queue-vs-topic", "fan-out", "pub-sub-pattern"]
---

In brokers that support richer routing (notably AMQP systems like RabbitMQ), a producer publishes to an **exchange** rather than directly to a queue. The exchange applies rules — using the message's **routing key** and **bindings** — to decide which queues receive a copy.

```text
producer → exchange ──(routing rules)──▶ queue A
                    └──────────────────▶ queue B
```

The common exchange types:

- Direct — route by exact routing key (`"order.created"`).
- Topic — route by key patterns with wildcards (`"order.*"`, `"*.created"`).
- Fan-out — ignore the key; send to every bound queue (see [fan-out](/t/fan-out)).
- Headers — route by message header attributes rather than the key.

This gives flexible, decoupled routing: producers emit events with keys, and consumers bind queues with the patterns they care about, without producer or consumer knowing each other.

The classic mistakes:

- Confusing "topic exchange" with "topic" as a pub/sub destination. In AMQP, a topic *exchange* is a routing mechanism; the destination is still queues. Names collide across systems — read your broker's semantics (see [queue vs topic](/t/queue-vs-topic)).
- Unroutable messages silently dropped. A message whose key matches no binding is discarded by default in many brokers. Use a dead-letter exchange or "alternate exchange" to catch them, or you lose messages invisibly.
- Overly clever routing. Complex binding graphs are hard to reason about and debug; a message quietly going nowhere (or everywhere) is a common surprise. Keep routing simple and observable.
- Fan-out storms. A fan-out exchange multiplying one message into many queues amplifies load; be sure the fan-out is intended and bounded (see [fan-out](/t/fan-out)).
- Binding lifecycle ignored. Queues must be bound to the exchange; a missing binding (after a redeploy) stops delivery. Treat bindings as configuration to manage.
- Assuming order across queues. Routing to multiple queues means no ordering relationship between them.

**How to use it:** lean on exchanges for flexible, decoupled routing — direct for exact keys, topic patterns for categories, fan-out for broadcast — but keep the rules simple, always handle unroutable messages (dead-letter/alternate exchange), and manage bindings like code. It's the routing layer of the broker, and it's where "who receives this?" is decided. See [message broker](/t/message-broker).
