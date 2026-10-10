---
title: "Savepoint"
summary: "A point inside a transaction you can roll back to."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["savepoint", "transaction savepoint", "nested rollback"]
prereqs: ["transaction", "atomicity"]
related: ["transaction-boundaries", "atomicity"]
---

A **savepoint** is a named point inside a transaction that you can roll back to without abandoning the whole transaction. It gives you a **partial rollback**: undo the work after the savepoint, keep the work before it, and continue.

```sql
BEGIN;
  INSERT INTO orders ...;
  SAVEPOINT before_items;
  INSERT INTO order_items ...;   -- fails
  ROLLBACK TO before_items;      -- undo just the items insert
  -- order still exists; continue and COMMIT
COMMIT;
```

The common use is error recovery inside a larger unit of work: attempt an optional step; if it fails, roll back to the savepoint and carry on instead of aborting everything. It's also used for nested logic in ORMs that implement "nested transactions".

The classic mistakes:

- Thinking a savepoint is a new transaction. It's not; it lives *inside* the current transaction. The outer transaction still commits or rolls back as a whole, and every change holds its locks until it does.
- Using savepoints to "try things" at scale. Each savepoint keeps the work before it; a long transaction with many savepoints holds locks and versions the whole time. Savepoints don't make a big transaction small.
- Ignoring that releasing a savepoint doesn't commit. `RELEASE SAVEPOINT` just forgets the checkpoint; the data is still uncommitted. Only `COMMIT` makes it durable.
- Emulating nested transactions carelessly. Cycling savepoints to fake nesting (as some ORMs do) works for rollback scope but not for independent commit/visibility; the changes aren't visible to other transactions until the outer commit.
- Forgetting the error state. In some databases an error puts the transaction in an aborted state where you must roll back to a savepoint before continuing — otherwise further statements fail.
- Overusing them for flow control. Frequent savepoint rollback/retry hides logic errors; sometimes the right fix is to check a condition before attempting the step.

**When to use them:** for partial recovery within a transaction — an optional insert, a batch where some items may fail but the rest should proceed. Keep transactions short regardless, and remember a savepoint's scope is rollback, not independence. See [transaction boundaries](/t/transaction-boundaries) and [atomicity](/t/atomicity).
