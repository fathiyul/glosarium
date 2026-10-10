---
title: "Regions and Availability Zones"
summary: "Geographic locations, and isolated data centers within them."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["regions and zones", "availability zone", "multi-az"]
prereqs: ["cloud-computing", "compute-instance"]
related: ["fault-tolerance", "latency", "disaster-recovery", "cloud-providers", "multi-cloud"]
---

Cloud providers organize infrastructure into **regions** and **availability zones**. A region is a geographic area — a city or country. Inside each region are several availability zones (AZs): separate data centers with independent power, cooling and networking, close enough that traffic between them is fast but isolated enough that one failing doesn't take down the others.

```text
Region: eu-west
 └── AZ a ──┐
 └── AZ b ──┤  independent power, cooling, network
 └── AZ c ──┘
```

This shapes two decisions:

- Latency and residency. Put resources near users, and in regions that satisfy data-residency rules.
- Resilience. Spread replicas across AZs so the loss of one data center doesn't take you down. That's the first step of [fault tolerance](/t/fault-tolerance) and [disaster recovery](/t/disaster-recovery).

Frontend teams feel this directly: a user in one continent hitting servers on another pays a delay on every request, and latency is a top web-performance cost, so pair regions with a [CDN](/t/cdn) for static assets.

The classic mistakes:

- Everything in one AZ. It's cheaper in cross-zone traffic, but a single data-center event takes the whole service down. Run at least two AZs for anything that must stay up.
- Assuming multi-region is just more AZs. Regions are far apart, so cross-region traffic is slower, consistency is harder, and cost rises. Design for it deliberately rather than copying the multi-AZ pattern.
- Putting a shared database in one zone while app servers are spread out — the database is then the single point of failure.

The trade-off is cost and complexity versus resilience. Cross-AZ and cross-region traffic is billed, so choose the smallest spread that meets your availability target. Spreading across providers for extra independence is [multi-cloud](/t/multi-cloud), a much bigger step.
