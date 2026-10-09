---
title: "Incident"
summary: "An unplanned event that disrupts or degrades service."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["production incident", "outage", "service incident", "sev1", "major incident"]
prereqs: ["on-call"]
related: ["incident-response", "severity-levels", "incident-commander", "blameless-postmortem", "mitigate-first", "incident-communication"]
core: [backend]
---

An **incident** is an unplanned event that disrupts or degrades your service: the site is down, payments fail, pages take thirty seconds
to load, or data is wrong. Anything that hurts users and needs a response now rather than a ticket next sprint.

Incidents are normal. Even well-run systems have them. What differs between teams is how fast they notice, how calmly they
respond and how much they learn.

## The usual life cycle

1. **Detect**: an alert fires ([alerting](/t/alerting)) or a user reports it.
2. **Triage**: how bad is it, and who's affected? Assign a [severity](/t/severity-levels).
3. **Respond and mitigate**: stop the harm first (roll back, turn off a feature, add capacity, fail over). Don't hunt
   for the root cause yet ([mitigate first](/t/mitigate-first)).
4. **Communicate**: keep stakeholders and users updated ([incident communication](/t/incident-communication),
   [status page](/t/status-page)).
5. **Resolve**: service is healthy again, and confirmed through metrics.
6. **Learn**: write a [blameless postmortem](/t/blameless-postmortem) and track the follow-up actions.

## Roles in a serious incident

Larger incidents have a clear structure: an [**incident commander**](/t/incident-commander) coordinates and decides, others
investigate and fix, and someone handles communication. A single owner prevents ten people trying ten fixes at once.

## What juniors should do

- **Escalate early.** If something looks wrong in production, say so right away. Telling people too soon costs little, and too late
  costs a lot ([escalation](/t/escalation)).
- **Don't go quiet or fix things in secret.** Say what you see and what you're about to try, and write it in the incident channel.
- **Don't make changes blindly**: especially not to production data, without telling the person in charge.
- **Keep a timeline** (what happened, and when). It's the raw material for the postmortem.
- **Stay calm**; follow the team's runbook ([runbook automation](/t/runbook-automation)).

An incident that was caused by a person's mistake is almost always also a **systems** failure: why was it possible, and why wasn't
it caught? That's the question to ask afterwards, not "who did it?".
