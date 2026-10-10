---
title: "Atomicity"
summary: "All or nothing."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["atomicity", "atomic transaction", "all or nothing"]
prereqs: ["transaction", "acid"]
related: ["atomic-update", "savepoint", "transaction-boundaries"]
---

**Atomicity** is the "A" in [ACID](/t/acid): a group of operations wrapped in a transaction either **all** take effect or **none** do. If any step fails, the whole thing rolls back as if it never happened. There's no half-applied state left behind.

```text
BEGIN;
  UPDATE accounts SET balance = balance - 100 WHERE id = 1;
  UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;   -- both applied, or (on error) neither
```

That's essential for correctness: a money transfer that debits one account but fails to credit the other is worse than not transferring at all. Atomicity is what lets you treat several statements as one logical change.

The classic mistakes:

- Assuming anything outside the database rolls back. Atomicity covers database changes in the transaction. Sending an email, calling an API or writing a file inside the transaction does *not* roll back — those side effects persist even if the transaction fails. Keep external effects outside the transaction (or use the [outbox pattern](/t/inbox-pattern)).
- Forgetting to actually be in a transaction. Some drivers auto-commit each statement by default; if you don't open a transaction, two statements are two separate atomic units, and a failure between them leaves half the work done.
- Making transactions too big. Atomicity guarantees correctness, but a long transaction holds locks and versions; keep the unit of work small (see [transaction boundaries](/t/transaction-boundaries)).
- Expecting rollback from a crash. Atomicity holds even across a crash, thanks to the [write-ahead log](/t/wal) — but only for committed data; uncommitted work is discarded.
- Confusing atomicity with isolation. Atomicity is "all or nothing"; isolation is "concurrent transactions don't see each other's half-done work" (see [MVCC](/t/mvcc)). Both matter, and both are ACID properties.
- Ignoring application-level partial failure. If your code does three writes and a fourth fails without a transaction, you've created partial state. Wrap related writes.

**How to apply it:** wrap every logically-indivisible set of writes in a transaction, keep non-database side effects outside it, and prefer [atomic updates](/t/atomic-update) within it. Atomicity is one of the properties that make a relational database a safe place to do important work.
