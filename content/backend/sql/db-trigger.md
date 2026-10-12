---
title: "Trigger"
summary: "Code the database runs automatically on insert, update or delete."
levels: { backend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["trigger", "database trigger", "triggers"]
prereqs: ["sql", "constraint"]
related: ["stored-procedure", "audit-columns", "schema"]
---

A **trigger** is a piece of code the database runs automatically when a row is inserted, updated or deleted. You attach it to a table and an event (e.g. `AFTER INSERT`), and it fires as part of the statement, invisibly to whoever ran it.

```sql
CREATE TRIGGER set_updated_at
BEFORE UPDATE ON orders
FOR EACH ROW EXECUTE FUNCTION touch_updated_at();
```

Common uses: maintaining an `updated_at` timestamp, writing [audit](/t/audit-columns) rows, enforcing invariants that a [constraint](/t/constraint) can't express, and keeping derived data in sync.

The appeal is that the behaviour happens no matter who writes — application, admin tool, migration — so a rule can't be bypassed. The cost is that the behaviour is **hidden**: a plain `UPDATE` quietly does more than it says.

The classic mistakes:

- Surprising side effects. A trigger that sends an email, calls out to another system, or updates ten tables makes a simple statement do a lot. Debuggers and developers can't see it in the application code. Keep triggers to local, data-level effects.
- Recursive or cascading triggers. A trigger that updates a table with its own trigger can loop or fire unexpectedly. Know the firing order and guard against recursion.
- Heavy work per row. A `FOR EACH ROW` trigger running a query or complex logic fires for every row; a bulk update of a million rows runs it a million times. Prefer set-based logic or `FOR EACH STATEMENT`.
- Enforcing what a constraint could. If a `CHECK`, unique or foreign key can express the rule, use the constraint — it's declarative, visible and efficient. Triggers are for what constraints can't do.
- Version-skew with the application. A trigger that depends on application assumptions (a status value, a naming convention) breaks silently when the app changes. Document and test triggers like code.
- Portability. Trigger syntax and capabilities differ widely across databases.

**When to use them:** for database-local invariants, audit columns, and keeping a denormalised field consistent — where they can't be bypassed. Keep them small, documented and tested, and avoid putting business workflows in them. See [stored procedures](/t/stored-procedure) and [constraints](/t/constraint).
