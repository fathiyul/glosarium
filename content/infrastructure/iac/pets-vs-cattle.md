---
title: "Pets vs Cattle"
summary: "Hand-tended servers vs interchangeable, replaceable ones."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["cattle not pets", "immutable servers", "pets vs cattle"]
prereqs: ["server", "infrastructure-as-code"]
related: ["immutable-infrastructure", "configuration-drift", "container", "terraform", "disaster-recovery"]
---

**Pets vs cattle** is a metaphor for two ways to treat servers. A *pet* is a machine you name, nurse back to health when it's sick, and can't easily replace — it has hand-made tweaks nobody wrote down. *Cattle* are numbered and interchangeable: when one fails, you destroy it and start a fresh one from a known image.

The shift from pets to cattle is what makes cloud and containers manageable at scale. If a server's setup lives in code (see [infrastructure as code](/t/infrastructure-as-code)) and its state is elsewhere, then replacing it is routine, not surgery.

The classic mistake is logging in to fix a broken production server. The SSH session works, the service comes back, and the machine quietly becomes unique — a snowflake. Now it can't be rebuilt, it [drifts](/t/configuration-drift) from its peers, and the next incident hits a machine nobody understands. The fix isn't to avoid troubleshooting; it's to make the change in code and replace the instance.

```text
pet:    ssh in, patch, restart, hope
cattle: change the image, roll out, destroy the old
```

Two things to get right:

- **State.** Cattle are stateless owners of data, not data itself. Databases, uploads and anything that must survive a replacement belong on [volumes](/t/docker-volume) or managed stores — otherwise "just replace it" destroys data.
- **Reproducibility.** The image or configuration must actually rebuild the machine. Keep it in version control and test that a fresh instance reaches a working state.

**When not to use it:** some things deserve care — a database primary, a license-locked appliance, a machine with irreplaceable local data. Treat those as pets deliberately, with [backups](/t/backups) and a [disaster recovery](/t/disaster-recovery) plan, and make everything else cattle. Containers make the cattle pattern the default.
