---
title: "Liveness vs Readiness"
summary: "\"Am I running?\" vs \"Can I take traffic?\""
levels: { backend: mid-level, data-engineer: mid-level }
also: [kubernetes]
aliases: ["liveness vs readiness", "liveness probe", "readiness probe"]
prereqs: ["health-check", "failover"]
related: ["health-check", "load-balancer", "self-healing"]
---
Kubernetes-style health checks split in two: **liveness** ("is it dead? restart it") and **readiness** ("can it serve? send traffic"). Liveness failures trigger restarts; readiness failures trigger removal from load balancing without restart. Confusing them restarts things that needed patience, or routes traffic to things that needed restarting.

```text
liveness fails → restart the container (it's stuck)
readiness fails → stop sending traffic (starting up, overloaded, draining)
```

Readiness gates rollouts (new pods serve only when ready), drains (terminating pods stop receiving while finishing), and dependency outages (unready when the database is unreachable — shedding load instead of erroring). Liveness stays narrow: deadlock, unrecoverable corruption — restart-only conditions.

The classic mistakes:

- Liveness checking dependencies. A database blip restarts every app pod simultaneously — converting a downstream hiccup into a full restart storm. Liveness checks the process, never its dependencies.
- Readiness always true. A trivially-passing readiness probe routes traffic to warming, migrating or overloaded instances. Gate on genuine servability (migrations done, caches warm, dependencies reachable).
- Same endpoint for both. One check can't express "alive but not servable." Separate endpoints with separate semantics.
- Over-aggressive liveness. Tight periods on slow-starting apps kill them during startup (crash loops from impatience). Initial delays and generous liveness periods; strictness belongs to readiness.
- Missing startup probe. Long-starting containers need startup-gated liveness (don't judge until started). Without it, slow starts die as "unhealthy."
- Probes without timeouts. A hanging probe is worse than a failing one — workers pile behind it. Every probe gets its own short timeout.
- Ignoring probe load. Hundreds of kubelets hitting a heavy health endpoint becomes real traffic. Keep probes cheap; cache expensive checks.

**The split:** liveness = restart-worthy stuckness (rare, narrow); readiness = servability (broad, dynamic). Route on readiness, restart on liveness, check dependencies only in readiness.
