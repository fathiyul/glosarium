---
title: "Dependency Inversion Principle (D)"
summary: "Depend on abstractions, not concrete implementations."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["DIP", "dependency inversion"]
prereqs: ["interface"]
related: ["dependency-injection", "interface", "encapsulate-what-varies", "stub-double"]
---

The dependency inversion principle, the last of the SOLID principles, says high-level code should not depend on low-level details. Both should depend on an abstraction. Instead of a report generator calling a specific database class, it depends on an interface describing what it needs, and the database class fits that interface.

```python
from typing import Protocol

class OrderStore(Protocol):
    def save(self, order) -> None: ...

class ReportService:
    def __init__(self, store: OrderStore):   # depends on the abstraction
        self.store = store

    def export(self, order):
        self.store.save(order)

# The concrete store is supplied from outside, e.g. a PostgresOrderStore
# in production and a fake in tests.
```

The main payoff is testability and replaceability. The report service can run against a fake store in a test, and changing the database doesn't require editing the report code.

The trade-off is indirection. Every abstraction adds a layer that a reader must follow, and an interface with a single implementation that never changes adds little. The principle pays off where there are real variations or real boundaries, such as databases, networks and clocks.

The classic mistake is creating interfaces for every class by reflex, so the code is full of one-implementation abstractions. Apply the principle at the boundaries that matter, and let stable internal code depend on concrete classes. [Dependency injection](/t/dependency-injection) is the usual way to supply the concrete implementation, and [stubs](/t/stub-double) are the easiest beneficiaries in tests.
