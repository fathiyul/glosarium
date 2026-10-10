---
title: "Rolling Deployment"
summary: "Replacing instances a few at a time."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["rolling update", "rolling deployment", "gradual rollout"]
prereqs: ["deployment", "health-check"]
related: ["blue-green-deployment", "canary-release", "k8s-deployment", "progressive-delivery", "load-balancer"]
---

A **rolling deployment** replaces instances of the old version with the new one in batches. Instead of stopping everything and starting everything, the orchestrator takes down a few instances, starts the new version, verifies they're healthy, and moves on. Done well, users see no downtime and the fleet is never all-down.

```text
v1 v1 v1 v1
v2 v1 v1 v1   →   v2 v2 v1 v1   →   v2 v2 v2 v1   →   v2 v2 v2 v2
```

It's the default strategy for [Kubernetes Deployments](/t/k8s-deployment) and most load-balanced services. The batch size and the pause between batches are tunable: more at once is faster but riskier, fewer is slower but gentler.

The classic mistakes:

- **No health check.** If the new instances are considered ready before they actually serve traffic, the load balancer sends requests to broken pods (see [health checks](/t/health-check)). Readiness probes exist for exactly this.
- **Replacing everything at once.** Set the batch small enough that a fraction of capacity remains, and keep enough headroom that the survivors can carry the load during the swap.
- **Ignoring mixed-version compatibility.** For a while, old and new versions run side by side and share the same database and queues. A change that only one version understands breaks during the overlap.

When not to use it: a rolling deploy can't switch every instance at the same instant, so it's not ideal if you need an atomic flip. Use [blue-green](/t/blue-green-deployment) for an all-at-once switch, or a [canary release](/t/canary-release) to send a small slice of real traffic to the new version before replacing the rest. Both are forms of [progressive delivery](/t/progressive-delivery).
