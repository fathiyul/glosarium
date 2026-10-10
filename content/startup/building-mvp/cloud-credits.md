---
title: "Cloud Credits"
summary: "Free cloud usage programs for startups, and the bill that arrives when they run out."
levels: { tech-entrepreneur: mvp }
aliases: ["cloud credits", "startup cloud programs", "free cloud tier"]
prereqs: ["startup-tech-stack", "finops"]
related: ["finops", "managed-vs-self-hosted", "startup-tech-stack", "burn-rate"]
---

**Cloud credits** are free usage grants cloud providers give startups — typically enough to run free for a year or two. They remove infrastructure cost from the earliest equation entirely, which is wonderful and dangerous: architectures designed on free money meet real bills at the worst moment, mid-scale with no cost discipline built in.

```text
credits era:   $0 bills → nobody watches usage → generous architectures
cliff era:     credits expire → first real bill shocks → scramble to optimize
```

Treat credits as a runway extension with an expiry date, not as pricing. Tag resources, watch the burn-down monthly, and design roughly as if paying — the team that learns cost discipline on credits keeps it; the team that discovers bills at scale pays tuition.

The classic mistakes:

- Architecture by free tier. Multi-region everything, always-on GPUs and uncompressed storage — sensible at $0, ruinous at list price. Design for the bill you will pay, discounted by credits.
- Credit-hopping instead of building. Serial program applications and migrations chase free months while competitors ship. One program, used well, beats perpetual migration.
- Surprise expiry. Credits expiring unnoticed mid-quarter, or tied to fundraising events that slip. Calendar the expiry a quarter early and plan the optimization sprint before it.
- Data gravity lock-in. Free storage and egress now, painful migration later. Keep data portable and multi-cloud exit imaginable even while happily single-cloud (see [vendor lock-in](/t/vendor-lock-in)).

**The discipline:** monthly cost reviews from day one (even at $0), alerts at 50/75/90% of credits, and an architecture review the quarter before expiry. Credits should buy learning time, not hide costs.
