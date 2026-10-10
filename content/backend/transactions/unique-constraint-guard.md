---
title: "Unique Constraints as a Concurrency Guard"
summary: "Letting the database reject duplicates instead of checking first in code."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["unique constraint guard", "unique constraint concurrency", "duplicate prevention"]
prereqs: ["unique-index", "constraint"]
related: ["race-condition", "idempotence", "idempotency-key", "lost-update"]
---

A **unique constraint** is not just data validation — it's a concurrency guard. When several requests might create the same logical thing at once (two clicks on "sign up", two webhook retries, two workers claiming the same job), the database's uniqueness is what actually prevents duplicates. Application-level "check then insert" has a [race](/t/race-condition); a unique constraint doesn't.

```text
request A: SELECT ... none → INSERT
request B: SELECT ... none → INSERT   ← both saw none, both insert
```

With a unique index on the key, the second `INSERT` fails with a constraint violation — exactly the behaviour you want. You then treat the violation as "already exists" (idempotent success) rather than an error.

```sql
INSERT INTO users (email) VALUES ($1);   -- unique index on email catches the duplicate
```

The classic mistakes:

- Relying on a pre-check. `SELECT` then `INSERT` in two statements is the classic race; both transactions can pass the check. Only a unique constraint closes it.
- Treating the violation as a bug. A duplicate insert isn't necessarily an error — often it means the operation already happened (a retry). Catch the violation and return the existing resource or a success, making the operation [idempotent](/t/idempotence).
- Matching on the error message string. Detect the specific constraint (by name or error code), not by parsing human-readable text that differs across versions and locales.
- Wrong uniqueness scope. Uniqueness on the wrong columns (or forgetting a normalisation like lowercase email) lets logical duplicates through. Model exactly what "the same thing" means.
- Forgetting soft deletes and NULLs. A soft-deleted row still occupies the unique value unless you use a partial unique index (`WHERE deleted_at IS NULL`); multiple NULLs may be allowed. Design deliberately (see [soft delete](/t/soft-delete)).
- Assuming the client is the only writer. Background jobs, queues and other services also insert; the constraint protects against all of them.

**How to use it:** define the unique constraint for every real-world uniqueness rule; let inserts fail on duplicates; handle the failure as an idempotent "already done" case; and detect it by constraint name/code. It's one of the most reliable concurrency tools — the database enforcing the invariant no matter how many writers race. See [idempotency keys](/t/idempotency-key).
