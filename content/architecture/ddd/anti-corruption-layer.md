---
title: "Anti-Corruption Layer"
summary: "A translation layer protecting your model from another system's."
levels: { backend: senior }
aliases: ["anti-corruption layer", "ACL", "translation layer"]
prereqs: ["bounded-context", "context-map"]
related: ["bounded-context", "context-map", "strangler-fig"]
---
An **Anti-Corruption Layer (ACL)** shields your model from external models' concepts leaking in: a translation boundary converting foreign structures, protocols and semantics into your ubiquitous language — so legacy systems, vendor APIs and other contexts can't warp your domain.

```text
legacy: CUSTOMER_MST (cryptic, inconsistent) → ACL → Customer (your model, clean)
your model never imports, extends or mirrors the foreign one
```

ACLs contain adapters, translators, facades and sometimes caches/queues (decoupling calling patterns too). They cost maintenance (mappings per foreign change) but buy model integrity — the alternative is foreign concepts colonising your code one integration at a time.

The classic mistakes:

- Direct foreign imports. Using vendor/legacy types throughout your code marries your model to theirs; every foreign change ripples everywhere. Translate at one boundary.
- Leaky translation. Foreign ids, statuses and null-conventions seeping past the ACL corrupt the language gradually. Translate completely — nothing foreign crosses.
- ACL as pass-through. A "layer" that forwards structures unchanged adds indirection without protection. Translate semantics, not just syntax.
- Untested mappings. Translation bugs (status mismatches, unit errors, timezone shifts) surface as business errors, not crashes. Test mappings per case, including edge semantics.
- Synchronous fragility. ACLs calling flaky foreign systems inline transfer their unreliability. Cache, queue or degrade at the boundary.
- Ignoring foreign evolution. External models change (vendor v2, legacy "enhancements"); unmonitored ACLs rot silently. Contract-test against foreign systems continuously.
- ACL for everything. Translation layers between aligned contexts waste effort; ACLs guard against *corrupting* models specifically. Conform where safe, translate where threatened.

**When to build one:** integrating models you'd never design (legacy, vendor, divergent contexts) while protecting your own. Translate fully, test mappings, isolate failure — integrity preserved at the border.
