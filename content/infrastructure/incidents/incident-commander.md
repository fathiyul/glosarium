---
title: "Incident Commander"
summary: "The person coordinating an incident response."
levels: { backend: senior, frontend: senior, data-engineer: senior }
aliases: ["incident commander", "IC", "incident lead"]
prereqs: ["incident-response", "on-call"]
related: ["escalation", "incident-communication", "severity-levels", "mitigate-first", "status-page"]
---

An **incident commander (IC)** is the person who coordinates an incident response. When something serious breaks, the IC decides priorities, assigns work, keeps track of what's been tried, and makes the calls — instead of everyone debugging in parallel and tripping over each other. Crucially, the IC is not necessarily the one fixing the problem.

Why separate the roles: coordinating well and debugging well are different jobs, and trying to do both at once makes each worse. An engineer deep in logs can't also be asking "who's doing what, are we communicating, is this getting worse?" A single decision-maker keeps the response orderly and prevents duplicated or conflicting changes.

A typical IC's job:

- Declare and size it. Confirm it's an incident, set the [severity](/t/severity-levels), pull in help as needed (see [escalation](/t/escalation)).
- Assign roles. One person on mitigation, one on [communication](/t/incident-communication) if it's big enough.
- Keep a timeline. What happened, what's been tried, what worked — the raw material for the postmortem.
- Drive toward mitigation. Push the team to restore service first (see [mitigate first](/t/mitigate-first)), not to perfect the diagnosis.
- Decide. Break ties, approve risky actions, and call when it's over.

The classic mistakes:

- The IC also deep-debugging. It feels efficient but drops the coordination. Hand the keyboard over, or hand over the IC role.
- No IC at all. With no one in charge, several people fix different things, changes conflict, and nobody communicates. Often the single biggest improvement in a response.
- A rotating title with no authority. The IC needs to be listened to for a defined period. Without that, it's a label.
- Never declaring. Waiting until it's "bad enough" wastes the early minutes when coordination is easiest. When in doubt, declare and downgrade later.

**When you need one:** for a serious, multi-person incident, always. For a trivial, single-person fix, the on-call engineer just handles it. The role usually rotates through the team; it's a skill learned best in practice — see [game days](/t/game-day). When the incident ends, the IC's timeline drives the [blameless postmortem](/t/blameless-postmortem).
