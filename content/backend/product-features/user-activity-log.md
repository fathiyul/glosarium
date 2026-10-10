---
title: "User-Facing Activity Log"
summary: "Showing users who changed what and when."
levels: { backend: mid-level, frontend: mid-level }
aliases: ["activity log", "user activity log", "account activity"]
prereqs: ["audit-columns", "record-history"]
related: ["record-history", "audit-columns", "logging"]
---

A **user-facing activity log** shows a person a history of actions on their account: logins from new devices, password changes, settings updates, payments, key creations. It's a security and trust feature — users can spot suspicious activity ("Why did someone log in from Brazil?") and understand what's happened.

```text
• 2026-01-15 09:12  Login from Chrome, London
• 2026-01-15 09:40  Password changed
• 2026-01-16 14:03  API key created
```

It's distinct from an internal audit log (which is for operators and compliance) and from [record history](/t/record-history) (which stores the *data* versions). This one is a curated, human-readable feed of *events* relevant to the account holder.

The classic mistakes:

- Leaking sensitive detail. The log should be informative but not leak secrets — don't show full IPs to everyone, tokens, or personal data of other users. Curate what's shown.
- Showing internal noise. Users don't need every internal event; show meaningful, security-relevant actions, not debug spam. Filter to what matters.
- No security-relevant coverage. Missing the very events users care about — password changes, new logins, 2FA changes, key/credential creation, email changes — undermines the feature. Include those first.
- Untrustworthy timestamps and identity. Show accurate time (in the user's zone; see [timezone](/t/timezone)) and, where useful, the source (device, IP region), but keep it accurate.
- No notification tie-in. A security log is most useful combined with alerts ("new login from an unrecognised device"); consider notifying for high-risk events.
- Storing it inconsistently. If the log is derived from many places, some events get missed; decide where events are recorded and record them reliably (see [event-driven architecture](/t/event-driven-architecture)).
- Immutable but deletable on account deletion. Users' own activity history may need to be erasable while internal audit is retained; separate the two concerns.
- Assuming it's the audit log. The internal audit trail is broader and protected; the user log is a curated subset. Don't conflate them.

**How to build it:** record meaningful, security-relevant events with actor, time and source; present them clearly and safely; notify on high-risk ones; and keep it separate from the internal audit trail. It's a trust-building feature that turns invisible account changes into something users can see and act on — see [audit columns](/t/audit-columns) and [logging](/t/logging).
