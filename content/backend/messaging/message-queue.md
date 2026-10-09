---
title: "Message Queue"
summary: "A buffer where producers leave messages for consumers to process later."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["queue", "message queues", "MQ", "queueing", "SQS", "RabbitMQ"]
prereqs: ["message", "background-job"]
related: ["message-broker", "producer-consumer", "queue-vs-topic", "dead-letter-queue", "at-least-once", "message-acknowledgement"]
core: [backend]
---

A **message queue** is a buffer between **producers** (who send messages) and **consumers** (who process them). The producer drops a message in the queue and moves on, and a consumer picks it up when it's ready. They don't have to run at the same time, at the same speed, or know about each other.

```
Producer ─► [ m5 | m4 | m3 | m2 | m1 ] ─► Consumer
 (web app)         the queue            (worker)
```

Examples of services and brokers: RabbitMQ, Amazon SQS, Google Cloud Pub/Sub, Azure Service Bus and others ([message brokers](/t/message-broker)).

## What it gives you

- **Decoupling**: the sender doesn't wait for, or depend on, the receiver being up.
- **Smoothing load**: a spike of requests piles up in the queue, and workers process it at a steady pace instead of falling over.
- **Asynchronous work**: send the email or generate the report in the background ([background jobs](/t/background-job)).
- **Scaling**: add more consumers to drain the queue faster.
- **Resilience**: if a consumer crashes, the message is still there to be retried.

```python
# Producer
queue.send({"type": "send_welcome_email", "user_id": 42})

# Consumer
while True:
    msg = queue.receive()
    send_welcome_email(msg["user_id"])
    queue.ack(msg)             # tell the broker it's done, so it can delete it
```

## How it behaves

- In a classic queue, **each message goes to one consumer** (point-to-point). Compare with **topics** where every subscriber gets a copy ([queue vs topic](/t/queue-vs-topic)).
- The consumer **acknowledges** a message when done. No ack means it's redelivered ([acknowledgement](/t/message-acknowledgement), [visibility timeout](/t/visibility-timeout)).
- Delivery is usually **at-least-once**, so handlers must be idempotent ([at-least-once](/t/at-least-once)).
- Order is **not always guaranteed**, especially with several consumers ([message ordering](/t/message-ordering)).
- Messages that keep failing go to a [dead letter queue](/t/dead-letter-queue).

## Things to watch

- **Queue depth** and message age. A growing queue means consumers aren't keeping up ([queue depth](/t/queue-depth)).
- **Message size limits**: put big data in storage, and send a reference.
- **Added complexity**: you now have a system to run, monitor and debug, and failures become asynchronous (harder to trace). Use a correlation ID.
- **Not a database.** Don't use it for long-term storage or for querying data.
- Use a queue when work can be deferred and doesn't need an immediate answer. If the caller needs the result now, make a direct call.
