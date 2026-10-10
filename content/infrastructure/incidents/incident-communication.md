---
title: "Customer Communication in Incidents"
summary: "Telling users what's happening, honestly and promptly."
levels: { backend: senior, frontend: senior, data-engineer: senior }
aliases: ["incident communication", "customer comms", "outage communication"]
prereqs: ["incident-response", "status-page"]
related: ["incident-commander", "escalation", "sla", "blameless-postmortem"]
---

**Incident communication** is telling the people who are affected what's going on: customers, support, internal stakeholders. During an outage, silence is itself a problem — users assume the worst, flood support with tickets, and lose trust faster than a clear, honest update ever would. This is a role, not an afterthought, and it's often assigned to a **communication lead** during an incident.

What good communication does:

- Says something early. An initial acknowledgment — "we're aware, investigating" — beats silence. You don't need the cause to tell people you're on it.
- Updates on a cadence. Regular updates (say, every 30 minutes) even when there's little new, so people know it's being worked.
- Is honest and plain. What's affected, what you're doing, whether data is at risk. No jargon, no over-promising a fix time you can't meet.
- Uses one channel. The [status page](/t/status-page) for public, plus internal channels, so there's a single source of truth.

```text
14:05  We're investigating elevated errors on checkout. Next update: 14:35.
14:35  Checkout errors are being mitigated; payments unaffected. Next: 15:05.
15:00  Checkout is recovered; monitoring. A postmortem will follow.
```

The classic mistakes:

- Waiting for a complete picture. Teams often delay the first message until they understand the cause, leaving users in the dark for the worst hour. Communicate early, update as you learn.
- Promising a time you can't keep. "Fixed by 3pm" that slips twice costs more trust than saying the timing is unknown.
- Blame and defensiveness. Public updates are not the place to explain whose fault it was. Stay factual and accountable.
- Inconsistency. Different answers on the status page, support and social media create confusion. One owner, one message.

**Who does it:** in anything-sized, it's a dedicated role so engineers can focus on fixing (see [incident commander](/t/incident-commander)). It works with [escalation](/t/escalation) and your [SLA](/t/sla) — if an incident threatens a promise, customers need to hear it from you, not from a support ticket. Afterward, the facts feed the [blameless postmortem](/t/blameless-postmortem).
