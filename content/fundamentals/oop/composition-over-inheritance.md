---
title: "Composition over Inheritance"
summary: "Building behavior by combining objects instead of deep class hierarchies."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["favor composition over inheritance", "has-a vs is-a", "composition vs inheritance"]
prereqs: ["inheritance", "interface"]
related: ["inheritance", "polymorphism", "interface", "mixin", "program-to-interface", "liskov-substitution-principle", "dependency-injection"]
core: [backend]
---

**Inheritance** says a class *is a* kind of another (`Dog` is an `Animal`) and gets its behavior automatically. **Composition** says a class *has* other
objects and uses them (`Car` has an `Engine`). The guideline: **prefer building behavior by combining small objects over deep class hierarchies.**

## Where inheritance hurts

Subclasses are tightly tied to their parent's internals. Hierarchies grow rigid:

```python
class Employee: ...
class Manager(Employee): ...
class Contractor(Employee): ...
class RemoteManager(Manager): ...
class RemoteContractor(Contractor): ...    # every new trait multiplies the classes
```

Problems: changes to the base class ripple into every subclass, a subclass inherits things it doesn't want, and combinations of traits (remote, manager, part-time)
explode into many classes.

## The composition version

Pull each varying behavior into its own object and plug it in:

```python
class Employee:
    def __init__(self, name, pay: PayPolicy, location: WorkLocation):
        self.name = name
        self.pay = pay                 # strategy objects, chosen per instance
        self.location = location

class Salaried:
    def monthly_pay(self, emp): ...
class Hourly:
    def monthly_pay(self, emp): ...

Employee("Ana", pay=Salaried(), location=Remote())
```

Now any combination is just a different set of parts. You can swap behavior at runtime, test each part on its own, and add a new policy without touching
existing classes ([dependency injection](/t/dependency-injection)).

## Rules of thumb

- Use inheritance for a real **is-a** relationship where substitution is safe: any `Dog` can be used where an `Animal` is expected
  ([Liskov substitution](/t/liskov-substitution-principle)).
- **Don't inherit just to reuse code.** Reuse by having a helper object instead.
- Depend on **interfaces** (small contracts) rather than concrete parents ([program to an interface](/t/program-to-interface)).
- Keep hierarchies shallow (one or two levels). If you need a diagram to explain it, it's too deep.
- Framework base classes (an `Exception`, a `Model`, a test case) are an acceptable use of inheritance.

Mixins ([mixins](/t/mixin)) and traits sit in between, and need the same care.
