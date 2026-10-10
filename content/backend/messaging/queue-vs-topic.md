---
title: "Queue vs Topic"
summary: "Point-to-point (each message to one consumer) vs pub/sub (each message to every subscriber)."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["queue vs topic", "queue and topic", "queue vs topic semantics"]
prereqs: ["message-queue", "pub-sub-pattern"]
related: ["pub-sub-pattern", "consumer-group", "fan-out", "message-broker"]
---

The two fundamental messaging destinations differ in *how many consumers receive each message*:

- Queue — each message is delivered to **one** consumer. Multiple consumers compete to take messages off the queue (work distribution), and each message is processed once. This is the pattern for distributing jobs across workers.
- Topic — each message is delivered to **every** subscriber. Subscribers each get their own copy (fan-out), so one event can trigger several independent reactions. This is the pattern for broadcasting events.

```text
queue:  producer → [q] → one of {consumer A, consumer B, ...}   (work sharing)
topic:  producer → [t] → consumer A, consumer B, consumer C     (broadcast)
```

Choosing is a design decision: are you *distributing work* (queue) or *notifying many interested parties* (topic)? Getting it wrong means either duplicating work or having consumers miss events. Many systems combine them: a topic fans out to queues, and each queue is drained by a group of competing workers.

The classic mistakes:

- Using a queue when you need broadcast. If three services each need to react to an event, a queue delivers it to only one of them. Use a topic (or fan it out to three queues).
- Using a topic when you want work sharing. If a topic is consumed by N workers each processing every message, you do the work N times. Use a queue (or a topic plus a consumer group that shares one logical subscription).
- Forgetting consumer groups. On a topic, a *consumer group* is the way to get "one copy per group, shared within the group" — combining broadcast across groups with work-sharing within one (see [consumer group](/t/consumer-group)).
- Assuming a topic is a durable store. A topic broadcasts; whether it retains messages for late subscribers depends on the system (a log retains; a simple pub/sub may not).
- No fan-out control. Broadcasting to many subscribers amplifies load; a single event can trigger a storm of processing. Bound and monitor (see [fan-out](/t/fan-out)).
- Confusing the words across systems. "Topic" means different things in different brokers (some topics are queues). Understand your broker's semantics rather than assuming.

**How to choose:** queue for distributing work where each message should be handled once; topic for broadcasting where each interested party needs the message. Reach for [consumer groups](/t/consumer-group) when you need both. It's the first question in designing any messaging topology — see [message broker](/t/message-broker).
