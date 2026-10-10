---
title: "Incident Response"
summary: "How a team detects, coordinates, fixes and communicates during an incident."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["incident response process", "incident management", "incident handling"]
prereqs: ["incident", "on-call"]
related: ["incident-commander", "mitigate-first", "severity-levels", "status-page", "incident-communication", "blameless-postmortem"]
---

**Incident response** is what a team does between noticing something is wrong and having it fixed and written up. It combines detection, coordination, mitigation and communication. The goal is boring and clear: restore service, keep everyone informed, and learn afterwards.

A common shape for a real incident:

1. Detect and declare. A page, a customer report or a dashboard triggers it. Someone declares an incident and sets a [severity](/t/severity-levels).
2. Assign roles. For anything non-trivial, one person becomes the **incident commander**: they coordinate and make calls, and don't try to debug and direct at the same time. Someone handles communication; others investigate.
3. Mitigate. Stop the user impact first — roll back, fail over, turn off a feature — before chasing the root cause (see [mitigate first](/t/mitigate-first)).
4. Communicate. Update affected people and, if public, the [status page](/t/status-page). Silence makes it worse.
5. Resolve and review. Confirm recovery, then hold a [blameless postmortem](/t/blameless-postmortem).

The classic mistakes:

- **No commander.** Everyone debugs, nobody coordinates, and changes conflict. A single decision-maker keeps it orderly.
- **Debugging before mitigating.** Users stay broken while engineers hunt for the cause. Restore service first.
- Poor communication. People escalate the same problem, or customers learn from Twitter. Assign one comms owner.
- Skipping the review. The same incident returns next month because nothing changed.

The exact roles and terms differ between organizations, but the pattern holds: coordinate, mitigate, communicate, learn. Frontend incidents (bad client release) and data incidents (a broken pipeline) use the same process — only the tools differ. It runs on [on-call](/t/on-call), [escalation](/t/escalation) and [runbooks](/t/runbook).
