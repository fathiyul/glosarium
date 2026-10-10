---
title: "Vendor Lock-In"
summary: "Depending on one provider's proprietary services."
levels: { backend: senior, frontend: senior, data-engineer: senior }
aliases: ["vendor lock-in", "lock-in", "portability"]
prereqs: ["cloud-computing", "cloud-providers"]
related: ["multi-cloud", "managed-vs-self-hosted", "managed-database", "oci", "container"]
---

**Vendor lock-in** is the cost of leaving a provider, created by depending on its proprietary services, APIs or formats. It isn't binary — it's a spectrum. At the portable end, standard [containers](/t/container) and a plain [PostgreSQL-style database](/t/managed-database) move between clouds with modest effort. At the locked-in end, deep use of a provider's unique service — its specific queue semantics, identity system, or managed product — means leaving would be a rewrite.

The trade-off is real in both directions:

- Using a provider's distinctive service is often **faster and better**. It's tuned, integrated, and removes work you'd otherwise do yourself (see [managed vs self-hosted](/t/managed-vs-self-hosted)).
- Avoiding everything proprietary can mean **not using good tools** and rebuilding commodity features yourself, which also has a cost.

```text
portable:  containers, standard protocols, plain SQL, object storage APIs
locked-in: provider-specific APIs, managed services, identity, networking
```

The classic mistakes:

- Accidental lock-in. Nobody decides to depend on a provider; it accumulates one convenient integration at a time — networking here, identity there, a proprietary queue — until moving is a project. That may be fine, but it should be a *known* choice.
- Over-avoiding lock-in. Teams sometimes refuse the best tool on principle and build a worse one. Portability has a price too; pay it where it matters, not everywhere.
- No exit plan. You don't need to be portable, but you should know what leaving would take — roughly how much code, data and configuration is provider-specific — so the risk is understood.
- Premature abstraction. Building a layer to hide every provider detail before you have a second provider is over-engineering. Abstraction you don't use is just complexity.
- Confusing lock-in with multi-cloud. Running on several clouds is one way to reduce dependence, but it multiplies operational cost. It's not the only answer (see [multi-cloud](/t/multi-cloud)).

**How to think about it:** decide deliberately where portability matters. Keep data in open formats, prefer [standard container images](/t/oci) and common protocols where you can, and accept lock-in for services that deliver enough value — with your eyes open. The goal isn't zero lock-in; it's lock-in you chose and can measure.
