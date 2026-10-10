---
title: "Repository Pattern"
summary: "A collection-like interface over data storage."
levels: { backend: mid-level }
aliases: ["repository", "data repository"]
prereqs: ["design-pattern"]
related: ["data-mapper", "active-record-pattern", "fake", "schema"]
also: [sql]
---

The repository pattern gives the rest of the application a collection-like interface for a kind of object, with operations such as add, get and find. The code that uses the repository thinks in terms of orders or users, and the storage details, such as SQL queries or a document store, stay inside the repository.

```python
class OrderRepository:
    def __init__(self, db):
        self._db = db

    def add(self, order):
        self._db.execute("INSERT INTO orders (id, total) VALUES (?, ?)",
                         (order.id, order.total))

    def get(self, order_id):
        row = self._db.execute("SELECT id, total FROM orders WHERE id = ?",
                               (order_id,)).fetchone()
        return Order(id=row[0], total=row[1]) if row else None
```

Services call `repo.get(1042)` and never write SQL. A test can give the service an in-memory repository, which is a [fake](/t/fake), and check the behaviour without a database.

The trade-off is that the repository can become a thin wrapper that passes every query through, so it adds a layer without isolating anything. Queries that are awkward to express through a collection-like interface can push the design toward something else.

The classic mistake is building a generic repository with `find(**filters)` that accepts any query, which leaks the storage language into every caller. Keep the methods specific to what the application needs. Mapping objects to rows is the job of a [data mapper](/t/data-mapper), and the [active record pattern](/t/active-record-pattern) takes a different route, where the object saves itself. Keep the [schema](/t/schema) as the source of truth for the stored shape.
