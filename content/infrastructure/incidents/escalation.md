---
title: "Escalation"
summary: "Knowing when and how to pull in more help."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["escalation path", "escalation policy", "when to escalate"]
prereqs: ["on-call", "incident-response"]
related: ["on-call-paging", "incident-commander", "severity-levels", "runbook", "on-call-handover"]
---

**Escalation** is how you get more help when a problem is beyond what you can handle alone. An escalation policy says who to contact, after how long, and for what kind of problem, so the decision isn't left to someone's judgement at 3am. The point is to involve the right people *before* an incident drags on.

Escalate on facts, not feelings: the incident is severe ([severity](/t/severity-levels)), it's lasted longer than expected, it's outside your area, or you need authority to act (access, a decision, customer communication).

```text
after 15 min unresolved and user-facing:
  1. on-call engineer (you)
  2. secondary on-call
  3. service owner / team lead
  4. incident commander + comms
```

The classic mistakes:

- **Waiting too long.** A hero culture where nobody wants to "bother" others turns a 30-minute incident into a 3-hour one. Escalating early is not failure; it's the process working.
- Escalating everything. Crying wolf for minor issues trains people to ignore the alert. Match the escalation to severity.
- **No path or no contact info.** An escalation policy nobody can find, or that names people who left, is useless. Keep it current and reachable from the [runbook](/t/runbook).
- **Forgetting the handoff.** When the next person takes over, pass context: what's happened, what's been tried, what's suspected (see [on-call handover](/t/on-call-handover)).

Escalation works together with [paging](/t/on-call-paging): a page wakes one person, and escalation widens the net if they can't resolve it. For larger incidents, an [incident commander](/t/incident-commander) coordinates while others escalate expertise. Frontend, backend and data issues all follow the same shape — the question is always "who else needs to know, and when?".
