---
title: "Record History and Versioning"
summary: "Keeping previous versions of rows with history tables or temporal tables."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["record history", "record versioning", "history and versioning"]
prereqs: ["audit-columns", "soft-delete"]
related: ["audit-columns", "soft-delete", "event-driven-architecture", "user-activity-log"]
---

**Record history** (versioning) keeps the past states of a record, so you can see how it changed — who edited what, when, and what the values were at each point. It's distinct from a simple `updated_at`/`updated_by` (which only shows the *latest* change): history keeps *every* change.

```text
v1: title "Draft"    by alice
v2: title "Draft!"   by bob
v3: title "Final"    by alice   ← current
```

Two broad approaches:

- Audit log — append a row per change, recording the field(s) changed, old/new values, who and when. Lightweight; good for "who changed this", less so for reconstructing a full past state.
- Full versioning — store a complete snapshot (or a diff/delta) per version, so any past state can be reconstructed or restored ("revert to version 2"). More storage, richer capability.

The classic mistakes:

- Only keeping the latest change. `updated_by`/`updated_at` tells you the last edit, not the history. If the product needs "what did it look like before", you need history.
- Storing full snapshots for everything. Snapshotting large records on every edit explodes storage; deltas or immutable-version tables are more efficient (see [persistent data structures](/t/persistent-data-structure)).
- No immutability. History must be append-only — if history rows can be edited or deleted, it's not a trustworthy record. Protect them.
- Losing the "who and why". A version without the actor and a reason is far less useful; capture both (see [audit columns](/t/audit-columns)).
- Ignoring actor vs system changes. Some changes are made by users, others by jobs/migrations; distinguishing them matters for interpreting history.
- Performance. History grows with edits and is queried by time/entity; index accordingly and plan retention.
- Confusing history with soft delete. [Soft delete](/t/soft-delete) hides a record; history *records changes*. They're complementary.
- Restoring without care. "Revert to version 2" can clobber changes made since; reverting should itself be a new version, not a destructive overwrite.

**How to build it:** append a record of each change (actor, timestamp, changed fields, old/new values) — or full versions if you need to reconstruct/restore any past state — immutably, indexed by entity and time. It underpins audit, undo, compliance and dispute resolution, and it complements a user-facing [activity log](/t/user-activity-log) (which shows actions) with the *data* history behind them.
