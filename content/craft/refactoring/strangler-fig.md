---
title: "Strangler Fig Pattern"
summary: "Gradually replacing a legacy system by routing pieces to new code."
levels: { backend: senior, frontend: senior, data-engineer: senior }
aliases: ["strangler fig", "strangler pattern", "strangler fig pattern"]
prereqs: ["refactoring", "legacy-code"]
related: ["big-bang-rewrite", "feature-flags", "facade-pattern", "adapter-pattern", "anti-corruption-layer", "monolith", "microservices"]
---

The **strangler fig pattern** replaces a legacy system **gradually** instead of all at once. You put a routing layer (a facade or proxy) in front of the old system, then implement one capability at a time in new code behind it, route that piece of traffic to the new implementation, verify it, and move on. The old system keeps serving everything you haven't replaced, and shrinks over time until it can be retired.

The name comes from the vine that grows around a tree, gradually taking its place. The software version is the safe alternative to a [big bang rewrite](/t/big-bang-rewrite).

```text
      ┌──────── router / facade ────────┐
      │  /orders ─▶ new service          │
      │  /users  ─▶ old system (still)   │   ← move routes one at a time
      │  /billing─▶ old system (still)   │
      └──────────────────────────────────┘
```

Why it works: the system is always running, you get feedback from real traffic at each step, and you can stop or reverse any single migration. Risk is spread across many small moves rather than concentrated in one switchover.

The classic mistakes:

- No routing layer. Without a facade that can send different traffic to old and new, you can't move incrementally; you're back to a big switch. Build the router first.
- Never retiring the old system. The pattern's failure mode is doing the "strangle" but never the final removal — both systems live forever, with double maintenance. Track and delete old paths.
- Migrating the wrong thing first. Start with a well-understood, lower-risk piece to prove the approach, not the most tangled corner.
- Ignoring the data. Splitting behaviour is easier than splitting data; you often need both systems to read/write shared state during the transition, which needs care (see [parallel change](/t/parallel-change)).
- Forgetting the boundary translation. New code and old often speak different formats. An [anti-corruption layer](/t/anti-corruption-layer) or [adapter](/t/adapter-pattern) keeps the new design clean rather than inheriting the legacy model.

The strangler fig is how most successful legacy migrations actually happen: a [facade](/t/facade-pattern) or router, small increments, [feature flags](/t/feature-flags) to control exposure, and steady deletion of the old. It's slower on paper and dramatically more likely to finish than a rewrite.
