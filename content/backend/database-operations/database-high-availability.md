---
title: "Database High Availability"
summary: "Automatic failover for databases, with tools like Patroni."
levels: { backend: senior, data-engineer: senior }
aliases: ["database high availability", "database ha", "database failover"]
prereqs: ["failover", "backups"]
related: ["sync-vs-async-replication", "disaster-recovery", "database-upgrades", "logical-vs-physical-backup"]
---

**Database high availability (HA)** keeps a database serving through hardware or node failures. A single database node is a single point of failure: if it dies, everything depending on it stops. HA replicates the data to standby nodes and **fails over** — promoting a standby to primary — when the primary fails, ideally automatically.

```text
primary ──replicate──▶ standby 1
        └────────────▶ standby 2
primary fails → promote a standby → clients reconnect to the new primary
```

The pieces: replication (keep standbys current), failure detection (notice the primary is down), failover (promote a standby), and client redirection (point the app at the new primary). Managed databases usually provide all of this; self-managed setups use tools like Patroni or orchestrators.

The classic mistakes:

- Confusing HA with backups. A standby faithfully replicates mistakes — a `DELETE` or corruption propagates. HA is for *availability*; [backups](/t/backups) and [point-in-time recovery](/t/point-in-time-recovery) are for *recovery*. You need both.
- Assuming failover loses nothing. With [asynchronous replication](/t/sync-vs-async-replication) (the common, faster default), a failover can lose the last few committed transactions. If that's unacceptable, understand the durability trade-off.
- Split-brain. A network partition can leave two nodes thinking they're primary, both accepting writes — a mess to reconcile. Quorum and fencing mechanisms exist to prevent it; configure them.
- No client redirection. If the app connects to a fixed address, promotion doesn't help it find the new primary. Use a stable endpoint, a proxy, or a failover-aware client.
- Untested failover. Failover that's never practised often fails when needed. Test it — deliberately, like a [game day](/t/game-day).
- Forgetting the read replicas. Applications reading from replicas must handle a promoted replica and replication lag; reads may be stale or the topology may change.
- Overestimating the benefit. HA keeps the database up; it doesn't fix application bugs, query load, or data loss. It's one layer.

**How to get it:** replicate to standbys, monitor, automate failover (or use a managed service), point clients at a stable endpoint, test failovers, and pair it with tested backups and PITR. Understand the async-replication loss window, and design the application to tolerate a brief failover and possibly stale reads. See [streaming vs logical replication](/t/streaming-vs-logical-replication) and [disaster recovery](/t/disaster-recovery).
