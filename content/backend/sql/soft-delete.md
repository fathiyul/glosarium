---
title: "Soft Delete"
summary: "Marking rows as deleted instead of removing them."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["soft delete", "soft deletes", "logical delete"]
prereqs: ["schema", "constraint"]
related: ["audit-columns", "record-history", "foreign-key"]
---

A **soft delete** keeps a row in the table but marks it deleted — usually a `deleted_at` timestamp (or an `is_deleted` flag). The row is hidden from normal queries but never physically removed. It preserves history and referential integrity: a deleted user's orders still point at a real row.

```text
hard delete: DELETE FROM users WHERE id = 42;         (row gone)
soft delete: UPDATE users SET deleted_at = now() WHERE id = 42;  (row hidden)
```

Why teams do it: undo, audit trails, and avoiding broken foreign keys when related data exists. Deleting a customer who has invoices is often wrong; marking them deleted keeps the invoices valid.

The classic mistakes:

- Forgetting to filter. The signature soft-delete bug: a query that doesn't add `WHERE deleted_at IS NULL` returns deleted records. Every read must filter — one missed join and deleted data reappears. Enforce it centrally (a default scope, a view, or [row-level security](/t/row-level-security)).
- Unique constraints vs soft deletes. A unique constraint on email blocks a new user with the same email as a soft-deleted one. You need a partial unique index (`WHERE deleted_at IS NULL`) or a different scheme.
- Treating it as free. Deleted rows accumulate; tables grow, scans slow, and storage cost rises. Soft delete is deferral, not deletion — plan eventual hard deletion or archiving.
- Privacy and retention conflicts. Regulations may *require* actual deletion ("right to be forgotten"). A soft delete that keeps personal data can violate that. Know which data must truly go (see [GDPR](/t/gdpr)).
- Cascading confusion. With soft deletes, cascading deletes don't happen; you must handle related rows explicitly, or orphaned "live" children of a "deleted" parent appear.
- No audit of who deleted what. A `deleted_at` alone loses who and why; add [audit columns](/t/audit-columns) or use [record history](/t/record-history).

**When to use it:** when you need undo, referencing or history, and rarely hard-delete. Combine it with a strict, central filter, a partial unique index, and a retention plan for eventual removal. For genuinely disposable data, a hard delete is simpler and honest — don't soft-delete everything by reflex.
