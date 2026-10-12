---
title: "Object-Oriented Programming"
summary: "Organizing code around objects that bundle data and behavior."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["object-oriented", "object oriented programming", "OOP"]
prereqs: ["class", "object"]
related: ["encapsulation", "inheritance", "polymorphism", "abstraction", "composition-over-inheritance", "functional-programming"]
---

Object-oriented programming (OOP) organizes code around objects that bundle data with the behavior that works on it, instead of keeping data and functions apart.

```python
class Invoice:
    def __init__(self, items):
        self.items = items
    def total(self):
        return sum(i.price * i.qty for i in self.items)
    def send(self, mailer):
        mailer.send(self.total())
```

## The four ideas usually listed

| Idea | Meaning |
|---|---|
| [Encapsulation](/t/encapsulation) | An object hides its internals and exposes a small interface |
| [Abstraction](/t/abstraction) | Use something by what it does, not how |
| [Inheritance](/t/inheritance) | One class extends another |
| [Polymorphism](/t/polymorphism) | Different objects answer the same call in their own way |

## Why it caught on

It matches how we describe many problems (a customer, an order), keeps related code together, and gives names to responsibilities. Big frameworks in Java, C#, Python and Ruby are built this way.

## Honest trade-offs

- **Inheritance gets overused.** Deep hierarchies are rigid. Prefer combining small objects ([composition over inheritance](/t/composition-over-inheritance)).
- **Not everything is an object.** Plain functions and data are simpler for many tasks, and languages like Python and JavaScript let you mix styles. Functional programming avoids shared mutable state altogether ([functional programming](/t/functional-programming)).
- **Anemic objects** (only getters and setters, with all logic elsewhere) lose the benefit.
- **Too many tiny classes** can hide the logic across files.

Learn the ideas, but let the problem, not the paradigm, decide how to structure the code.
