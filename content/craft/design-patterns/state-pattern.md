---
title: "State"
summary: "Changing an object's behavior when its internal state changes."
levels: { backend: mid-level, frontend: mid-level }
aliases: ["state pattern", "state object"]
prereqs: ["design-pattern"]
related: ["finite-state-machine", "strategy-pattern", "observer-pattern", "polymorphism"]
---

The state pattern lets an object change its behaviour when its internal state changes. Each state is a class with the same methods, and the object delegates each call to its current state. The object itself doesn't need a large conditional on its state, because each state knows what to do.

```python
class Order:
    def __init__(self):
        self.state = PendingState()

    def pay(self):
        self.state = self.state.pay(self)

    def ship(self):
        self.state = self.state.ship(self)

class PendingState:
    def pay(self, order): return PaidState()
    def ship(self, order): raise ValueError("cannot ship an unpaid order")

class PaidState:
    def pay(self, order): raise ValueError("already paid")
    def ship(self, order): return ShippedState()

class ShippedState:
    def pay(self, order): raise ValueError("already shipped")
    def ship(self, order): raise ValueError("already shipped")

order = Order()
order.pay()
order.ship()
```

Each rule for a state sits in one class, and adding a state means adding one class.

The trade-off is size. For two or three states with simple rules, the classes are more code than a few conditions. The pattern pays off as the number of states and rules grows, and when the same checks are repeated across many methods.

The classic mistake is putting transitions in the wrong place, so states know too much about each other and the whole design becomes tangled. Keep the transition table in one place, as in a [finite state machine](/t/finite-state-machine), when the set of transitions is the main concern. The state pattern is best when each state has its own behaviour rather than just its own name.
