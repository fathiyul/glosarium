---
title: "Stored Procedure"
summary: "Logic that runs inside the database."
levels: { backend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["stored procedure", "stored procedures", "stored routine"]
prereqs: ["sql", "database"]
related: ["view", "db-trigger", "query-plan", "transaction"]
---

A **stored procedure** is code — SQL plus procedural logic — stored and executed inside the database. You call it like a function, and it runs near the data, potentially looping, branching and running several statements without a round trip to the application.

```sql
CREATE PROCEDURE transfer(from_id INT, to_id INT, amount NUMERIC) AS $$
BEGIN
  UPDATE accounts SET balance = balance - amount WHERE id = from_id;
  UPDATE accounts SET balance = balance + amount WHERE id = to_id;
END; $$ LANGUAGE plpgsql;

CALL transfer(1, 2, 100);
```

The case for them: fewer network round trips, logic close to the data, and a single place to enforce a rule for every caller (including other systems). A whole transaction can run in one call.

The case against them: they're harder to test, version, review and debug than application code; IDEs and tooling are weaker; and business logic splits across two languages and two deployment pipelines. Modern high-level languages and ORMs have made the round-trip argument less decisive.

The classic mistakes:

- Putting business logic there by default. Spreading rules between app code and stored procedures makes the system harder to understand, test and change. Prefer app code unless there's a strong reason.
- Making them the only interface. When a procedure is the sole way to mutate data, the app becomes a thin caller and the real logic hides in the database, invisible to normal code review.
- Ignoring transaction semantics. A procedure often runs in the caller's transaction — good for atomicity, but long procedures hold locks. Understand the boundaries.
- Forgetting permissions. Procedures can run with elevated privileges (definer's rights), which can be a security tool *or* a hole. Know which model you're using.
- Portability. Procedural SQL dialects differ sharply (PL/pgSQL, T-SQL, PL/SQL); heavy use ties you to one database.
- Versioning. Procedures live in the schema; changing them is a [migration](/t/migration-tools), not a code deploy, which changes your release process.

**When to use them:** for performance-critical, data-local work, batch operations that avoid round trips, and enforcing a rule for all callers including non-application systems. Otherwise, keep logic in application code where it's testable and visible. See [views](/t/view), [triggers](/t/db-trigger) and [query plans](/t/query-plan).
