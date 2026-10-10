---
title: "Unique Index"
summary: "An index that also enforces uniqueness."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["unique index", "unique constraint", "uniqueness"]
prereqs: ["db-index", "constraint"]
related: ["index-selectivity", "natural-vs-surrogate-key", "primary-key"]
---

A **unique index** does double duty: it makes lookups fast *and* enforces that no two rows share the indexed value(s). It's how a database guarantees "one account per email" or "one order number". In most databases, a unique constraint is implemented as a unique index.

```sql
CREATE UNIQUE INDEX users_email_key ON users (lower(email));
```

That both speeds up lookups by email and rejects a second insert with the same email. Enforcing uniqueness in the database — not just in application code — is essential, because two concurrent requests can both "check then insert" and slip past an application-only check (see [unique constraint guard](/t/unique-constraint-guard)).

The classic mistakes:

- Relying on application checks only. A check-then-insert in the app has a race: two requests can both see "no existing email" and both insert. Only a database unique constraint prevents the duplicate. Let the database be the source of truth.
- Case and whitespace. `Alice@x.com` and `alice@x.com` are different strings but the same person for most purposes. Index a normalised form (`lower(email)`, trimmed) if that's the intended uniqueness.
- Forgetting NULLs. Most databases allow *many* NULLs in a unique index (NULLs aren't equal), which may or may not be what you want. A partial unique index can express "unique among non-null".
- Unique on a low-cardinality column. A unique index on something nearly all the same adds write cost and can't be used for speed. Uniqueness is about the constraint; make sure the column genuinely needs it (see [selectivity](/t/index-selectivity)).
- Ignoring the error. A duplicate insert raises an error; handle it and return a clear conflict (`409`) rather than a 500. Catch it by constraint name, not by string matching the message.
- Confusing unique with primary. A table has one primary key but may have several unique constraints on other columns (see [primary key](/t/primary-key)).

**How to use it:** add a unique index/constraint for every real-world uniqueness rule — emails, slugs, order numbers — and let the database enforce it. It's both a performance tool and, more importantly, a correctness guarantee that no amount of application logic replaces.
