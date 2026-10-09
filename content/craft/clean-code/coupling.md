---
title: "Coupling"
summary: "How much modules depend on each other's internals; less is better."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["loose coupling", "tight coupling", "low coupling", "module coupling", "decoupling"]
prereqs: ["cohesion"]
related: ["cohesion", "dependency-inversion-principle", "law-of-demeter", "dependency-injection", "shotgun-surgery", "separation-of-concerns"]
core: [backend, frontend]
---

**Coupling** is how much one module depends on the details of another. **Tight** coupling means a change in one forces changes in the other. **Loose** coupling means modules interact through
small, stable interfaces and can change independently.

```python
# Tightly coupled: Checkout knows how the database and the email provider work
class Checkout:
    def complete(self, order):
        conn = psycopg2.connect("postgres://prod-db/shop")          # concrete database
        conn.cursor().execute("UPDATE orders SET status='paid' WHERE id=%s", (order.id,))
        smtplib.SMTP("mail.example.com").sendmail(...)               # concrete mail library

# Looser: depends on small interfaces, supplied from outside
class Checkout:
    def __init__(self, orders: OrderRepository, notifier: Notifier):
        self.orders, self.notifier = orders, notifier
    def complete(self, order):
        self.orders.mark_paid(order.id)
        self.notifier.order_paid(order)
```

Now you can change the database, replace the mail provider or test with fakes without touching `Checkout`.

## Forms of coupling to watch for

- **Reaching into internals**: `a.b.c.d.do()`, where a caller knows the structure of distant objects ([law of Demeter](/t/law-of-demeter)).
- **Shared global state** or a shared database table that several services write to.
- **Concrete dependencies** hard-coded instead of passed in ([dependency injection](/t/dependency-injection)).
- **Knowing about order or timing**: "call A, then B, then C, or it breaks".
- **Shared data structures** whose shape everyone assumes.
- **Between services**: one service depending on another's internal database, or its exact response fields.

## Why it matters

Tightly coupled systems are hard to change: a small modification ripples everywhere ([shotgun surgery](/t/shotgun-surgery)), they're hard to test in isolation and hard to reuse, and a failure in one part spreads.

## Reducing it

- **Depend on interfaces and abstractions**, not concrete implementations ([dependency inversion](/t/dependency-inversion-principle)).
- **Pass dependencies in** instead of creating them inside.
- **Communicate through events or messages** where immediate calls aren't needed.
- **Hide internals**: expose a small public surface and keep the rest private.
- **Keep modules cohesive** ([cohesion](/t/cohesion)).

## Balance

Some coupling is necessary and healthy. Components must interact. The aim isn't zero coupling, which would mean no collaboration. It's **coupling to stable, narrow, intentional interfaces**,
and as little as you can get away with. Over-abstracting a stable part to avoid coupling creates complexity of its own ([premature abstraction](/t/premature-abstraction)).
