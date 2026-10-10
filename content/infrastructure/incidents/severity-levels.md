---
title: "Incident Severity Levels"
summary: "SEV1 to SEV4: how bad an incident is."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["severity levels", "sev1 sev2", "incident severity"]
prereqs: ["incident-response", "sla"]
related: ["incident-commander", "on-call-paging", "escalation", "status-page", "mttr"]
---

**Severity levels** are a shared scale for how bad an incident is. A common scheme runs from SEV1 (critical) to SEV4 (minor):

- SEV1 — major outage or data loss; many users affected or a core function down. All hands, immediate.
- SEV2 — significant impact or a critical function degraded, with a workaround. Urgent.
- SEV3 — limited impact or a small set of users; handled during working hours.
- SEV4 — minor or cosmetic; tracked, not paged.

The numbers are conventions — some teams use two levels, some five, some name them differently — but the idea is the same: agree on what each level means *before* an incident, so nobody argues about it during one.

Severity is about **impact**, not cause. Ask how many users are affected, how badly, whether data is at risk, and whether there's a workaround. A tiny code bug that takes down payments is severe; a scary-looking crash in an unused feature is not.

The classic mistakes:

- **Everything is SEV1.** If every incident is critical, the label stops meaning anything and the team burns out. Calibrate against your scale.
- **Severity by who's complaining.** The loudest customer or the most senior person shouldn't set severity. Use the criteria.
- Never updating it. An incident can rise (it's worse than thought) or fall (a workaround exists). Reassess as it evolves.
- Confusing it with priority. Severity is how bad it is; priority is the order you work in. A high-severity incident still might wait on a mitigation already in flight.

Severity drives the response: whether to [page someone](/t/on-call-paging), whether to [escalate](/t/escalation), who commands ([incident commander](/t/incident-commander)), whether to post on the [status page](/t/status-page), and how it's reviewed afterwards. Tie the levels to your [SLA](/t/sla) and track how long each takes to resolve ([MTTR](/t/mttr)). Frontend and data incidents use the same scale — impact is impact.
