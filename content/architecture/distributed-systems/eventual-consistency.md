---
title: "Eventual Consistency"
summary: "Replicas converge once updates stop, but reads may be stale in the meantime."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["eventually consistent", "eventual consistency model", "BASE", "weak consistency"]
prereqs: ["database-replication", "cap-theorem"]
related: ["strong-consistency", "consistency-models", "cap-theorem", "replication-lag", "read-your-writes", "base-model"]
core: [backend]
---

**Eventual consistency** is a guarantee that if no new updates are made, **all copies of the data will eventually converge to the same value**. In the meantime, different readers may see different (stale) values.

```
t=0   write "name = Ana" to replica A
t=1   reader asks replica B  →  still sees "name = Bo"   (stale: the update hasn't arrived)
t=2   update propagates to B
t=3   reader asks replica B  →  sees "Ana"               (converged)
```

You use eventually consistent systems every day: DNS changes take time to spread, social media like counts differ between refreshes, a CDN serves slightly old pages, and database read replicas lag behind the primary ([replication lag](/t/replication-lag)).

## Why accept it

It allows systems to be **fast, available and scalable**: a node can answer or accept a write without waiting to coordinate with every other node ([CAP theorem](/t/cap-theorem)). The cost is that **you must handle staleness and conflicts**.

## Strong vs eventual

| | **Strong consistency** | **Eventual consistency** |
|---|---|---|
| Reads see the latest write | Always | Not immediately |
| Latency and availability | Higher latency, may refuse requests during partitions | Low latency, stays available |
| Programming model | Simple: behaves like one copy | You design around staleness |
| Typical for | Money, inventory, locks, coordination | Feeds, caches, analytics, sessions, search indexes |

See [strong consistency](/t/strong-consistency) and [consistency models](/t/consistency-models) (there's a spectrum between the two).

## What eventual consistency means for you

- **Users can see stale data.** Design the UI for it: show "updating...", use optimistic updates, and avoid confusing flows where someone saves and sees the old value ([read-your-writes](/t/read-your-writes), [optimistic updates](/t/optimistic-update)).
- **Concurrent writes can conflict.** Decide how to resolve them: last-write-wins (simple, loses data), merging, or special data types designed to merge automatically (CRDTs), or ask the user.
- **Make operations idempotent**, since retries and reordering happen ([idempotency](/t/idempotence)).
- **Don't use it where wrong answers are costly**: balances, stock levels at purchase time, uniqueness checks. Use strongly consistent operations there.
- **Cross-service data** is usually eventually consistent: one service updates, then publishes events that others apply later ([cross-service consistency](/t/cross-service-consistency), [sagas](/t/saga-pattern)).
- **"Eventually" has no fixed bound.** Monitor how long convergence actually takes.

The **BASE** acronym (basically available, soft state, eventual consistency) describes this style, as a counterpart to ACID ([BASE](/t/base-model)).
