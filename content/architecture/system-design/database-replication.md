---
title: "Database Replication"
summary: "Copying data to other servers for availability and read scaling."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["DB replication", "replication", "leader-follower replication", "primary replica", "master-slave replication"]
prereqs: ["relational-database"]
related: ["read-replica", "leader-follower", "replication-lag", "multi-leader", "read-your-writes", "eventual-consistency"]
core: [backend]
also: [database-operations]
---

**Database replication** keeps **copies of the same data on several servers**. Writes go to one place, and changes are streamed to the others. It improves **availability** (a copy can take over if one server dies), enables **read scaling** (spread reads over copies), and supports backups and reporting
without loading the main database.

The most common setup is **leader–follower** (also called primary–replica, formerly master–slave):

```
writes ──► LEADER ──(stream of changes)──► FOLLOWER 1 ◄── reads
                                  └──────► FOLLOWER 2 ◄── reads
```

All writes go to the leader, which logs the changes and sends them to followers, who apply them in order ([leader-follower](/t/leader-follower), [read replicas](/t/read-replica)).

## Synchronous or asynchronous

| | Synchronous | Asynchronous |
|---|---|---|
| The leader confirms a write... | After at least one follower has it too | Immediately, without waiting |
| Durability on leader failure | Strong: the data exists elsewhere | A recent write may be lost |
| Write latency | Higher, and blocked if a follower is down | Low |
| Typical use | Critical data, often one sync follower | Most replicas |

Many systems use a mix (one synchronous follower, the rest asynchronous).

## The consequences to design for

- **Replication lag**: asynchronous followers are a little behind, sometimes by milliseconds, sometimes much more under load. A read from a follower might not show a write that just happened ([replication lag](/t/replication-lag)).
- **Read-your-writes problems**: a user saves a profile, the next page reads from a lagging replica, and shows the old data. Route a user's reads to the leader briefly after their write, or use a consistency token ([read-your-writes](/t/read-your-writes)).
- **Failover**: when the leader fails, a follower must be **promoted**, detecting the failure correctly, avoiding two leaders at once ("split brain") and handling writes the old leader hadn't replicated ([split brain](/t/split-brain)).
- **Eventual consistency** across copies ([eventual consistency](/t/eventual-consistency)).
- **Schema changes and large writes** can create lag.

## Other topologies

**Multi-leader** (several places accept writes, with conflict resolution) and **leaderless** (any node, with quorums) exist for geographic distribution and high availability, with harder consistency stories ([multi-leader](/t/multi-leader), [quorum](/t/quorum)).

Replication isn't a **backup**. A mistaken `DELETE` replicates to every copy instantly. You still need point-in-time backups.
