---
title: "Replication Lag"
summary: "Followers falling behind the leader."
levels: { backend: senior, data-engineer: senior }
aliases: ["replica lag", "replication delay", "follower lag", "stale reads from replicas", "replication latency"]
prereqs: ["database-replication", "read-replica"]
related: ["read-your-writes", "read-replica", "database-replication", "eventual-consistency", "consistency-models", "leader-follower"]
core: [backend]
---

**Replication lag** is the **delay between a write on the leader and that write becoming visible on a follower (replica)**. With asynchronous replication, followers are always slightly behind: milliseconds when things are healthy, seconds or minutes under heavy write load, big transactions, network problems or a struggling replica.

```
t=0     write committed on LEADER
t=0.05  FOLLOWER A applies it (lag 50 ms)
t=2.5   FOLLOWER B applies it (lag 2.5 s, busy replaying a large batch)
a read from B at t=1 → sees the OLD value
```

## Anomalies it creates

| Anomaly | What the user experiences |
|---|---|
| **Read-your-writes violation** | You update your profile and reload. You see the old data, as the read hit a lagging replica ([read-your-writes](/t/read-your-writes)) |
| **Monotonic read violation** | A page shows a new comment, you refresh and it **disappears**, because the second request hit a more-lagged replica. Time seems to go backward |
| **Consistent-prefix violation** | You see an answer before the question it responds to, because writes replicated out of order across partitions |
| **Stale decisions** | Business logic reads stale data from a replica and acts on it (checks stock, approves a transfer) |

## What causes large lag

- **Write bursts** and large or long transactions that take time to replay.
- **Slow replicas**: weaker hardware, heavy read queries competing with replication, or a replica doing backups.
- **Single-threaded replay** on the follower, which can't keep up with a multi-core leader's writes.
- **Network issues** and cross-region distance.
- **Schema changes and bulk operations.**

## Mitigations

- **Route reads that need freshness to the leader**: after a user's own write (for a short window), or for critical flows (payments, inventory).
- **Session or token-based consistency**: record the write's position (log sequence number or timestamp) and only read from replicas that have caught up to it.
- **Sticky routing**: send a user's reads to the same replica to avoid backward time travel.
- **Use synchronous or semi-synchronous replication** for some followers, at the cost of write latency and availability ([database replication](/t/database-replication)).
- **Design the UI** to tolerate it: show the user's own change immediately (optimistic updates) ([optimistic updates](/t/optimistic-update)).
- **Limit what replicas serve**: reports and analytics tolerate lag. Transactional reads often don't.
- **Reduce lag**: smaller transactions, throttle bulk jobs, scale the replica, parallel replication where supported.

## Monitor it

Track lag per replica as a first-class metric, alert on thresholds, and automatically take lagging replicas out of rotation (or fall back to the leader). Test what your application does when lag is five seconds, because it will be, sometimes.

It's the most common concrete form of [eventual consistency](/t/eventual-consistency) that developers meet.
