---
title: "Message Broker"
summary: "Middleware like RabbitMQ that routes messages."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["message broker", "broker", "message-oriented middleware"]
prereqs: ["message-queue", "message"]
related: ["pub-sub-pattern", "queue-vs-topic", "producer-consumer", "message-ordering"]
---

A **message broker** is the middleware that carries messages from producers to consumers. Instead of services calling each other directly, producers send messages to the broker, which stores them and delivers them to consumers according to routing rules. It decouples the two sides: the producer doesn't need to know who consumes, and the consumer can be slow, down, or scaled independently.

```text
producer ──▶ broker ──routing──▶ queue/topic ──▶ consumers
```

What a broker provides:

- Buffering — messages wait while consumers catch up, absorbing bursts.
- Routing — send to a queue, a topic, by routing key, or by filter (see [queue vs topic](/t/queue-vs-topic)).
- Delivery guarantees — persistence, acknowledgements, retries (see [acknowledgement](/t/message-acknowledgement)).
- Decoupling — add or remove consumers without touching producers.

Examples span from simple queue services to full streaming platforms; the concepts (queues, topics, acks, offsets) transfer across them.

The classic mistakes:

- Treating it as a database. A broker buffers and delivers; it's not where you store data long-term. Retention is limited, and consumers are expected to process. Don't use it as the source of truth.
- Ignoring delivery semantics. Most brokers give at-least-once delivery; consumers must be idempotent. Exactly-once is either unavailable or has caveats (see [delivery guarantees](/t/delivery-guarantees)).
- Assuming order. Ordering is often only guaranteed per queue/partition, not globally (see [message ordering](/t/message-ordering)). Design for the guarantee you have.
- No dead-lettering. A message that always fails loops or blocks; route repeated failures to a [dead-letter queue](/t/dead-letter-queue).
- Underestimating operations. Brokers are infrastructure to run, monitor, back up and secure; a managed service removes some of that. A broker outage can halt much of the system.
- Overusing it. Not every call needs a broker; a direct call or a database queue may be simpler. Adding one is an architectural commitment.

**When to use one:** when you need asynchronous, decoupled, reliable message passing — background jobs, events between services, fan-out, stream processing. It's the backbone of [producer-consumer](/t/producer-consumer) and [event-driven](/t/event-driven-architecture) designs. For simple cases, a database-backed queue may suffice (see [database as a queue](/t/database-as-queue)); for scale and fan-out, a broker earns its place.
