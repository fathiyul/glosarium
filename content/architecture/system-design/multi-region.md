---
title: "Multi-Region Architecture"
summary: "Running in several regions for lower latency and resilience."
levels: { backend: staff, frontend: staff, data-engineer: staff }
aliases: ["multi-region architecture", "active-active regions", "global architecture"]
prereqs: ["disaster-recovery", "multi-leader"]
related: ["disaster-recovery", "cdn", "read-your-writes"]
---
**Multi-region architecture** serves users from several geographic regions — for latency (nearby serving), resilience (surviving regional failure), and compliance (data residency). Designs span active-passive (one serves, others stand by) to active-active (all serve, data replicates or partitions), with DNS/anycast steering and data strategy as the hard parts.

```text
users → nearest region (serve) ; data → replicate / partition by residency
region fails → traffic shifts (designed, tested failover)
```

The cost ladder climbs steeply: multi-region reads (easy, replicas/CDN), multi-region writes (conflicts, coordination), and compliance-bounded data (residency partitions that can't merge). Most systems should climb only as far as latency, resilience and law actually demand.

The classic mistakes:

- Active-active without conflict design. Multi-region writes need resolution (CRDTs, LWW with eyes open, partitioned ownership) — discovered at the first split-brain otherwise.
- Untested failover. DNS shifts, capacity elsewhere, data lag — regional failover fails in exactly the ways never rehearsed. Game-day the region loss, not just the node loss.
- Data gravity ignored. Moving compute multi-region while data stays single-region buys latency nowhere and complexity everywhere. Data strategy leads; compute follows.
- Residency as an afterthought. GDPR-style boundaries drawn through a globally-replicated store require painful surgery. Partition residency from the start where law demands it.
- Capacity elsewhere assumed. Failover regions need headroom for the surge — idle capacity or fast autoscaling with tested limits. Hope is not headroom.
- Consistent-everywhere expectations. Cross-region strong consistency costs hundreds of milliseconds per write; scope it to the operations truly needing it.
- Operational multiplication. Every region multiplies deploys, monitors, incidents and on-call context. Count the human cost alongside the latency win.

**How to adopt:** read-globally first (CDN, replicas), write-locally where possible, go active-active only with conflict and residency designs proven. Regions are easy to draw and expensive to run — expand deliberately.
