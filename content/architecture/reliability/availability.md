---
title: "Availability"
summary: "The share of time a system is usable, often measured in \"nines\"."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["availability", "high availability", "uptime"]
prereqs: ["reliability", "nines-of-availability"]
related: ["nines-of-availability", "fault-tolerance", "redundancy"]
---
**Availability** is the proportion of time a system serves successfully: uptime divided by total time, usually expressed in nines. It measures *serving* — successful responses — not just process liveness, and it's always scoped (per service, per region, per time window), because unscoped availability claims are meaningless.

```text
availability = successful responses / total requests (over a window)
99.9% monthly ≈ 43 minutes of failure budget
```

Designing for availability means removing single points (redundancy), failing fast and over (failover), degrading gracefully (limited function beats none), and recovering quickly (MTTR matters as much as MTBF). Every nine costs roughly an order of magnitude more than the last — the budget conversation, not the technology, usually sets the target.

The classic mistakes:

- Nines without windows. "99.99% available" over what period, measured how, excluding what? Unscoped nines are marketing. Scope, measure, exclude explicitly (planned maintenance? dependencies?).
- Counting process uptime. A running process returning errors is 100% "up" and 0% available. Measure successful responses from the client's perspective.
- Redundancy without failover testing. Standbys that never take over fail when needed (stale data, broken config, capacity drift). Test the switchover, not just the standby's existence.
- Correlated redundancy. Two copies in one rack/AZ/region share fate; "redundant" systems failing together is the normal incident, not the freak one. Spread across real failure domains.
- Availability at any consistency. Serving stale or wrong answers "successfully" inflates availability while users suffer. Define successful to include correctness bounds.
- Chasing nines past value. Each nine costs ~10×; users rarely notice past three for non-critical paths. Spend the nines where downtime costs most.

**How to engineer it:** redundancy across domains, tested failover, graceful degradation, fast recovery — tracked as scoped, client-measured nines. Availability is a budget to spend where it matters, not a trophy to maximise everywhere.
