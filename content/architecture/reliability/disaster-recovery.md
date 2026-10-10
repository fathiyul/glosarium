---
title: "Disaster Recovery"
summary: "Restoring service after a catastrophic failure."
levels: { backend: senior, data-engineer: senior }
aliases: ["disaster recovery", "DR", "disaster recovery plan"]
prereqs: ["backups", "rpo-rto"]
related: ["rpo-rto", "restore-testing", "multi-region"]
---
**Disaster recovery (DR)** restores service after catastrophic failure — region loss, ransomware, total data corruption: declared disasters with runbooks, roles, recovery sites and rehearsed procedures. Where high availability survives component failure automatically, DR survives the scenarios HA can't: everything in one place dying at once.

```text
disaster declared → runbook → failover/failback sequence → verify → resume
RPO (how much data lost) + RTO (how long down) bound the plan
```

DR tiers by need: backup-and-restore (cheap, slow), pilot light (minimal always-on, scaled on disaster), warm standby (scaled-down running copy), active-active (full multi-site — really HA wearing a DR badge). RPO/RTO targets pick the tier; rehearsal proves it.

The classic mistakes:

- Untested plans. Binderware runbooks failing at step three during the actual disaster — untested DR is fiction. Rehearse end-to-end (including DNS, clients, data) on schedule.
- RPO/RTO unagreed. Engineering targets nobody in the business signed off on guarantee disappointment. Agree data-loss and downtime bounds with stakeholders explicitly.
- Backup-only DR. Backups without tested restore, rebuild automation and traffic shifting recover data into a vacuum. DR covers the whole path to serving users.
- Same-fate backups. Backups in the same region/account as production die with it (ransomware encrypts both). Isolate recovery assets (accounts, regions, immutability).
- People single points. The DR expert on holiday during the disaster stalls everything. Cross-train, document for strangers, automate decisions where possible.
- Declaration ambiguity. Nobody empowered to declare disaster (or everybody, differently) wastes the critical first hour. Clear triggers, clear authority, practised handoffs.
- Never failing back. Emergency operations becoming permanent (split data, diverging configs) create the next disaster. Plan and rehearse return-to-normal equally.

**The standard:** tiered strategy matched to RPO/RTO, isolated recovery assets, runbooks rehearsed by non-experts, failback planned. Disasters don't schedule; recovery must pre-exist them.
