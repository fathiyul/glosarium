---
title: "N-Tier Architecture"
summary: "Separating presentation, logic and data into tiers."
levels: { backend: mid-level, frontend: mid-level }
aliases: ["n-tier architecture", "three-tier architecture", "tiers"]
prereqs: ["layered-architecture", "mvc"]
related: ["layered-architecture", "monolith", "client-server"]
---
**N-tier architecture** splits a system into physically separate **tiers** — typically presentation (UI), logic (application server) and data (database) — each deployable on its own machines and communicating over the network. Where layered architecture organises code, n-tier organises deployment: the tiers are runtime boundaries, not just module boundaries.

```text
browser → web tier → application tier → database tier
```

The separation buys independent scaling (add app servers without touching the database tier) and a security posture (only the app tier reaches the database). The price is network hops between every tier and the operational weight of deploying and monitoring several pieces.

The classic mistakes:

- Treating tiers as layers. If all three "tiers" deploy as one unit on one box, you have layering with extra latency, not n-tier — the deployment independence is the point.
- Chatty tier boundaries. Fine-grained calls across the network multiply round trips; tier interfaces should be coarse.
- Scaling the wrong tier. Most systems bottleneck at the data tier while teams scale the stateless app tier; find the real constraint first.
- Security by tier confusion. Tiers don't authenticate each other automatically — validate and authorise at every boundary, since any tier may be reached directly.
- Two-tier relapse. Putting business logic in stored procedures or in the client collapses the model; the logic tier earns its place by owning the rules.

**When to use it:** the classic shape for business applications with distinct scaling and trust needs per tier. For simpler systems a monolith or modular monolith is less machinery; for independently-evolving capabilities, services per domain fit better. See [layered architecture](/t/layered-architecture) for the code-level cousin.
