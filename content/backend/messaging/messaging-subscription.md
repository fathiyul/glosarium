---
title: "Subscription"
summary: "A consumer's registration to receive messages from a topic."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["subscription", "message subscription", "subscriber"]
prereqs: ["message-broker", "pub-sub-pattern"]
related: ["consumer-group", "queue-vs-topic", "message-broker"]
---

A **subscription** is a consumer's registration to receive messages from a destination — a topic or queue. In pub/sub, subscribers subscribe to topics and each gets the messages; a subscription is the link between a consumer and the stream it wants.

```text
subscriber A → subscription → topic "orders"
subscriber B → subscription → topic "orders"   (both get every order event)
```

Subscriptions come in flavours:

- Durable vs ephemeral — a durable subscription survives the consumer being offline (messages are held/retained and delivered when it returns); an ephemeral one is tied to the connection and may miss messages while disconnected.
- Filtered — some brokers let a subscription filter on message attributes/headers, so a consumer only gets relevant messages.
- Shared vs exclusive — a shared subscription distributes messages among its members (work sharing); an exclusive one delivers to a single consumer (see [consumer group](/t/consumer-group)).

The classic mistakes:

- Assuming an ephemeral subscription holds messages. If the consumer is offline, messages may be lost. For anything that must not be missed, use a durable subscription (or a retained log).
- Confusing a subscription with a queue. A subscription is the *registration*; whether messages are shared or broadcast depends on the destination type and group (see [queue vs topic](/t/queue-vs-topic)).
- Never cleaning up subscriptions. Durable subscriptions that accumulate (abandoned consumers) retain messages and consume resources; manage their lifecycle.
- Ignoring retention limits on the broker. Even a durable subscription has a retention window; a consumer offline longer than that misses messages. Know the limit.
- Filtering mistakes. A filter that's too narrow silently drops messages the consumer needed; test filters and monitor delivery.
- Assuming order and exactly-once. A subscription delivers messages, but ordering and duplicate guarantees come from the broker's model (see [message ordering](/t/message-ordering)), not the subscription itself.

**How to use it:** choose durable for consumers that must not miss messages, ephemeral for best-effort live listeners; use shared subscriptions for work distribution and plain ones for broadcast; and manage the lifecycle to avoid accumulating long-lived, abandoned subscriptions. It's the connection between a consumer and a stream — get its durability and sharing model right, or messages are missed or duplicated. See [message broker](/t/message-broker).
