---
title: "RPO and RTO"
summary: "How much data you can afford to lose, and how long you can be down."
levels: { backend: senior, data-engineer: senior }
aliases: ["RPO and RTO", "recovery point objective", "recovery time objective"]
prereqs: ["disaster-recovery", "backups"]
related: ["disaster-recovery", "restore-testing", "backups"]
---
**RPO** (Recovery Point Objective) bounds acceptable data loss — "lose at most 15 minutes of writes." **RTO** (Recovery Time Objective) bounds acceptable downtime — "back within 4 hours." Together they size every resilience investment: backup frequency serves RPO, automation and standby warmth serve RTO, and each order of tightness multiplies cost.

```text
RPO 15min → replicate/backup at least every 15min (continuous for zero)
RTO 4h    → restore + redirect + verify must complete within 4h (rehearsed)
```

They're business decisions wearing technical clothes: stakeholders sign off on loss and downtime bounds, engineering builds (and proves) to them. Unagreed RPO/RTO guarantee disappointment — each side assuming the other's numbers.

The classic mistakes:

- Unagreed objectives. Engineering's "best effort" meeting the business's imagined "zero loss" fails at the first incident review. Agree explicitly, in writing, per system tier.
- RPO without replication reality. Hourly backups can't meet a 5-minute RPO. Match mechanisms to objectives (continuous replication for near-zero, scheduled for loose).
- RTO without rehearsal. Paper procedures never meet their time targets under pressure. Time rehearsals; the measured time is the real RTO.
- One RPO/RTO for everything. Critical payments and internal dashboards sharing objectives wastes money or risks the business. Tier by impact.
- Ignoring the cost curve. Each strictness step (hourly→continuous, warm→active) multiplies spend. Present costed options; let stakeholders choose knowingly.
- RTO excluding verification. "Systems up" without data-integrity checks and client redirection isn't recovered. RTO spans to verified serving, not to first boot.
- Objectives set once. Business impact, data volumes and architectures drift; yearly RPO/RTO review keeps protection aligned with value.

**How to use them:** agree per tier, build mechanisms to match, rehearse to prove, review yearly. RPO/RTO turn resilience from vibes into contracts — with price tags attached.
