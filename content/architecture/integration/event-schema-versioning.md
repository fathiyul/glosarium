---
title: "Event Schema Versioning"
summary: "Evolving event formats without breaking consumers."
levels: { backend: senior, data-engineer: mid-level }
aliases: ["event schema versioning", "schema evolution events", "event versioning"]
prereqs: ["schema-registry", "event-driven-architecture"]
related: ["schema-registry", "backward-compatibility", "event-vs-command"]
---
**Event schema versioning** evolves event shapes without breaking consumers: additive optional fields (safe), renamed/removed fields (breaking — needs major version or dual-publish), and compatibility rules enforced at publish time. Producers deploy daily; consumers upgrade quarterly — versioning bridges the cadence gap.

```text
v1: OrderPlaced {id, total} → v2 adds +couponCode (optional) → old consumers ignore
breaking: renaming total→amount → v3 topic (or dual-publish v2+v3 during migration)
```

Registries enforce compatibility (reject breaking publishes in CI), upcasters translate old→new at consumption, and retention windows bound how many versions coexist. The discipline mirrors API versioning — with slower consumers and no synchronous negotiation.

The classic mistakes:

- Unversioned evolution. Renaming fields casually breaks every lagging consumer simultaneously. Version from the first event; never "just" change shapes.
- Breaking without dual-publish. Cutting consumers to a new version before they migrate drops events silently. Publish old+new during migration windows; retire by metrics, not dates.
- Required new fields. Mandatory additions break old producers/consumers both directions. New fields optional with defaults, always.
- Semantic changes under same version. Same field, new meaning (cents→dollars, UTC→local) corrupts silently where renames would fail loudly. Version meaning changes as breaking.
- Infinite version support. Supporting v1–v9 forever multiplies testing and translation paths. Sunset with announced windows and migration assistance.
- No compatibility CI. Rules documented but unenforced decay within quarters. Registry checks gating publishes make compatibility automatic.
- Events versioned but code untested. Translation paths (upcasters, dual readers) need tests per version pair, not just the current shape.

**The practice:** versioned from day one, additive by default, dual-publish across breaking changes, registry-enforced compatibility, sunset by metrics. Events outlive their producers' deploy cadence — version like it.
