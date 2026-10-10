---
title: "Status Page"
summary: "Public communication about outages."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["status page", "service status", "statuspage"]
prereqs: ["incident-response", "incident-communication"]
related: ["sla", "uptime-monitoring", "monitoring", "maintenance-window", "escalation"]
---

A **status page** is a public page that tells users whether the service is working and what's happening when it isn't. It lists the main components (website, API, dashboard, payments) with a current state, and posts updates during an outage. It's often a hosted service, but it can be self-run.

The purpose is communication. During an incident, affected users have two questions: "is it just me?" and "when will it be fixed?" A status page answers the first immediately and gives a single, trusted place for the second — instead of support tickets, social media and rumour filling the gap.

```text
All Systems Operational
──────────────────────
API            Degraded performance
Dashboard      Operational
Payments       Operational

Update 14:20 — Payments errors are being mitigated; next update 15:00.
```

The classic mistakes:

- **Silence.** Saying nothing until it's fixed guarantees that users find out elsewhere and assume the worst. Post early, even with little information, and update on a cadence.
- **Inconsistent or marketing-toned updates.** Updates should be factual and human: what's impacted, what you're doing, when the next update comes. "We're experiencing issues, we're on it" repeated for hours erodes trust.
- **Hosting it on the same infrastructure that's down.** If the status page shares the failing stack, it disappears exactly when it's needed. Keep it independent.
- No templates. Writing from scratch during an incident is slow. Prepare templates for common cases.
- No history. Past incidents shown on the page build credibility; hiding them doesn't.

A status page pairs with [incident response](/t/incident-response) and [incident communication](/t/incident-communication), and with the [SLA](/t/sla) promises you've made. Use it for planned work too — announcement of a [maintenance window](/t/maintenance-window) belongs there. Frontend, backend and data outages all surface here; the page doesn't care which team owns the fix.
