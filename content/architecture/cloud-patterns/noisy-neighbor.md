---
title: "Noisy Neighbor"
summary: "One tenant or workload hogging shared resources and slowing others down."
levels: { backend: senior }
aliases: ["noisy neighbor", "noisy neighbour", "multi-tenant interference"]
prereqs: ["multi-tenancy", "backpressure"]
related: ["multi-tenancy", "bulkhead", "load-shedding"]
---
The **noisy neighbor** problem: one tenant's burst degrades everyone sharing the infrastructure — CPU stolen, I/O saturated, queues flooded, rate limits consumed collectively. Multi-tenancy's efficiency (shared resources) meets its core risk (shared fate), and the design answer is isolation: quotas, bulkheads, priority and noisy-capable architecture throughout.

```text
tenant A ×100 burst → shared DB saturates → tenants B…Z suffer equally
fixed: per-tenant quotas + bulkheads + priority → A's burst contained
```

Mitigations layer: admission control per tenant (quotas, rate limits), resource bulkheads (pools, queues, partitions per tenant or tier), priority scheduling (interactive over batch, paid tiers over free), and noisy-aware capacity (headroom plus fast scale for bursts).

The classic mistakes:

- No per-tenant limits. Shared infrastructure without quotas lets any tenant consume everything. Limit first; optimise second.
- Global rate limits only. One shared bucket punishes quiet tenants for loud ones. Limit per tenant (and per endpoint within tenants).
- Unpartitioned noisy data. One tenant's hot keys saturating shared shards needs tenant-aware partitioning or isolation (dedicated shards for whales).
- Priority blindness. Treating free-tier scrapers and paying interactive users identically wastes goodwill and revenue. Tier service deliberately.
- Burst capacity absent. Zero headroom turns every burst into universal degradation. Buffer plus autoscale plus shed — in that order.
- Blame without attribution. "The system is slow" without per-tenant metrics can't identify (or bill, or throttle) the noise. Attribute resource use per tenant always.
- One giant pool. Shared everything (threads, connections, queues) maximises interference surface. Partition critical resources by tenant tier at least.

**How to contain it:** quota per tenant, bulkhead shared resources, prioritise by value, attribute usage precisely. Shared infrastructure with private guarantees — isolation engineered, not assumed.
