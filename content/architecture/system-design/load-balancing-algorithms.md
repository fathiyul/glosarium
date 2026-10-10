---
title: "Load Balancing Algorithms"
summary: "Round robin, least connections and consistent hashing."
levels: { backend: senior }
aliases: ["load balancing algorithms", "balancing strategies", "round robin least connections"]
prereqs: ["load-balancer", "l4-vs-l7-load-balancing"]
related: ["load-balancer", "consistent-hashing", "hot-partition"]
---
**Load balancing algorithms** decide which backend serves each request: round-robin (take turns — simple, assumes equal servers), least-connections (pick the emptiest — adapts to uneven work), weighted variants (stronger servers take more), consistent hashing (same key → same server — for caches and stateful affinity), plus latency-aware and power-of-two-choices schemes.

```text
round-robin:        A B C A B C… (even, oblivious)
least-connections:  whoever is emptiest (adapts to slow requests)
consistent-hash:    key K always → server B (cache-friendly, minimal remap)
```

No algorithm is best — only best-matched: uniform stateless servers suit round-robin; variable request costs suit least-connections; cache locality suits consistent hashing; heterogeneous fleets need weights.

The classic mistakes:

- Round-robin over uneven work. Long requests pile randomly while short ones fly; least-connections adapts where round-robin hopes.
- Ignoring server heterogeneity. New big instances and old small ones splitting evenly wastes the big and drowns the small. Weight by capacity.
- Hashing without minimal disruption. Naive modulo hashing remaps everything on membership change, emptying caches. Consistent hashing moves only K/n keys.
- Sticky by accident. Hash-based affinity persisting beyond its purpose (a deploy, a debug session) unbalances load silently. Affinity needs expiry and intent.
- Health-blind balancing. Sending traffic to a server failing health checks because the algorithm says "its turn" is configuration, not bad luck. Gate every algorithm on health.
- Thundering new members. A fresh server receiving full share immediately (cold caches, cold JIT) stumbles; warm up gradually (slow start).
- One algorithm everywhere. Edge, service mesh and application layers face different traffic; tune per layer.

**How to choose:** uniform → round-robin; uneven costs → least-connections; cache affinity → consistent hashing; mixed fleet → weights; always health-gated, warmed gradually. The algorithm expresses assumptions about work — state them.
