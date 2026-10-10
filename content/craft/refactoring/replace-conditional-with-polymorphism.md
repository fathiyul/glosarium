---
title: "Replace Conditional with Polymorphism"
summary: "Swapping a type switch for subclasses or strategies."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["replace type code with polymorphism", "replace switch with polymorphism"]
prereqs: ["interface"]
related: ["open-closed-principle", "interface", "encapsulate-what-varies", "shotgun-surgery"]
---

Replace conditional with polymorphism is a refactoring that turns a switch on a type into a set of classes, each handling its own case. Instead of one function that checks which kind of thing it has, each kind knows how to do its own work, and the caller just asks for the result.

```python
# Before: every new payment type means editing this function
def fee(method, amount):
    if method == "card":
        return amount * 0.03
    elif method == "bank":
        return 0.5
    elif method == "cash":
        return 0
    raise ValueError(method)

# After: each type owns its fee, and new types add a class
class CardPayment:
    def fee(self, amount): return amount * 0.03

class BankPayment:
    def fee(self, amount): return 0.5

class CashPayment:
    def fee(self, amount): return 0
```

The rule for each kind now lives with that kind. Adding a payment type means adding a class, which is the [open/closed principle](/t/open-closed-principle) at work.

The trade-off is spreading one decision across several classes. A reader who wants to see every fee must look in several places, and a switch with three cases that never changes is simpler as a switch. Polymorphism pays off when the same branching appears in several places, or when new cases keep arriving.

The classic mistake is applying the refactoring to a switch that only appears once and never grows. The result is three classes for a three-line function. Look for the same type check repeated across the code, which is the [shotgun surgery](/t/shotgun-surgery) pattern, since that's where polymorphism removes real work. Replace one condition at a time, with tests in place.
