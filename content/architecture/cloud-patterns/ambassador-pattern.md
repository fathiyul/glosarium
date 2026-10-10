---
title: "Ambassador"
summary: "A helper proxy that handles networking concerns for a service."
levels: { backend: senior }
aliases: ["ambassador", "ambassador pattern", "outbound proxy sidecar"]
prereqs: ["sidecar", "service-discovery"]
related: ["sidecar", "gatekeeper", "service-mesh"]
---
The **ambassador** pattern offloads outbound connectivity to a local proxy: the application calls localhost (as if the dependency were local); the ambassador handles discovery, load balancing, retries, TLS and monitoring. Every language gets production-grade outbound behaviour without client libraries — the proxy speaks resilience so apps don't have to.

```text
app → localhost:8080 (ambassador) → discovery → healthy instance (TLS, retried, timed)
```

Ambassadors shine in polyglot fleets and legacy modernisation (old apps gain retries/TLS/observability untouched), and as the conceptual unit under service meshes (each mesh sidecar is an ambassador plus inbound duties). The proxy owns the *how* of calling; the app owns the *what*.

The classic mistakes:

- Business logic in the proxy. Routing rules encoding product decisions turn infrastructure config into untested application code. Connectivity only; meaning stays in apps.
- Stale discovery. Cached endpoint lists outliving membership changes route to corpses. Short TTLs, health-gated lists, fast ejection.
- Retry amplification. Every ambassador retrying independently multiplies load under partial failure. Budgets, backoff and breaker integration mesh-wide.
- TLS identity gaps. Encrypted hops without workload identity add cost without authentication. Pair with identity (certs/SPIFFE-style) and policy.
- Unmonitored localhost. "Just localhost" hiding latency, errors and saturation from observability. Proxy metrics are first-class signals — collect them.
- Configuration drift. Per-team ambassador configs diverging produce inconsistent resilience postures. Manage proxy config centrally, versioned, reviewed.
- Single-dependency focus. One ambassador per downstream multiplies sidecars; shared outbound proxies (per host) balance isolation against overhead deliberately.

**When to use it:** polyglot outbound resilience without per-language libraries, legacy hardening without rewrites, and as mesh building blocks. Connectivity standardised once, used everywhere.
