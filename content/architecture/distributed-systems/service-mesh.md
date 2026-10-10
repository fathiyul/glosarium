---
title: "Service Mesh"
summary: "Infrastructure handling service-to-service traffic, retries and mTLS."
levels: { backend: senior, data-engineer: senior }
aliases: ["service mesh", "istio linkerd", "sidecar mesh"]
prereqs: ["service-discovery", "sidecar"]
related: ["sidecar", "service-discovery", "zero-trust"]
---
A **service mesh** moves service-to-service concerns — discovery, load balancing, retries, mTLS, telemetry, policy — out of application code into a dedicated infrastructure layer: sidecar proxies beside every instance, controlled centrally. Applications call plain HTTP; the mesh makes it resilient, observable and secure.

```text
app → localhost sidecar (retry? TLS? route? record) → network → sidecar → app
```

The payoff is uniform capability without per-language libraries: retries with budgets, circuit breaking, traffic splitting, mutual TLS and golden metrics everywhere, configured once. The price is operational surface (control plane, proxy fleet, certificate rotation) and per-hop latency/resource overhead.

The classic mistakes:

- Mesh for a monolith. Two services gain nothing from a control plane, sidecars and mTLS rotation. Meshes pay off past dozens of services with polyglot stacks.
- Retry amplification. Every sidecar retrying independently multiplies load geometrically under partial failure. Budgets, hedges and circuit breaking tuned mesh-wide, not per default.
- mTLS without identity story. Encrypted hops with unauthenticated identities add cost without security. Pair with workload identity (SPIFFE-style) and authorisation policy.
- Observability bills. Per-hop spans and metrics at high cardinality explode tracing/storage costs. Sample, aggregate, and budget telemetry like any production expense.
- Control-plane fragility. A downed control plane freezing data-plane updates (or worse, draining config) halts adaptation. Harden and cache; data planes must survive control outages.
- Debugging through layers. App→sidecar→network→sidecar→app multiplies "where did it break" surfaces. Mesh-aware tracing and consistent header propagation are prerequisites, not extras.
- Big-bang adoption. Flag-day mesh rollouts across fleets break in correlated ways. Migrate namespace by namespace with rollback paths.

**When to adopt:** polyglot microservice fleets needing uniform resilience, security and observability without per-stack libraries. Small or single-stack systems get further with good libraries and gateways.
