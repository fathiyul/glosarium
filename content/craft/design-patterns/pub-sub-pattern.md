---
title: "Publish-Subscribe"
summary: "Senders publish to topics; receivers subscribe without knowing each other."
levels: { backend: mid-level, frontend: mid-level }
aliases: ["Pub/Sub", "PubSub", "Publish/Subscribe"]
prereqs: ["observer-pattern"]
related: ["observer-pattern", "message-broker", "queue-vs-topic", "event-bus", "message"]
also: [messaging, integration]
---

Publish-subscribe, often called pub/sub, is a pattern where publishers send messages to a topic, and subscribers receive the messages for the topics they chose. The publisher and the subscribers don't know each other. Something between them, a channel, an event bus or a message broker, routes each message to the interested parties.

It appears in two forms. Inside one process, an event bus does the routing:

```python
class EventBus:
    def __init__(self):
        self._subs = {}

    def subscribe(self, topic, handler):
        self._subs.setdefault(topic, []).append(handler)

    def publish(self, topic, message):
        for handler in self._subs.get(topic, []):
            handler(message)

bus = EventBus()
bus.subscribe("order.placed", lambda m: print("email receipt for", m["id"]))
bus.subscribe("order.placed", lambda m: print("update stock for", m["id"]))
bus.publish("order.placed", {"id": 1042})
```

Across services, a [message broker](/t/message-broker) holds the topics. Publishers send to a topic, and each subscriber gets its own copy of the messages, which is called fan-out. Whether a message goes to one consumer or to all of them depends on whether the destination is a [queue or a topic](/t/queue-vs-topic).

The difference from the [observer pattern](/t/observer-pattern) is the middle layer. In observer, the subject holds references to its observers and calls them directly, so the two are linked. In pub/sub, publishers and subscribers have no references to each other, and the channel does the routing. A publisher can add a subscriber without changing any publisher code.

The trade-off is that the flow is harder to follow, since no single place lists who receives a message. Delivery can be delayed, duplicated or lost depending on the broker, and debugging needs tracing. The classic mistake is assuming that publishing is the same as a function call, so a failure in a subscriber goes unnoticed. Plan for retries, idempotent handlers and visibility into what each subscriber did.
