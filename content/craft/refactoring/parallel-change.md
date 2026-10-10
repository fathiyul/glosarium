---
title: "Parallel Change (Expand-Contract)"
summary: "Add the new way, migrate callers, then remove the old way."
levels: { backend: senior, frontend: senior, data-engineer: senior }
aliases: ["parallel change", "expand contract", "expand and contract"]
prereqs: ["refactoring", "feature-flags"]
related: ["schema-and-code-deploys", "breaking-change", "migration-tools"]
---

**Parallel change** (also called expand-contract) changes an interface in three safe steps instead of one risky step: **expand**, **migrate**, **contract**. You add the new form alongside the old, move all callers to it, and only then remove the old. At every moment, both the old and new ways work, so nothing breaks in between.

```text
1. expand:   add newThing() next to oldThing()
2. migrate:  move all callers to newThing(); keep oldThing() working
3. contract: delete oldThing() once nothing calls it
```

The pattern matters because a direct change — rename a method, change a field, alter a response shape — breaks every caller the instant it ships, including ones deployed at a different time, in other services, or on users' devices. Parallel change makes the transition survivable.

It applies far beyond code:

- APIs — add a new field or endpoint, deprecate the old, remove it later (see [breaking changes](/t/breaking-change)).
- Databases — add a column, backfill and dual-write, switch reads, drop the old column (see [schema and code deploys](/t/schema-and-code-deploys)).
- Client–server — support both old and new clients while users update.

The classic mistakes:

- Changing in one step. The straightforward rename that "should be fine" breaks the caller deployed last week, or the mobile app users haven't updated. Expand first.
- Never contracting. The temptation is to do step one and forget step three. Left undone, parallel change becomes permanent duplication and confusion — the "expand" forever.
- Assuming you can find all callers. In a distributed system you can't. That's precisely why the old path must keep working until you have evidence it's unused (via metrics or logs).
- Mixing it with a data migration that isn't reversible. For schemas, each step must be compatible with the version before and after, or the safety is illusory.
- Overdoing it for internal, single-deployment code. If you genuinely control every caller and deploy atomically, a direct change is fine. Parallel change earns its cost across boundaries you don't fully control.

It's the disciplined version of "add the new, migrate, remove the old", and the same idea underlying the [strangler fig](/t/strangler-fig) at a larger scale. [Feature flags](/t/feature-flags) often help flip callers over gradually, and [migration tools](/t/migration-tools) automate the schema steps.
