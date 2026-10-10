---
title: "Redundancy"
summary: "Extra components so a single failure isn't fatal."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["redundancy", "redundant systems", "n+1 redundancy"]
prereqs: ["single-point-of-failure", "failover"]
related: ["single-point-of-failure", "failover", "bulkhead"]
---
**Redundancy** eliminates single points by duplicating critical components: two power feeds, three database replicas, N+1 app servers — so any one failure leaves service intact. It's availability's bluntest instrument: don't prevent failure, survive it by having spares.

```text
single:    [DB]           → failure = outage
redundant: [DB] [DB] [DB] → failure = failover (if tested)
```

Redundancy only works with the machinery around it: failure detection (know it's dead), failover (shift work automatically), and independence (spares that share fate aren't spares). Untested, correlated redundancy is expense without safety.

The classic mistakes:

- Correlated spares. Replicas in one rack, AZ or region fail together; "redundant" systems with shared fate fail as one. Spread across genuine failure domains.
- Untested failover. Standbys with stale data, broken config or insufficient capacity fail on takeover. Redundancy untested is redundancy imagined — rehearse regularly.
- N+1 arithmetic without margins. Exactly-one-spare assumes failures arrive singly and repairs are instant; overlapping failures and slow repairs need N+2 thinking for critical paths.
- Redundant but inconsistent. Replicas diverged (lag, split-brain, untested promotion) serve wrong answers after failover. Redundancy includes consistency machinery.
- Ignoring common-mode software. Three replicas running the same buggy version fail identically; redundancy covers hardware and zones, not correlated software faults. Version diversity (or fast rollback) for software risk.
- Active-passive rot. Cold standbys decay (config drift, data staleness, skill atrophy) precisely because they're never used. Active-active or frequent active testing keeps spares honest.
- Redundancy theatre. Duplicating the easy components while the single load balancer, DNS or human process remains singular. Map *all* single points, not the convenient ones.

**How to build it:** duplicate across real domains, automate detection and failover, rehearse constantly, mind correlated faults. Redundancy is the price of surviving failure — pay it where outages cost most.
