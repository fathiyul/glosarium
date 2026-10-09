---
title: "Polymorphism"
summary: "One interface with many implementations chosen at runtime."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["subtype polymorphism", "dynamic dispatch"]
prereqs: ["inheritance", "method-overriding"]
related: ["inheritance", "interface", "method-overriding", "duck-typing", "program-to-interface"]
---

Polymorphism means "many forms": one interface, many implementations. Code calls the same method on different kinds of objects, and each does the right thing for its type.

```python
class Circle:
    def area(self): return 3.14159 * self.r ** 2

class Square:
    def area(self): return self.side ** 2

shapes = [Circle(...), Square(...)]
total = sum(s.area() for s in shapes)      # no if/else on type
```

The loop doesn't know or care which shape it has. Adding a `Triangle` later needs no change to it.

## How it's achieved

- **Inheritance and overriding**: subclasses redefine a parent's method ([method overriding](/t/method-overriding)).
- **Interfaces**: unrelated classes promise to provide the same methods ([interfaces](/t/interface)).
- **Duck typing**: in Python and JavaScript, anything with the right method works. "If it quacks like a duck" ([duck typing](/t/duck-typing)).

## Why it's valuable

It removes long `if type == ... elif type == ...` chains:

```python
if kind == "card": pay_card()
elif kind == "paypal": pay_paypal()      # every new kind edits this code
```

becomes `payment_method.pay(amount)`, where each class carries its own behavior. New cases are added by writing new classes, not by editing old code ([open/closed principle](/t/open-closed-principle)).

## Also called

Other meanings: overloading (the same name with different parameters) and generics (code that works over many types) are related, but the core meaning in OOP is choosing behavior at runtime based on the object's actual type.

Keep the substitution rule: a subtype must work wherever the parent is expected ([Liskov substitution](/t/liskov-substitution-principle)).
