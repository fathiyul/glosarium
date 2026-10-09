---
title: "Encapsulation"
summary: "Hiding internal state behind a public interface."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["information hiding", "data hiding"]
prereqs: ["class", "access-modifier"]
related: ["abstraction", "access-modifier", "getter-setter", "coupling", "class"]
---

Encapsulation means bundling data with the code that works on it, and hiding the internals behind a public interface. Outside code uses the methods, not the fields.

```python
class Account:
    def __init__(self):
        self._balance = 0            # internal state

    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("amount must be positive")
        self._balance += amount

    def balance(self):
        return self._balance
```

Nobody can set `_balance` to a negative number by accident. The only way in is `deposit`, which enforces the rule.

## Why it matters

- **Rules in one place.** Validation lives next to the data, not copy-pasted at every call site.
- **Freedom to change.** You can store the balance as cents, or in a database, and callers don't notice.
- **Fewer bugs.** An object can't be left in an invalid state by outside code.
- **Less coupling.** Other code depends on a small interface, not on how it's built ([coupling](/t/coupling)).

## The common failure

A class with public fields and getters and setters for all of them hides nothing:

```python
account.balance = -500        # anyone can break it
```

Encapsulation is about protecting invariants (things that must always be true), not about adding boilerplate ([getters and setters](/t/getter-setter)).

## Also at larger scales

The same idea applies to modules and services: expose a small API, keep the database tables and helper functions private ([modular monolith](/t/modular-monolith)).

Languages help with [access modifiers](/t/access-modifier). Python relies on convention (`_name`).
