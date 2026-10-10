---
title: "Unit of Work"
summary: "Tracking changes and committing them in one transaction."
levels: { backend: senior }
aliases: ["unit of work", "unit of work pattern", "change tracking"]
prereqs: ["identity-map", "transaction"]
related: ["data-mapper", "repository-pattern", "orm", "enterprise-application-patterns"]
---

A **unit of work** keeps track of the objects you've loaded and changed during a business operation, and writes them all to the database in one coordinated transaction at the end. Instead of saving after every change, you accumulate inserts, updates and deletes, then commit them together. If anything fails, the whole set rolls back, leaving the database consistent.

```text
uow = UnitOfWork()
uow.register(order)        # mark for update
order.status = "shipped"
uow.register(new Shipment())  # mark for insert
uow.commit()               # one transaction: all or nothing
```

It's the pattern behind how ORMs flush changes: you mutate your in-memory objects during a request, and at the end the unit of work figures out the minimal set of SQL statements and runs them in one [transaction](/t/transaction). It usually works with an [identity map](/t/identity-map) (so it knows which row each object represents) and a [data mapper](/t/data-mapper) (so it knows how to write each object).

The main benefits are atomicity and efficiency: one transaction means consistency on failure, and batching avoids a round trip per change.

The classic mistakes:

- Forgetting to commit or roll back. A unit of work that never commits silently discards changes; one that never rolls back on error leaves things half-done. Scope it to the request/business operation and make its lifetime explicit.
- A long-lived unit of work. Accumulating changes across a whole app session holds a transaction open, keeps locks, and grows stale. A unit of work should be short — one operation.
- Concurrency surprises. Lost updates happen when two units of work change the same row; handle them with version checks or locking, since the pattern itself doesn't.
- Assuming it replaces transactions. It *uses* transactions; it doesn't remove the need to think about isolation levels and conflicts.
- Hand-rolling it over an ORM. If your persistence tool already provides change tracking and flushing, you usually just use it, rather than building your own.

**When to use it:** when a business operation touches several objects that must be saved atomically, especially with a rich [domain model](/t/domain-model-pattern). It's a core pattern in Fowler's [enterprise application patterns](/t/enterprise-application-patterns), and it's the mechanism that makes "change objects freely, save at the end" safe. Pair it with a [repository](/t/repository-pattern) for clean access to persisted aggregates.
