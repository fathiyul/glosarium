---
title: "On-Call"
summary: "Being responsible for responding to production issues."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["on call", "on-call rotation", "being on call", "pager duty", "on-call engineer"]
prereqs: ["incident", "alerting"]
related: ["on-call-paging", "on-call-handover", "escalation", "runbook-automation", "alert-fatigue", "incident-response", "sustainable-pace"]
core: [backend]
also: [production-work]
---

**On-call** means being the person (or team) responsible for **responding to production problems** during a defined period, even outside working hours. Teams rotate it, so that one person is reachable at any moment, and the load is shared.

## How it typically works

- A **rotation** (a week at a time is common) among the engineers who own a service.
- **Alerts page the on-call person** by phone or app ([alerting](/t/alerting), [paging](/t/on-call-paging)). They acknowledge it, investigate and fix, or **escalate** to someone else if they can't ([escalation](/t/escalation)).
- A **secondary** engineer is a backup if the primary doesn't respond.
- At the end of a shift, there's a [handover](/t/on-call-handover): open issues, recent changes, things to watch.
- After incidents, there's a [postmortem](/t/postmortem).

## What you're expected to do

- **Be reachable and able to respond within an agreed time** (often minutes), with a laptop and connectivity.
- **Triage**: how bad is it, and who is affected? ([severity levels](/t/severity-levels))
- **Mitigate first**, with a rollback, a flag or a restart, then investigate ([mitigate first](/t/mitigate-first)).
- **Communicate**: update the incident channel and stakeholders.
- **Use runbooks** and ask for help early. Nobody expects you to know everything ([escalation](/t/escalation)).
- **Record what you did.**

## What makes on-call sustainable

- **Good alerts**: few, actionable, with runbooks. A noisy pager burns people out ([alert fatigue](/t/alert-fatigue), [actionable alerts](/t/actionable-alerts)).
- **Documentation and runbooks** for common problems.
- **Shadowing** before your first solo shift, and a clear path to get help.
- **Fair rotations** with enough people. Compensation or time off in lieu where appropriate.
- **Follow-through**: recurring pages are bugs to fix, not a cost of doing business ([toil](/t/toil)).
- **Limits**: protecting sleep and time to recover after a rough night ([sustainable pace](/t/sustainable-pace)).

## For your first rotation

- Read the runbooks and review recent incidents beforehand.
- Check access (VPN, dashboards, cloud console, deploy tools) *before* your shift, not at 3 a.m.
- Keep the pager charged and loud. Know whom to call.
- When unsure, **escalate**. A needless wake-up is cheap, and a missed one isn't.
- After the shift, say what was confusing, so the system and the docs improve.

Being on call is part of owning what you build. It also quickly teaches how systems really fail.
