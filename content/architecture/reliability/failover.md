---
title: "Failover"
summary: "Switching to a standby when the primary fails."
levels: { backend: senior, data-engineer: senior }
aliases: ["failover", "automatic failover", "fail over"]
prereqs: ["redundancy", "health-check"]
related: ["single-point-of-failure", "split-brain", "rpo-rto"]
---
**Failover** shifts work from a failed primary to a standby: detect (health checks, heartbeats), decide (automatic thresholds or declared disaster), redirect (DNS, load balancer, client discovery), verify (standby actually serving). Done well it's a non-event; done poorly it's a second outage wearing a rescue costume.

```text
detect (unhealthy) → fence old primary → promote standby → redirect traffic → verify
```

The hard parts are fencing (the old primary must stop acting, not just stop receiving), data recency (how much committed work the standby lacks — the RPO question), and client redirection (every client learning the new endpoint, including cached DNS and sticky sessions).

The classic mistakes:

- Unfenced failover. Old primary still writing while the new serves splits the world (see [split brain](/t/split-brain)). Fence first, promote second — without exception.
- Untested automation. Failover code paths exercised only during real outages fail in correlated ways. Rehearse regularly, including DNS/client propagation realities.
- Flapping. Marginal health triggering repeated failover/failback oscillates users between halves. Hysteresis, hold-downs and manual re-entry gates calm transitions.
- Capacity fiction. Standbys sized for idle collapsing under full load turn rescue into overload. Failover targets need headroom — tested under real traffic shape.
- Client caches ignored. DNS TTLs, connection pools and discovery caches keep sending users to the corpse for minutes. Redirection must account for every client type.
- Data-loss blindness. Async replication gaps mean committed writes vanish on promotion; know the RPO, communicate it, design around it where it matters.
- Failback forgotten. Emergency topology calcifying (split data, divergent config) seeds the next incident. Plan return-to-normal with equal rigour.

**How to build it:** health-gated detection, fenced promotion, rehearsed redirection, verified serving — plus honest RPO and a failback plan. Failover is a procedure with automation, not automation with hopes.
