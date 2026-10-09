---
title: "Pessimistic Locking"
summary: "Locking rows before changing them, e.g. with SELECT ... FOR UPDATE."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["SELECT FOR UPDATE", "row locking", "explicit locks", "pessimistic concurrency", "FOR UPDATE"]
prereqs: ["transaction", "optimistic-locking"]
related: ["optimistic-locking", "row-vs-table-lock", "db-deadlock", "lost-update", "isolation-level", "inventory-reservations"]
core: [backend]
---

**Pessimistic locking** assumes conflicts are **likely**, so it **locks the data first**, before reading and changing it. Anyone else who wants the same rows has to wait until you finish.

```sql
BEGIN;
SELECT stock FROM products WHERE id = 7 FOR UPDATE;     -- locks this row until the transaction ends
-- ...check the stock, decide...
UPDATE products SET stock = stock - 1 WHERE id = 7;
COMMIT;                                                  -- lock released
```

A second transaction running the same `SELECT ... FOR UPDATE` **blocks** at that line until the first commits or rolls back, then sees the updated value. That closes the [check-then-act race](/t/check-then-act): two buyers can't both see "1 left".

## Variants and options

- `FOR UPDATE`: exclusive lock for rows you'll modify. `FOR SHARE`: others can read-lock but not modify.
- `NOWAIT`: fail immediately if the row is locked, instead of waiting.
- `SKIP LOCKED`: skip rows that other transactions have locked. Handy for worker queues, where each worker grabs different jobs.

```sql
SELECT id FROM jobs WHERE status = 'pending'
ORDER BY id LIMIT 10
FOR UPDATE SKIP LOCKED;
```

(Syntax details vary by database.)

## When it fits

- **High contention** on the same rows, where optimistic retries would constantly fail.
- **Critical correctness** around things like inventory and balances, and short read-decide-write sequences.
- When you can't easily make the change a single atomic statement ([atomic update](/t/atomic-update)).

## Risks and rules

- **Keep transactions short.** Locks held while waiting for a user, a slow API or a long computation block everyone else.
- **Deadlocks**: two transactions lock rows in opposite order and wait for each other forever. The database detects it and kills one. Prevent it by **always locking in a consistent order** ([deadlocks](/t/db-deadlock)).
- **Lock only what you need**, in rows rather than whole tables ([row vs table lock](/t/row-vs-table-lock)).
- **Reduced throughput**: waiting is the cost.
- **Locks only exist within a transaction.** Outside one, `FOR UPDATE` releases immediately in many setups.
- **Don't hold locks across network calls** to other services.

Compare with [optimistic locking](/t/optimistic-locking), which doesn't block but may reject. A common guideline: optimistic for low contention and long edits, pessimistic or atomic statements for high contention and short critical sections.
