---
title: "Database Federation"
summary: "Splitting databases by function, e.g. users and orders in separate databases."
levels: { backend: senior }
aliases: ["database federation", "federated database", "polyglot database"]
prereqs: ["sharding", "microservices"]
related: ["sharding", "database-per-service", "polyglot-persistence"]
---
**Database federation** splits data across specialised stores behind a unified access layer: each service owns its database (relational for transactions, search engine for text, warehouse for analytics), and federation — a gateway, virtualisation layer or disciplined APIs — presents coherent access. It's [polyglot persistence](/t/polyglot-persistence) with a formal front door.

```text
app → federation layer → {orders DB, search index, warehouse, cache}
```

The appeal is fit plus coherence: each workload gets its ideal store without every client learning five query languages. The cost is the layer itself — query planning across stores, inconsistent transactions (joins become application code), and a new component to operate and scale.

The classic mistakes:

- Cross-store joins in hot paths. Federated joins over the network are slow and untransactable; denormalise or accept eventual consistency instead of joining live.
- Assuming transactions span stores. They don't (without exotic coordination). Design operations to tolerate partial application with compensation.
- Federation as a dumping ground. Routing every query through one layer makes it the bottleneck and the blast radius. Federate deliberately; let bulk paths bypass.
- Schema drift across stores. Each store evolves independently until the "unified" view lies. Version and test the federation contract like an API.
- Ignoring the operational stack. Five stores means five backups, upgrades and monitors — federation adds a sixth system. Count the total honestly.
- Single-vendor lock dressed as federation. A "federation layer" that's really one product's proprietary gateway trades openness for convenience. Prefer open protocols at boundaries.

**When to use it:** genuinely mixed workloads where one store can't serve (transactions + search + analytics) and clients need one door. Otherwise prefer fewer stores — federation's coherence costs real complexity.
