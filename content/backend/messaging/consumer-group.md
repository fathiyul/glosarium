---
title: "Consumer Group"
summary: "Consumers sharing the work from a topic."
levels: { backend: senior, data-engineer: mid-level }
aliases: ["consumer group", "consumer groups", "group id"]
prereqs: ["queue-vs-topic", "message-broker"]
related: ["topics-partitions", "consumer-offset", "fan-out", "kafka"]
---

A **consumer group** is a set of consumers that share a single logical subscription, so each message goes to **exactly one member** of the group. It's how a topic (which normally broadcasts to every subscriber) supports *work sharing*: the group acts like a queue, but you can run many consumers to scale throughput.

```text
topic "events" → group "email"  → one of {worker A, worker B, worker C}
                → group "search" → one of {indexer A, indexer B}
```

Two benefits at once:

- Scaled, shared processing — add consumers to the group to process more in parallel; each message is handled once by the group.
- Independent fan-out across groups — different groups each get their own copy of every message, so several systems can react to the same events independently (see [fan-out](/t/fan-out)).

The classic mistakes:

- One group where you need several. Two different teams both putting consumers in the *same* group means they compete and each message goes to only one — someone misses events. Different concerns need different groups.
- Several groups where you need one. Giving each worker its own group means every worker sees every message — duplicated work. Workers sharing a workload belong in one group.
- Ignoring rebalancing. When consumers join or leave a group, partitions/assignments are **rebalanced**; during that, processing pauses for affected partitions, and mis-handled rebalances cause duplicate or missed processing. Handle it (short processing, commit before rebalance).
- Assuming a group is stateless. A group tracks progress (offsets); duplicates can occur around rebalances or restarts. Idempotent handlers matter (see [idempotence](/t/idempotence)).
- Tying group lifetime to consumers. A group's progress should persist even if all consumers stop, so a later restart resumes where it left off — where the broker supports it (see [consumer offset](/t/consumer-offset)).
- Expecting global ordering. Within a group, ordering is per partition, not across the whole topic (see [topics and partitions](/t/topics-partitions)).

**How to use it:** one group per logical consumer of a stream; scale the group's members to match the partitions; different systems use different groups to each get every message. It's the mechanism that reconciles "broadcast to interested systems" with "process in parallel without duplication", and it's central to stream processing. See [consumer offset](/t/consumer-offset) and [Kafka](/t/kafka).
