---
title: "Distributed Monolith"
summary: "Microservices so coupled they must deploy together: the worst of both worlds."
levels: { backend: senior }
aliases: ["distributed monolith", "monolith in disguise", "distributed ball of mud"]
prereqs: ["monolith", "microservices"]
related: ["monolith", "microservices", "modular-monolith"]
---
A **distributed monolith** pays microservices' costs for a monolith's benefits (i.e., none of either): separately deployed services that must release together, share a database, call each other synchronously in cascading chains — distribution's latency, failure modes and operational burden with none of its independence.

```text
"microservices": A ⇄ B ⇄ C (lockstep deploys, shared DB, sync chains)
reality: one system, N network hops of latency, N² failure paths
```

Symptoms diagnose it: coordinated releases ("we deploy the whole system on Fridays"), cross-service transactions, shared tables, version-locked APIs, and outages cascading through synchronous chains. The services are deployment theatre over a coupled design.

The classic mistakes:

- Splitting before boundaries exist. Decomposing along technical layers (UI service, logic service, data service) instead of domains guarantees coupling with hops. Boundaries follow business capabilities, not tiers.
- Shared database retained. Separate deploys over one schema keep every coupling that matters while adding network partitions. Data ownership first; deployment follows.
- Synchronous chains. A→B→C call graphs multiply latency and failure probability with each hop. Async boundaries and autonomy, or admit the monolith.
- Independent scaling theatre. Services that must scale together (locked request ratios) gain nothing from separate scaling. Scale units follow load independence.
- Conway denial. One team owning five "services" gets deployment pain without ownership benefit. Align services to teams that actually work independently.
- Rewriting to escape. A second distributed rewrite repeats the coupling with new tools. Consolidate first (modular monolith), then split along proven seams.

**The escape:** admit it (name the coupling honestly), consolidate logic into modules, split data ownership, then separate deployables along demonstrated seams. Distribution is earned by independence — never assumed into existence.
