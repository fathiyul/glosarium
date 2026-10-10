---
title: "Strategic vs Tactical DDD"
summary: "Boundaries and team design vs code-level patterns."
levels: { backend: staff }
aliases: ["strategic vs tactical DDD", "strategic design", "tactical design"]
prereqs: ["domain-driven-design", "bounded-context"]
related: ["bounded-context", "context-map", "ubiquitous-language"]
---
DDD splits in two: **strategic design** (where to draw boundaries — bounded contexts, context maps, distillation of the core domain) and **tactical design** (how to model inside one context — entities, values, aggregates, services, events). Strategy decides the shape of the system; tactics decide the shape of the model.

```text
strategic:  which contexts? how related? what's core vs generic?
tactical:   entities? values? aggregates? (inside one context)
```

The failure mode is tactics-without-strategy: exquisite aggregates inside contexts drawn around org charts, databases or wishful thinking — perfect models of the wrong boundaries. Strategic work (event storming at scale, context mapping, core-domain distillation) earns the right to tactical modelling; big balls of mud get tactics applied to mud.

The classic mistakes:

- Tactics first. Aggregates and entities designed before contexts exist model confidently inside accidental boundaries. Map contexts, then model within.
- Big-bang bounded contexts. Drawing twelve contexts upfront from interviews fossilises guesses. Start with fewer, larger contexts; split on proven seams (see [context map](/t/context-map)).
- Core vs generic unexamined. Lavishing modelling on commodity subdomains (auth, billing plumbing) while the differentiating core gets CRUD wastes DDD where it matters most. Distil the core; buy or borrow the generic.
- Strategic artefacts rotting. Context maps drawn once and never updated describe history within a year. Review boundaries with the same cadence as architecture.
- Tactical patterns everywhere. Aggregates and ACLs in generic subdomains add ceremony without complexity to protect. Apply tactical DDD proportional to domain richness.
- Conway blindness. Context boundaries ignoring team structures (or vice versa) fight organisation gravity perpetually. Align contexts with teams that own them.
- Distillation skipped. Treating all domains as equally deserving scatters modelling effort evenly — and thinly. Invest deeply in the core; contain the rest.

**How to sequence:** storm big (events across the business), map contexts, distil the core, model tactically inside — in that order, revisited as understanding grows. Strategy aims DDD; tactics execute it.
