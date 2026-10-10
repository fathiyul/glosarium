---
title: "Synchronous vs Asynchronous Replication"
summary: "Waiting for replicas to confirm vs not, trading safety for latency."
levels: { backend: senior, data-engineer: senior }
aliases: ["synchronous replication", "asynchronous replication", "sync vs async replication"]
prereqs: ["database-high-availability", "wal"]
related: ["failover", "eventual-consistency", "database-high-availability"]
---

When you replicate, the question is whether a **commit** waits for replicas to acknowledge the change before it's considered done.

- Asynchronous replication — the primary commits and responds immediately; replicas catch up in the background. Fast, with no added commit latency. But if the primary fails before a replica received the latest commits, a failover **loses** them.
- Synchronous replication — the primary waits for one or more replicas to confirm they have the change before committing. No data loss on failover (the change is on the replica), but every commit pays the network round trip to the replica, increasing latency and coupling availability to the replica's responsiveness.

```text
async: commit now, replicate later     → fast, may lose recent writes on failover
sync:  commit after replicas ack        → durable, slower, replica availability matters
```

The trade-off is essentially the [CAP](/t/cap-theorem) tension at the replication level: durability and consistency versus latency and availability.

The classic mistakes:

- Assuming async replication loses nothing. It can — the classic failover surprise is missing recent transactions. Know your setup's loss window.
- Assuming sync makes commits free of latency. Synchronous commit adds the replica round-trip to every write, which can be significant across regions. Measure the impact.
- Coupling availability to a distant replica. If the sync replica is far away or unhealthy, commits slow or block. Many systems use a nearby sync replica for durability and async for far ones.
- Confusing "fully synchronous" with "quorum". Some systems require a majority (quorum) of replicas, which is more resilient than requiring one specific replica but also more coupling. Understand the exact rule.
- Mixing expectations. Developers assume durability the infrastructure doesn't guarantee. Document whether commits can be lost on failover, and design for it.
- Forgetting that a standby failover may still lose writes even in "sync" setups if the configuration isn't what you think. Test it.

**How to choose:** async for performance and simple setups, accepting a small loss window on failover. Sync (or quorum sync) when losing even recent committed transactions is unacceptable — accepting the latency and the dependency on replica health. A common middle ground: synchronous to a nearby replica for durability, asynchronous replication for distant read replicas. See [database high availability](/t/database-high-availability).
