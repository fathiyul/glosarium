---
title: "Read Replica"
summary: "A copy of the database for serving reads."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["read replicas", "replica database", "follower database", "read-only replica", "standby for reads"]
prereqs: ["database-replication"]
related: ["database-replication", "replication-lag", "read-your-writes", "leader-follower", "horizontal-scaling", "eventual-consistency"]
core: [backend]
also: [database-operations]
---

A **read replica** is a copy of your database that stays up to date by following the primary's changes, and serves **read-only** queries. It takes load off the primary, which keeps handling all the writes.

```
app ── writes ──► PRIMARY ──(replication)──► REPLICA ◄── reads (reports, search pages, heavy SELECTs)
```

Cloud databases make it a setting: "create a read replica".

## Why use one

- **Scale reads**: most applications read far more than they write. Spreading reads across replicas increases capacity.
- **Isolate heavy queries**: run reports, exports and analytics on a replica, so they can't slow the main application ([OLTP vs OLAP](/t/oltp-vs-olap)).
- **Availability**: a replica can be promoted if the primary fails (with care).
- **Geography**: place replicas near users in other regions for lower read latency.

## The big catch: replication lag

Replication is usually **asynchronous**, so a replica is slightly behind the primary, perhaps milliseconds, perhaps minutes under heavy load or a long-running query. Reads from it may be **stale** ([replication lag](/t/replication-lag)).

The classic bug:

```python
db_primary.execute("UPDATE profiles SET name = 'Ana' WHERE id = 7")
profile = db_replica.query("SELECT name FROM profiles WHERE id = 7")     # may still say the old name!
```

The user saves, gets redirected, and sees their old data. Remedies ([read-your-writes](/t/read-your-writes)):

- **Read from the primary** after a write, for that user, for a short time, or for the critical paths.
- **Track a position** (a log sequence number or timestamp) from the write, and only use a replica that has caught up.
- **Accept staleness** for pages where it doesn't matter (public listings, dashboards).

## Practical points

- **Route deliberately.** Send writes and read-after-write queries to the primary. Send tolerant reads (reports, listings) to replicas. Frameworks and proxies can split by connection or by marking queries.
- **Monitor lag**, and fall back to the primary if it grows too large.
- **Queries on the replica can conflict** with the replication stream in some databases (long queries get cancelled, or delay replication). Know your database's settings.
- **Replicas still cost money**, and they don't help write-heavy workloads.
- **A replica isn't a backup.** A bad `DELETE` replicates to it.
- **Failover**: promoting a replica loses any writes it hadn't received yet, if replication was asynchronous.

Before adding replicas, check that [indexes and caching](/t/query-optimization) have been tried. They're often cheaper. See [database replication](/t/database-replication).
