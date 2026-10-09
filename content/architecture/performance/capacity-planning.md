---
title: "Capacity Planning"
summary: "Predicting and providing the resources needed for future load."
levels: { backend: senior, data-engineer: senior }
aliases: ["capacity management", "resource planning", "forecasting capacity", "sizing infrastructure"]
prereqs: ["back-of-envelope", "scalability"]
related: ["back-of-envelope", "scalability", "load-testing", "horizontal-scaling", "finops", "nines-of-availability"]
core: [backend]
---

**Capacity planning** is ensuring that the system will have **enough resources (compute, memory, storage, network, database capacity, licenses) for the load it will face**, before the load arrives, without wasting money on resources it won't use. Under-provisioning causes outages and slowness. Over-provisioning wastes budget.

## The basic loop

1. **Know current usage and the load drivers.** Requests per second, data growth, active users, batch sizes, and the resources they consume (CPU, memory, I/O, connections).
2. **Find the relationship** between load and resources: "each 1,000 requests per second needs about 4 cores", "each million users adds 200 GB".
3. **Forecast load**: organic growth, seasonality (holidays, month-end, sales), planned launches and marketing events, new customers. Include **peaks**, not just averages ([percentiles](/t/percentile)).
4. **Compute needed capacity**, including **headroom**: a target utilization well below 100% so spikes and failures are absorbed (many teams plan for roughly 50 to 70% peak utilization, but it depends on the workload).
5. **Account for failure**: if one node or zone dies, can the rest carry the load (N+1, N+2 redundancy) ([redundancy](/t/redundancy))?
6. **Account for lead time**: how long does it take to add capacity (instant autoscaling, or weeks to order hardware and approve a budget)?
7. **Validate with load tests** ([load testing](/t/load-testing)) and watch real metrics.
8. **Repeat regularly**, and compare forecasts with reality.

## Measuring the right things

- **Utilization and saturation**, per resource: CPU, memory, disk I/O, network, database connections, queue depth ([USE method](/t/use-method), [metrics](/t/metrics)).
- **The bottleneck.** Capacity is set by the *first* resource to run out, often a database or a downstream dependency, not the web servers.
- **Efficiency per unit of work**, to watch for regressions: a release that doubles CPU per request halves your capacity.

## Practical considerations

- **Autoscaling helps but has limits**: scale-up delay, quotas, cold starts, the database that doesn't scale with it. Don't treat it as a substitute for planning.
- **Cloud makes it flexible, not free.** Know the cost per unit and set budgets ([FinOps](/t/finops)).
- **Plan for non-linear behavior**: systems degrade sharply as they approach saturation (queues grow, latency explodes), so linear extrapolation fails.
- **Storage grows monotonically** unless you manage retention and archiving ([data retention](/t/data-retention)).
- **Plan for events**: launches, campaigns, seasonal peaks, with a known date and a test beforehand.
- **Quotas and limits**: cloud service quotas, API limits, connection limits and licenses can bite before CPU does.
- **Document assumptions** and review them as the product changes.

## Mindset

Capacity planning is **reducing surprises**. A rough estimate with clear assumptions and a regular check beats a precise model nobody updates. Combine quick estimation ([back-of-the-envelope](/t/back-of-envelope)) with measurement, and keep headroom for the unexpected.
