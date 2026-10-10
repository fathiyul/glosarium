---
title: "Non-Functional Requirements"
summary: "Requirements about how well a system works rather than what it does."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["non-functional requirements", "NFRs", "quality requirements"]
prereqs: ["software-architecture", "slo"]
related: ["quality-attributes", "slo", "architecture-review"]
---
**Non-functional requirements (NFRs)** specify how well a system must work rather than what it does: how fast (latency percentiles, not averages), how available (nines with a measurement window), how much load (throughput, concurrent users), how safe (recovery objectives), how secure, how maintainable. Without them, "fast" and "reliable" mean nothing testable — and architecture can't be judged against wishes.

```text
functional:   "users can reset passwords"
non-functional: "p99 reset-email delivery under 60s; 99.9% monthly availability"
```

Good NFRs are quantified, measured, and tied to consequences: a percentile plus a window plus what happens on breach. Vague NFRs ("system must be scalable") produce arguments; quantified ones produce designs and [fitness functions](/t/fitness-function) that enforce them.

The classic mistakes:

- Writing unmeasurable NFRs. "Fast, scalable, secure" with no numbers is decoration. Every NFR needs a metric, a target and a measurement method.
- Averages instead of percentiles. "Average response under 200ms" hides a miserable tail; p95/p99 describe what users actually feel.
- No load numbers. Latency targets without concurrent-user and throughput figures can't size anything. Pair every latency NFR with load.
- Availability without a window. "99.9%" means nothing until you add "measured monthly" (43 minutes of budget) versus "yearly."
- Security and operability as afterthoughts. Recovery time, backup verification, auditability and patchability are NFRs too — discovered in the first incident if unwritten.
- Conflicting NFRs unacknowledged. "Sub-50ms globally" and "single-region to save cost" can't both hold; surfacing the conflict early forces a real decision.

**How to use them:** quantify early, measure continuously, and review like features — NFRs are the contract architecture is held to. See [quality attributes](/t/quality-attributes) for the vocabulary and [SLOs](/t/slo) for the operational form.
