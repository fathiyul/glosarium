---
title: "Open/Closed Principle (O)"
summary: "Open for extension, closed for modification."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["OCP", "open closed"]
prereqs: ["interface", "solid"]
related: ["solid", "replace-conditional-with-polymorphism", "liskov-substitution-principle", "encapsulate-what-varies"]
---

The open/closed principle, the **O** in [SOLID](/t/solid), says software entities should be open for extension but closed for modification. You should be able to add new behaviour without editing code that already works and is tested. Bertrand Meyer first described it, and the usual way to achieve it is through abstractions.

```python
from typing import Protocol

class Discount(Protocol):
    def apply(self, total: float) -> float: ...

class SeasonalDiscount:
    def apply(self, total): return total * 0.9

class LoyaltyDiscount:
    def apply(self, total): return total - 10

def final_price(total, discounts: list[Discount]):
    for d in discounts:          # closed: this loop never changes
        total = d.apply(total)
    return total
```

Adding a new discount means writing a new class. `final_price` stays the same and stays tested.

The trade-off is that the design has to predict where change will come. An abstraction for a change that never happens adds indirection without benefit. If you guess wrong about which axis varies, the closed code has to be reopened, and the abstraction becomes a barrier. Some teams find the principle most useful once a switch on a type starts growing with each new case.

The classic mistake is editing a growing `if`/`elif` chain every time a new type appears, which is exactly what the principle warns against. The fix is often a [polymorphic design](/t/replace-conditional-with-polymorphism). The reverse mistake is building plugin systems before you have two real variants. Wait until a change has actually come up once or twice, then open the code at that point. The [Liskov principle](/t/liskov-substitution-principle) matters here, because each new extension must keep the promises the abstraction makes.
