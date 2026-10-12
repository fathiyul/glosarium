---
title: "Encapsulate What Varies"
summary: "Isolating the parts that change from the parts that stay the same."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["encapsulate the varying part", "isolate change"]
prereqs: ["interface"]
related: ["dependency-inversion-principle", "strategy-pattern", "single-responsibility-principle", "feature-envy"]
---

Encapsulate what varies is a design guideline: find the parts of a program that are likely to change, and put them behind a boundary, so changes stay local and the stable parts don't need to know about them. It's a common thread behind many design patterns, such as strategy, where the varying behaviour is hidden behind one interface.

```python
from typing import Protocol

class ShippingRule(Protocol):
    def cost(self, order) -> int: ...

class Checkout:
    def __init__(self, shipping: ShippingRule):   # the varying part is behind a boundary
        self.shipping = shipping

    def total(self, order):
        return order.subtotal + self.shipping.cost(order)
```

Shipping rules change often: new carriers, new regions, new promotions. `Checkout` stays the same, and each rule is a separate implementation of the same boundary.

The trade-off is that a boundary has a cost. It adds types and indirection, and if you guess wrong about what varies, the boundary sits in the wrong place and has to move. A variation that never happens leaves an abstraction nobody needed.

The classic mistake is the reverse: abstracting before anything varies, so the code is full of extension points that stay unused. Wait until a change actually happens in one place and disrupts another, then put a boundary between them. This connects to [dependency inversion](/t/dependency-inversion-principle), which describes which way the dependency should point, and to the [single responsibility principle](/t/single-responsibility-principle), which keeps each part focused on one reason to change.
