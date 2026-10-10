---
title: "Blue-Green Deployment"
summary: "Switching traffic between two identical environments."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["blue green", "blue-green deploy", "traffic switch"]
prereqs: ["deployment", "load-balancer"]
related: ["rolling-deployment", "canary-release", "rollback", "deploy-vs-release", "feature-flags"]
---

**Blue-green deployment** runs two identical environments. One — say blue — serves live traffic. You deploy the new version to the idle green environment, test it, then switch the [load balancer](/t/load-balancer) or DNS to point at green. If something's wrong, switch back to blue, which is still running the old version.

```text
            ┌── blue  (v1) ── receiving traffic
router ─────┤
            └── green (v2) ── deployed, being tested

switch ▶   green receives traffic; blue kept for rollback
```

The appeal is the **instant switch**: traffic moves all at once, and rollback is just pointing the router back. No waiting for instances to drain one by one. Frontend and backend both benefit, since the whole stack flips together.

The classic mistakes:

- **Incompatible data changes.** Both environments usually share the same database. If v2 changes the schema in a way v1 can't read, switching back to blue no longer works. Make migrations backward-compatible for one release (expand, then contract).
- **Assuming the switch is free.** You need double the infrastructure while both run, and in-flight requests or sticky sessions can straddle the switch. Drain connections cleanly.
- Testing nothing. The point of a separate environment is a last check before the switch. If you flip blindly, you've just paid for two copies of a risky deploy.

When not to use it: when doubling the environment or the database change is too costly. A [rolling deployment](/t/rolling-deployment) replaces instances in place, and a [canary release](/t/canary-release) sends a small slice of traffic first. Separating [deployment from release](/t/deploy-vs-release) with [feature flags](/t/feature-flags) often gives the same safety for less cost.
