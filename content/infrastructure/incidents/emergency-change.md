---
title: "Emergency Change Process"
summary: "Shipping urgent fixes safely under pressure."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["emergency change", "urgent fix process", "break-glass change"]
prereqs: ["incident-response", "hotfix"]
related: ["break-glass-access", "roll-forward", "rollback", "deployment-freeze", "runbook"]
---

An **emergency change** is a fix that has to ship now: a security hole is being exploited, a bad deploy is corrupting data, or a payment path is down. The normal change process — review, test, schedule — is too slow. The emergency change process is the *other* path: fast, but still deliberate.

A workable version keeps a few guarantees even under pressure:

- A second pair of eyes. Not a full review, but someone else looks before it goes out. Emergencies are exactly when a lone mistake is most costly.
- A known scope. The change fixes the problem and nothing else. Don't bundle unrelated improvements into a fire.
- A rollback plan. Know how to undo it, especially if it touches data.
- A record. Log what changed, who approved it and why, so it can be reviewed afterwards.

```text
normal:    branch → review → test → deploy → monitor
emergency: fix → quick approval → deploy → monitor → review the next day
```

The classic mistakes:

- **Dropping every control.** "It's an emergency" becomes cover for untested, unreviewed changes that create a second incident. Keep the minimum guarantees above.
- **No record.** Changes made in a panic and never written down can't be learned from, and the next person can't tell what happened.
- **Using the fast path routinely.** If every week has an emergency, the real problem is the normal process. Track how often the emergency path is used; a rising count is a signal.

Emergencies are where [breaking glass](/t/break-glass-access) for access and [rolling forward](/t/roll-forward) instead of reverting often come up. After the fire is out, treat it like any incident: a [postmortem](/t/blameless-postmortem) and a check that the fix is permanent. Frontend teams hit this with a bad client or config release; the same discipline applies.
