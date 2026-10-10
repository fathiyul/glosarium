---
title: "Deployment Stamps"
summary: "Deploying many independent copies of a whole system, e.g. one per region or customer group."
levels: { backend: staff }
aliases: ["deployment stamps", "stamps", "scale units"]
prereqs: ["multi-region", "cell-based-architecture"]
related: ["cell-based-architecture", "multi-region", "blast-radius"]
---
**Deployment stamps** (scale units) replicate a complete, self-contained copy of the service stack per unit of scale or isolation: each stamp serves its tenants/regions independently — same code and config, separate data, separate blast radius. Growth adds stamps; failures stay stamped; noisy neighbours never cross boundaries.

```text
stamp EU-1: [app + data + queue] serves tenants A–M
stamp EU-2: [app + data + queue] serves tenants N–Z (failure here touches only N–Z)
```

Stamps trade operational uniformity (identical automation deploys everywhere) for multiplied operations (N of everything to monitor, patch, back up). They suit SaaS tenant isolation, regional compliance and failure containment — the physical form of bulkheads at datacenter scale.

The classic mistakes:

- Snowflake stamps. Per-stamp customisation ("just this one tweak for EU-2") destroys uniformity and multiplies operational burden geometrically. Identical stamps, zero exceptions — variance lives in config, versioned centrally.
- Cross-stamp coupling. Shared databases, synchronous calls or joined queries between stamps reintroduce the fate-sharing stamps exist to prevent. Stamps share nothing synchronous.
- Rebalancing pain. Tenants outgrowing stamps (or stamps imbalanced) need live migration tooling — designed upfront, not improvised. Plan tenant movement from day one.
- Stamp-count explosion. Hundreds of micro-stamps multiply fixed operational overhead past reason. Size stamps to balance blast radius against operability (dozens, not thousands, typically).
- Global services unplaced. Auth, billing, search spanning stamps need explicit homes (their own stamps or a platform tier) — unowned globals become everyone's SPOF.
- Update coordination gaps. Fleet-wide changes (migrations, cert rotations, security patches) need orchestrated rollout across stamps with verification per stamp. Stamps don't remove coordination; they structure it.
- Monitoring per stamp neglected. Aggregated-only dashboards hide single-stamp degradation. Per-stamp health, alerts and SLOs — the blast radius you can't see is the one that burns.

**When to stamp:** tenant/regional isolation with failure containment worth multiplied operations. Uniform automation, zero coupling, migration tooling, per-stamp observability — bulkheads you can deploy.
