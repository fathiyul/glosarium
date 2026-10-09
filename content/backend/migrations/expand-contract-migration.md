---
title: "Expand-Contract Migration"
summary: "Add the new, migrate, then remove the old, across several deploys."
levels: { backend: senior, data-engineer: senior }
aliases: ["expand and contract", "parallel change", "expand/contract pattern", "backwards-compatible migration", "multi-step migration"]
prereqs: ["schema-migration", "deployment"]
related: ["zero-downtime-migration", "backfill", "schema-and-code-deploys", "online-schema-change", "rollback-migration", "parallel-change"]
core: [backend]
---

**Expand–contract** (also called *parallel change*) is the way to make **breaking changes safely**, across several deployments, so that every step is compatible with both the old and the new code running at the same time. You **expand** to support old and new, **migrate**, then **contract** by removing the old.

During a deploy, old and new application versions run **simultaneously**, and a rollback means the old version must still work against the schema. A single "rename the column and deploy the code" step breaks one of them. Expand–contract avoids that.

## Example: rename `users.fullname` to `users.display_name`

**1. Expand**: add the new column, nullable. Nothing breaks. Old code ignores it.

```sql
ALTER TABLE users ADD COLUMN display_name TEXT;
```

**2. Dual write**: deploy code that writes **both** columns. Old and new rows stay in sync going forward.

**3. Backfill**: copy existing data to the new column, in batches ([backfill](/t/backfill)).

```sql
UPDATE users SET display_name = fullname WHERE display_name IS NULL AND id BETWEEN :a AND :b;
```

**4. Switch reads**: deploy code that reads the new column (still writing both). Verify it. You can roll back to reading the old one.

**5. Stop writing the old column**: deploy code that no longer touches `fullname`.

**6. Contract**: once nothing uses it (and you've waited long enough that rollback to old code isn't plausible), drop the old column.

```sql
ALTER TABLE users DROP COLUMN fullname;
```

Each step is a **small, independently deployable, reversible change**. At every moment, both the old and the new code work.

## The pattern applies broadly

- **Renaming or changing a column's type or meaning.**
- **Splitting or merging tables.**
- **Changing an API**: add the new endpoint or field, migrate clients, then remove the old ([API versioning](/t/api-versioning)).
- **Changing message formats** between producers and consumers ([schema evolution](/t/schema-evolution)).
- **Replacing a dependency or service**: run both, compare, switch, retire.

## Practical points

- **Never combine a destructive step with the step that stops using the thing.** Drop columns only after you're sure nothing reads them (check logs, queries, and wait a release or two).
- **Make step order enforceable**: separate migrations or PRs, with checks.
- **Dual writes must be consistent.** Use one transaction or the same code path. Verify with a comparison query before switching reads.
- **Add constraints last.** Make a column `NOT NULL` only after the backfill is complete.
- **It takes more steps and longer**, and that's the cost of safety. For tiny, internal, downtime-tolerant systems, a one-step change might be acceptable.
- **Keep a record** of where you are in the sequence, since it spans days or weeks. A checklist in the ticket helps.

Combine with the database-specific techniques in [zero-downtime migrations](/t/zero-downtime-migration) and the deploy ordering in [schema and code deploys](/t/schema-and-code-deploys).
