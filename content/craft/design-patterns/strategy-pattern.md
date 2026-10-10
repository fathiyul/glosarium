---
title: "Strategy"
summary: "Swapping algorithms behind a common interface."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["strategy pattern", "policy pattern"]
prereqs: ["design-pattern"]
related: ["encapsulate-what-varies", "state-pattern", "factory-method", "program-to-interface"]
---

The strategy pattern puts an algorithm behind a common interface, so the code that uses it can swap one algorithm for another without changing. The caller holds a strategy and calls it. Which strategy is in use is chosen from outside, often by configuration or by a factory.

```python
from typing import Protocol

class ShippingStrategy(Protocol):
    def cost(self, weight_kg: float) -> float: ...

class Standard:
    def cost(self, weight_kg): return 5.0 + weight_kg * 0.5

class Express:
    def cost(self, weight_kg): return 15.0 + weight_kg * 1.2

class Checkout:
    def __init__(self, shipping: ShippingStrategy):
        self.shipping = shipping

    def shipping_fee(self, weight_kg):
        return self.shipping.cost(weight_kg)

Checkout(Express()).shipping_fee(2)   # 17.4
```

`Checkout` doesn't change when a new shipping method appears. Each rule is a separate class, and it's easy to test on its own.

The trade-off is the number of classes, and the need for a way to choose. A rule with two variants that never change is often simpler as a function or an `if`. In languages with first-class functions, a strategy can be just a function passed as an argument.

The classic mistake is building a strategy interface before there is more than one algorithm, which adds a layer for nothing. Introduce it when the second variant appears. This pattern is the usual answer to the [encapsulate what varies](/t/encapsulate-what-varies) principle, and the [state pattern](/t/state-pattern) looks similar but changes behaviour because of internal state, not because of a choice made from outside.
