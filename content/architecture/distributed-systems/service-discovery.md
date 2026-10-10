---
title: "Service Discovery"
summary: "How services find each other's addresses."
levels: { backend: senior, data-engineer: senior }
aliases: ["service discovery", "service registry", "dynamic discovery"]
prereqs: ["dns", "load-balancer"]
related: ["service-mesh", "coordination-service", "dns"]
---
**Service discovery** answers "where is service X right now?" in environments where addresses churn: containers reschedule, instances scale, versions roll. A registry tracks live instances (registered on start, heartbeated, deregistered on stop); clients resolve through it — via DNS, client-side lists, or a mesh data plane.

```text
payments v2 (3 instances) → registry → client picks healthy one → calls
instance dies → deregistered → traffic shifts automatically
```

Two patterns dominate: client-side discovery (clients fetch lists and balance themselves — smart clients, fast failover) and server-side (a load balancer/router resolves — dumb clients, central control). DNS-based discovery trades propagation delay for universality; registries trade a component for immediacy.

The classic mistakes:

- Stale entries. Dead instances lingering in discovery blackhole traffic until TTLs expire. Aggressive health checking plus short TTLs plus active ejection.
- DNS TTL blindness. Minute-long DNS caching turns failover into a slow bleed. Discovery DNS needs seconds-level TTLs (or bypass DNS for data-plane resolution).
- Thundering re-resolution. Thousands of clients refetching lists simultaneously storms the registry; stagger, cache and back off.
- No health depth. "Port open" ≠ healthy — discovery must reflect readiness (dependencies up, warmed, in-service), not just liveness.
- Registry as single point. Discovery down means nothing finds anything; replicate, cache client-side with graceful degradation to last-known-good.
- Version blindness. v1 and v2 instances indistinguishable in discovery breaks canaries and migrations. Version-tagged discovery with subset routing.
- Hardcoded fallbacks. Static IPs "just in case" bypass discovery permanently once primary hiccups. Fallbacks expire; discovery stays authoritative.

**How to run it:** heartbeated registry, health-gated entries, short TTLs, client caching with stale fallback, version-aware subsets. In dynamic infrastructure, discovery is the address book — keep it live and truthful.
