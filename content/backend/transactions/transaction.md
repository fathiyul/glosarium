---
title: "Transaction"
summary: "A group of operations that succeed or fail together."
levels: { backend: junior, data-engineer: junior }
aliases: ["database transaction", "DB transaction", "BEGIN COMMIT ROLLBACK", "commit and rollback"]
prereqs: ["relational-database", "crud"]
related: ["acid", "atomicity", "isolation-level", "transaction-boundaries", "savepoint", "distributed-transaction"]
core: [backend]
---

A **transaction** groups several database operations into one unit that **either all happen or none do**. If something
fails halfway, the database undoes the partial work.

The classic example is moving money:

```sql
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;        -- make both changes permanent
-- or ROLLBACK; to undo both
```

If the server crashes after the first `UPDATE`, without a transaction you'd have taken the money and never given it to
anyone. With one, the first change is rolled back.

In application code:

```python
with db.transaction():            # commits on success, rolls back if an exception escapes
    order = create_order(cart)
    reserve_stock(order)
    record_payment(order)
```

## The guarantees (ACID)

Transactions provide **A**tomicity (all or nothing), **C**onsistency (rules and constraints hold), **I**solation (concurrent
transactions don't see each other's half-finished work) and **D**urability (once committed, it survives crashes). See
[ACID](/t/acid) and [isolation levels](/t/isolation-level).

## Practical rules

- **Wrap related writes together**, and make sure an error causes a rollback, not a half-saved state.
- **Keep them short.** Open transactions hold locks and block other work. Don't wait for user input or call slow external
  APIs inside one.
- **Don't send the email or charge the card inside the transaction** without thinking: you can't roll those back. A
  common pattern is to commit first, then perform the side effect (see [transactional outbox](/t/transactional-outbox)).
- **Know your autocommit setting.** In many drivers each statement commits immediately unless you start a transaction.
- **Concurrent updates** can still produce anomalies. Use atomic updates, locking or the right isolation level
  ([lost updates](/t/lost-update)).
- A transaction covers **one database**. Across services you need other techniques
  ([distributed transactions](/t/distributed-transaction)).

See [transaction boundaries](/t/transaction-boundaries) for deciding where in the code they should start and end.
