---
title: "Managed vs Self-Hosted"
summary: "Paying for convenience vs running it yourself."
levels: { backend: senior, frontend: senior, data-engineer: senior }
aliases: ["managed vs self-hosted", "managed services", "build vs buy"]
prereqs: ["cloud-computing", "managed-database"]
related: ["managed-kubernetes", "managed-queues", "vendor-lock-in", "toil", "capacity-planning"]
---

**Managed** means a provider runs a piece of infrastructure for you — a database, a queue, a Kubernetes control plane. **Self-hosted** means you run it yourself, on your own servers or compute. The decision is a make-or-buy trade: managed services trade money for reduced operational work; self-hosting trades work for control and, sometimes, lower marginal cost.

What you're really comparing:

- Operational load. A managed database handles backups, patching, failover and scaling. Self-hosting means you own all of that, including the 3am pages (see [toil](/t/toil)).
- Control. Self-hosting lets you tune configuration, install extensions, and pick exact versions. Managed services expose a subset of settings and upgrade on their schedule.
- Cost. Managed usually has a premium; self-hosted can be cheaper per unit *if* you correctly count the engineering time to run it.
- Integration. Managed services slot into a provider's networking, identity and monitoring — convenient, but part of why moving later is work (see [vendor lock-in](/t/vendor-lock-in)).

```text
managed:  pay more, operate less, less control
self:     pay (in time) more, operate more, more control
```

The classic mistakes:

- Self-hosting to save money without counting ops. The license or instance may be cheaper, but the engineer-hours to run, patch, monitor and fix it usually aren't. Self-hosting is often more expensive once labor is priced in.
- Choosing managed for something you must tune deeply. If you need a specific engine version, extension or low-level setting that the managed offering doesn't expose, you'll fight it. Self-host instead.
- Assuming managed means no operations. You still configure, monitor, back up at the application level, and pay. The boundary shifts; it doesn't disappear (see [shared responsibility](/t/shared-responsibility-model)).
- Not planning for exit. Even a managed choice should have an idea of how you'd leave, for cost or resilience reasons.

**How to decide:** default to managed for undifferentiated infrastructure — databases, queues, orchestration — where the provider genuinely removes work. Self-host when control, cost at scale, compliance, or a highly specific need justifies the operational burden. Frontend and data teams make the same call for their storage and processing; the reasoning is the same.
