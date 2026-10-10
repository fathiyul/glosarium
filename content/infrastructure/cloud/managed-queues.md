---
title: "Managed Queues (SQS, Pub/Sub)"
summary: "Message queues run by the cloud provider."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["sqs", "cloud message queue", "pub/sub queue"]
prereqs: ["message-queue", "cloud-computing"]
related: ["dead-letter-queue", "at-least-once", "idempotence", "queue-vs-topic", "backpressure"]
---

A **managed queue** is a [message queue](/t/message-queue) that the cloud provider runs for you. Instead of operating a broker, you create a queue and start sending and receiving messages; the provider handles durability, replication and scaling. Examples include Amazon SQS, Google Cloud Pub/Sub and Azure Service Bus.

The point of a queue is to decouple. A producer drops a message and moves on; a consumer processes it later. That smooths bursts — the queue absorbs load the consumers can't handle at once — and lets a slow or failed consumer be retried without blocking the producer.

```text
producer ──▶ [ queue ] ──▶ consumer
              messages        retries on failure
```

Queues come in two broad shapes: a work queue where each message goes to one consumer, and a topic that fans out a copy to each subscriber. See [queue vs topic](/t/queue-vs-topic) and [publish-subscribe](/t/pub-sub-pattern).

The classic mistakes:

- **Assuming exactly-once delivery.** Most managed queues deliver *at least once*, so a message can arrive twice. Make consumers idempotent — processing the same message again should do no harm (see [at-least-once](/t/at-least-once) and [idempotence](/t/idempotence)).
- **Forgetting a dead-letter queue.** A message that always fails will be redelivered forever. Route repeatedly failing messages to a [dead-letter queue](/t/dead-letter-queue) so you can inspect them and keep the main queue moving.
- A visibility timeout that's too short. The message becomes visible again while the consumer is still working, so it gets processed twice concurrently. Set it longer than typical processing time.
- Using a queue as unbounded storage. A growing backlog is a signal, not a fix. Watchers on queue depth are how you spot consumers falling behind (see [backpressure](/t/backpressure)).

Managed queues are a good default when you want decoupling without running a broker. If you need ordering, richer routing, or very low latency, weigh a self-hosted [message broker](/t/message-broker) instead.
