---
title: "Sidecar"
summary: "A helper process deployed alongside each service."
levels: { backend: senior, data-engineer: senior }
aliases: ["sidecar", "sidecar pattern", "sidecar container"]
prereqs: ["service-mesh", "ambassador-pattern"]
related: ["service-mesh", "ambassador-pattern", "gatekeeper"]
---
A **sidecar** attaches a helper process to each service instance — same host/pod, shared fate, localhost communication — handling cross-cutting duties: proxying, logging, config reloads, auth token refresh, health reporting. The application stays focused; the sidecar absorbs operational concerns uniformly across stacks.

```text
[pod: app ↔ sidecar] → sidecar: proxy, ship logs, rotate certs, report health
```

Sidecars shine for polyglot fleets (one implementation serves every language) and for concerns that evolve independently (observability agents update without app redeploys). Service meshes are sidecars at scale; ambassadors and adapters are specialised siblings.

The classic mistakes:

- Sidecar as dumping ground. Business logic, transformations and routing rules migrating into sidecars create distributed monoliths in YAML. Sidecars handle operations; apps handle meaning.
- Resource blindness. A proxy sidecar per instance doubles container counts and adds per-hop CPU/memory/latency — budgeted fleet-wide, not per service.
- Version skew. Sidecars updating independently of apps break protocol assumptions silently. Version and test the pair; roll both deliberately.
- Shared-fate violations. Sidecars reaching across instances (shared caches, cross-talk) break the blast-radius model. One sidecar, one instance, localhost only.
- Startup ordering. Apps racing unready sidecars (proxy not listening, config not loaded) fail mysteriously on cold start. Order explicitly; gate readiness on sidecar health.
- Logging duplication. App logs plus sidecar-captured stdout shipping twice doubles volume and confuses correlation. One pipeline, deduplicated.
- Security boundary confusion. Sidecars with app-equivalent privileges widen compromise blast radius. Least privilege per container, even side by side.

**How to use them:** operational concerns, polyglot uniformity, independent lifecycles — with resources budgeted, versions paired, and business logic firmly elsewhere. The sidecar pattern is separation of concerns at deployment granularity.
