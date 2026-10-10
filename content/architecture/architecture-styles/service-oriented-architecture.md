---
title: "Service-Oriented Architecture"
summary: "An older style of large shared services, often joined by an enterprise bus."
levels: { backend: senior }
aliases: ["service-oriented architecture", "SOA", "soa services"]
prereqs: ["microservices", "enterprise-integration-patterns"]
related: ["microservices", "enterprise-integration-patterns", "distributed-monolith"]
---
**Service-Oriented Architecture (SOA)** organises capabilities as interoperable services with standard contracts — typically coarse-grained business services communicating through an enterprise service bus, governed centrally. Microservices' enterprise ancestor: same service thinking, bigger services, heavier governance, standardised integration.

```text
coarse business services (billing, inventory, CRM) ↔ ESB ↔ consumers
contracts standardised, governed, versioned centrally
```

SOA's lessons (service boundaries, contracts, reuse) endure; its failure modes instruct: governance bottlenecks (central boards slowing every change), ESB as coupling hub (smart pipes centralising logic), and coarse services changed by committee (independence in name only). Microservices kept the services and devolved the governance.

The classic mistakes:

- ESB-centric design. Central buses with transformation and routing logic become the distributed monolith's nervous system — single point of coupling, change and failure. Smart endpoints, dumb pipes.
- Governance theatre. Architecture boards approving every service change strangle delivery without improving design. Govern contracts and security; free implementations.
- Coarse-grained dogma. Services so large ("EnterpriseCustomerService") that teams queue to change them recreate monolith contention with network hops. Size by team autonomy.
- Standardisation overreach. Mandating one stack, one bus, one database for all services trades fit for uniformity. Standardise interfaces; diversify implementations.
- Reuse mandates. Forced service reuse across divergent needs produces compromise services serving nobody well. Duplicate where contexts differ; share where genuinely common.
- Versioning by committee. Centrally-managed versions moving at the slowest consumer's pace freeze evolution. Compatibility plus autonomy beats coordinated upgrades.
- Dismissing it entirely. SOA's contract discipline, service inventory and governance questions recur in every microservice estate that matures. Learn the answers, skip the bureaucracy.

**Its place:** history and lineage — the enterprise service vision microservices refined. Reuse its contract thinking; devolve its governance; keep the pipes dumb.
