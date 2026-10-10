---
title: "Triage"
summary: "Sorting incoming bugs and requests by urgency and impact."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
---

Triage is the process of sorting incoming bugs, incidents, and requests so the team can decide what needs attention first, who should act, and what can wait. It is a decision process, not simply moving every ticket into a priority column.

A useful triage asks about user impact, scope, urgency, workaround, risk, and confidence in the report. A production outage affecting many customers differs from a cosmetic bug with a workaround, even if both have been reported by an important stakeholder. For incidents, follow the on-call or incident process first; routine backlog triage should not slow active response.

Set a predictable cadence and an owner for decisions. Without this, requests arrive through chat, email, and meetings, and the loudest or newest item may displace planned work. Make the outcome visible to the requester: accepted, deferred, needs more information, or declined, with a reason when useful.

Triage is not a promise that every accepted item will be fixed immediately. Repeatedly deferring the same class of issue may indicate a systemic quality problem. Avoid ranking solely by severity labels without checking the actual impact. See [support escalations](/t/support-escalations), [prioritization frameworks](/t/prioritization-frameworks), and [incident response](/t/incident-response).

Check the workflow with a recent piece of work rather than relying on an abstract rule. If the practice adds a queue or hides blocked work, adjust it; if it helps the team finish and learn, keep it. Backend developers can flag service constraints, frontend developers can check user-facing behavior, and data engineers can surface pipeline or data-quality dependencies.

After trying it, review several completed items and adjust the practice if it created a queue, hid a blocker, or failed to produce a useful outcome.
