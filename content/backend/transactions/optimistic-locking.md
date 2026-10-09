---
title: "Optimistic Locking"
summary: "Detecting conflicts with a version number at write time."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["optimistic concurrency control", "OCC", "version column", "optimistic lock", "compare-and-swap update"]
prereqs: ["transaction", "read-modify-write"]
related: ["pessimistic-locking", "lost-update", "race-condition", "atomic-update", "isolation-level", "etag"]
core: [backend]
---

**Optimistic locking** assumes conflicts are **rare**. Instead of locking a row while someone edits it, you let everyone read freely, and **detect at write time** whether someone else changed it in the meantime. If so, the write is rejected and the caller retries or reports a conflict.

The usual mechanism is a **version number** column:

```sql
-- Read: version = 7
SELECT id, title, body, version FROM documents WHERE id = 42;

-- Write: succeeds only if nobody changed it since version 7
UPDATE documents
SET title = :title, body = :body, version = version + 1
WHERE id = 42 AND version = 7;
-- 1 row updated  → success
-- 0 rows updated → someone else got there first: conflict
```

```python
rows = db.execute("UPDATE documents SET body=%s, version=version+1 WHERE id=%s AND version=%s",
                  (body, doc_id, version))
if rows == 0:
    raise ConflictError("The document was changed by someone else. Reload and try again.")
```

This prevents the [lost update](/t/lost-update): two users open the same record, both edit it, and the second save silently overwrites the first.

## Variants

- A **version integer** (as above), a **timestamp** (`updated_at`), or a **hash** of the content.
- Many ORMs support it directly (a `@Version` field in JPA, `lock_version` in Rails).
- **HTTP**: the `ETag` header plus `If-Match` on updates gives the same protection over an API. A mismatch returns `412 Precondition Failed` ([ETag](/t/etag)).

## When it fits

- **Low contention**: users rarely edit the same record at the same time (profile edits, documents, settings).
- **Long "think time"**: forms that stay open for minutes. Holding a database lock that long would be unacceptable.
- Web applications, where requests are stateless anyway.

## When it doesn't

- **High contention** on hot rows (a counter, inventory of a popular item). Most attempts conflict, and retries waste work. Use an atomic update (`SET stock = stock - 1`) or a lock instead ([atomic update](/t/atomic-update), [pessimistic locking](/t/pessimistic-locking)).

## Handling a conflict

Decide what the user or caller sees: automatically **retry** (for background work, re-read and re-apply), or **show a message** and let the user merge ("This item was updated by Ana. Reload to see her changes"). Don't silently overwrite.

It's also the principle behind compare-and-swap in lock-free programming ([lock-free](/t/lock-free)).
