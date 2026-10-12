---
title: "SOLID Principles"
summary: "Five object-oriented design principles for maintainable code."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["SOLID principles", "SOLID design principles", "object-oriented design principles", "S.O.L.I.D."]
prereqs: ["inheritance", "interface"]
related: ["single-responsibility-principle", "open-closed-principle", "liskov-substitution-principle", "interface-segregation-principle", "dependency-inversion-principle", "coupling"]
core: [backend, frontend]
---

**SOLID** is a set of five design guidelines for object-oriented code, popularized by Robert C. Martin. They aim at code that's easy to change and test without breaking
other parts. Each letter is one principle:

| Letter | Principle | In one line |
|---|---|---|
| **S** | [Single Responsibility](/t/single-responsibility-principle) | A module has **one reason to change** |
| **O** | [Open/Closed](/t/open-closed-principle) | Open for extension, closed for modification: add behavior without editing working code |
| **L** | [Liskov Substitution](/t/liskov-substitution-principle) | A subtype must work anywhere its parent is expected, without surprises |
| **I** | [Interface Segregation](/t/interface-segregation-principle) | Many small, focused interfaces beat one big one: don't force clients to depend on methods they don't use |
| **D** | [Dependency Inversion](/t/dependency-inversion-principle) | High-level code depends on **abstractions**, not on concrete low-level details |

A quick feel for each:

```python
# O: extend by adding a new class, not by editing a growing if/elif
class PaymentMethod: def pay(self, amount): ...
class Card(PaymentMethod): ...
class BankTransfer(PaymentMethod): ...

# D: depend on the abstraction, receive the concrete one from outside
class Checkout:
    def __init__(self, payment: PaymentMethod): self.payment = payment
```

## Why people use them

They push toward **small cohesive modules, loose coupling and substitutable parts**, which make code easier to test and to change ([cohesion](/t/cohesion), [coupling](/t/coupling)).

## A balanced view

- They're **guidelines, not laws**. Applied dogmatically, they lead to piles of tiny classes, interfaces with a single implementation and indirection nobody needs
  ([KISS](/t/kiss), [YAGNI](/t/yagni), [premature abstraction](/t/premature-abstraction)).
- They came from class-based OOP. The ideas transfer to functions, modules and services, but the wording doesn't always fit.
- Use them as **questions when code hurts**: "Why does this keep changing?" (SRP), "Why must I edit this switch every time?" (OCP), "Why do the tests need so much setup?" (DIP).
- They're a staple of interviews. Be ready to explain each with an example, and to say when you wouldn't apply them.

Learn the principles by feeling the problems they solve. Understanding the *pain* is more valuable than memorizing the acronym.
