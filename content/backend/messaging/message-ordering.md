---
title: "Message Ordering"
summary: "When and how messages arrive in order."
levels: { backend: senior, data-engineer: senior }
aliases: ["message ordering", "ordered messages", "ordering guarantees"]
prereqs: ["topics-partitions", "consumer-group"]
related: ["topics-partitions", "consumer-group", "message-headers", "consumer-offset"]
---

**Message ordering** is whether messages are processed in the order they were produced. In many messaging systems, the honest answer is "not globally, and only sometimes per key". Assuming order you don't have leads to bugs like applying events backwards (a "cancel" processed before the "create", or an old value overwriting a newer one).

The usual guarantees:

- Global ordering across a topic/queue is rare and expensive; most systems don't provide it.
- Per-partition ordering is common in streaming (see [topics and partitions](/t/topics-partitions)): messages in the same partition are ordered, but across partitions there's none.
- Per-key ordering is achievable by keying messages so the same entity always lands in the same partition — then that entity's messages stay ordered while different entities parallelise.

```text
key = userId → same user's events ordered; different users interleave freely
```

The classic mistakes:

- Assuming global order. Consumers see messages across partitions in any order. Code that relies on "the last message is the newest" breaks.
- Parallelism defeating order. Adding consumers to a group processes partitions in parallel; if you needed order across all messages, parallelism is at odds with it. Key to the required granularity.
- Retries and redelivery reordering. A retried message can arrive after newer ones; a timeout-and-redeliver can process an old message late. Idempotent, order-aware handlers help (see [idempotence](/t/idempotence)).
- Hot keys and skew. If you key for ordering by a single value (a global key), everything goes to one partition — ordered but not parallel. Choose the key to balance ordering needs and throughput.
- Fixed-timestamp assumptions. Using wall-clock timestamps to order events across machines is fragile (clock skew); use the producer's sequence or the broker's ordering, not naive timestamps (see [last write wins](/t/last-write-wins)).
- Forgetting that ordering and delivery guarantees interact. At-least-once retries can reorder; exactly-once doesn't automatically mean globally ordered.

**How to handle it:** decide *what* must be ordered (usually per entity, not everything), key messages so those land in one partition, make consumers tolerate duplicates and out-of-order arrival where possible, and store a sequence/timestamp for reconciliation if order truly matters. Don't assume ordering the system doesn't promise — see [consumer group](/t/consumer-group) and [event streaming](/t/event-streaming).
