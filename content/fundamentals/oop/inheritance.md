---
title: "Inheritance"
summary: "A class reusing and extending another class."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["subclass", "superclass", "extends"]
prereqs: ["class"]
related: ["composition-over-inheritance", "polymorphism", "method-overriding", "abstract-class", "liskov-substitution-principle"]
---

Inheritance lets one class reuse and extend another. The new class (the subclass or child) gets the fields and methods of the old one (the superclass or parent), and can add or change things.

```python
class Animal:
    def __init__(self, name):
        self.name = name
    def speak(self):
        return "..."

class Dog(Animal):                  # Dog inherits from Animal
    def speak(self):                # overrides the parent's method
        return "Woof"

d = Dog("Rex")
d.name                              # "Rex", from Animal
d.speak()                           # "Woof"
```

```java
class Dog extends Animal { ... }
```

It models an is-a relationship: a Dog is an Animal, so anywhere an `Animal` is expected, a `Dog` works ([polymorphism](/t/polymorphism)).

## Where it works

Real is-a hierarchies and framework base classes (an exception type, a test case, a UI widget).

## Where it goes wrong

- **Deep hierarchies** are hard to follow and fragile. A change in a parent can break every child.
- **Reuse for convenience.** Inheriting just to borrow a few methods creates a false "is-a" relationship ([composition over inheritance](/t/composition-over-inheritance)).
- **Subclasses that break the parent's promises**, like a `Square` that can't be used wherever a `Rectangle` can ([Liskov substitution](/t/liskov-substitution-principle)).
- **Tight coupling** to a parent's internals.

## Practical tips

- Keep hierarchies shallow, one or two levels.
- Call the parent's constructor (`super().__init__(...)`) when you override it ([constructors](/t/constructor)).
- Mark parent methods you intend to change as overridable, and document them ([method overriding](/t/method-overriding)).
- Python supports multiple inheritance. Java and C# allow only one parent class, plus [interfaces](/t/interface).
