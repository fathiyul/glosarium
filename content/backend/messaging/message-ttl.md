---
title: "Message TTL and Expiry"
summary: "Dropping or dead-lettering messages that are too old to matter."
levels: { backend: senior, data-engineer: senior }
aliases: ["message ttl", "message expiry", "ttl message"]
prereqs: ["message-queue", "ttl"]
related: ["dead-letter-queue", "visibility-timeout", "message-queue"]
---

A **message TTL** (time to live) sets how long a message remains valid in a queue or on a topic. After that time, the message is dropped (or moved to a dead-letter destination). It bounds how stale undelivered work can get, and prevents a backlog of obsolete messages from growing without limit.

```text
message enqueued at 10:00, TTL 1h
delivered before 11:00 → processed
still queued at 11:00  → expired: dropped or dead-lettered
```

The point: if a message is a time-sensitive instruction — "send this reminder", "retry this payment" — delivering it hours late may be worse than not delivering it at all. TTL enforces a freshness bound. It also protects the queue from accumulating stale messages when consumers are down for a long time.

The classic mistakes:

- No TTL on time-sensitive messages. A verification email delivered two days late is useless (and confusing). Set a TTL matched to the message's relevance.
- Expiring messages that must not be lost. If a message is critical, silently dropping it on expiry loses work. Route expired messages to a [dead-letter queue](/t/dead-letter-queue) so they're visible, rather than vanishing.
- TTL longer than retention/relevance. A TTL that exceeds the message's useful life just delays a pointless delivery. Match TTL to meaning.
- Forgetting queue-level vs message-level TTL. Some systems set TTL per queue, some per message, some both; know which you're configuring and how they combine.
- Assuming TTL equals delivery deadline. TTL is about *expiry in the queue*, not a guarantee of when it's processed; a message can expire even as a consumer is mid-processing, depending on semantics.
- Confusing TTL with visibility timeout. TTL is how long a message lives; the [visibility timeout](/t/visibility-timeout) is how long a delivered message stays hidden. Different timers.
- Disk quietly filling from a long backlog. Without TTL (and with retention), a stalled consumer's queue grows; TTL and retention set the ceiling (see [steady state](/t/steady-state)).

**When to use it:** whenever late delivery is worse than no delivery, or when a backlog could otherwise grow with obsolete messages — reminders, retries, time-boxed notifications, cache-invalidation events. Pair it with dead-lettering so expired messages are visible, not lost. It's [TTL](/t/ttl) applied to messaging, keeping queues bounded and messages relevant.
