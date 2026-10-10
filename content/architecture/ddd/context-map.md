---
title: "Context Map"
summary: "How bounded contexts relate to and integrate with each other."
levels: { backend: staff }
aliases: ["context map", "bounded context map", "integration map"]
prereqs: ["bounded-context", "ubiquitous-language"]
related: ["bounded-context", "anti-corruption-layer", "strategic-vs-tactical-ddd"]
---
A **Context Map** charts bounded contexts and their relationships: who talks to whom, in which pattern — partnership (mutual planning), shared kernel (common subset, jointly owned), customer/supplier (downstream needs shape upstream), conformist (downstream adopts upstream's model), anti-corruption layer (downstream translates), separate ways (deliberately unintegrated), open-host service (published protocol for many consumers).

```text
[Ordering] --customer/supplier--> [Billing] --ACL--> [Legacy ERP]
[Shipping] --open-host--> (carriers)      [Analytics] --conformist--> [Orders]
```

Mapping exposes the organisational truth: integration patterns encode team relationships (customer/supplier needs joint planning; conformist needs upstream stability promises). It guides where ACLs, partnerships and separations belong — drawn from real dependencies, not wished architecture.

The classic mistakes:

- Undrawn maps. Integration relationships existing only in code and memory surprise every newcomer and rot unnoticed. Draw the actual map; update it as code changes.
- Aspirational mapping. Charting desired relationships instead of real ones (partnership declared, conformist practised) misguides investment. Map reality first, then steer.
- Missing relationship patterns. "They integrate" without naming how (shared kernel? ACL? conformist?) leaves the governance question unanswered. Name every edge.
- Unowned edges. Integration relationships nobody maintains decay (stale contracts, silent breakage). Every map edge names owning teams on both sides.
- Big-ball mapping. Drawing fifty contexts with hundred edges produces wallpaper, not insight. Map the contexts under change; aggregate the stable.
- Conflating technical and team maps. Service dependency graphs differ from team relationship maps; both matter, neither substitutes. Keep both, cross-reference.
- Static maps. Relationships evolve (conformist matures to ACL, partnerships dissolve); annual map reviews keep governance aligned with reality.

**How to use it:** map real relationships with named patterns, assign edge ownership, steer toward healthier patterns deliberately. The context map is the organisation's integration constitution — written, owned, evolved.
