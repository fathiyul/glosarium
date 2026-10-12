---
title: "Liskov Substitution Principle (L)"
summary: "Subtypes must work anywhere their parent type is expected."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["LSP", "Liskov substitution"]
prereqs: ["inheritance", "solid"]
related: ["solid", "inheritance", "interface-segregation-principle", "open-closed-principle", "abstract-class"]
---

The Liskov substitution principle, the **L** in [SOLID](/t/solid), says that a subtype must be usable anywhere its parent type is expected, without the caller noticing a difference in behaviour. Barbara Liskov introduced the idea in a 1987 keynote, and it's about keeping the promises a parent makes.

The classic example is a rectangle and a square. A square looks like a rectangle with equal sides, so it's tempting to make it a subclass. But a rectangle lets you change its width and height separately, and a square can't:

```python
class Rectangle:
    def __init__(self, w, h): self.w, self.h = w, h
    def set_width(self, w): self.w = w
    def area(self): return self.w * self.h

class Square(Rectangle):
    def set_width(self, w): self.w = self.h = w   # changes the height too

def stretch(r):
    r.set_width(5)
    return r.area()

stretch(Rectangle(2, 3))   # 15
stretch(Square(2, 2))      # 25: the caller's expectation was broken
```

`stretch` works for a rectangle and gives the wrong result for a square, because `Square` broke a promise `Rectangle` makes: changing the width leaves the height alone.

The trade-off is that the principle is about behaviour, not just method names. A subclass can have the right methods and still break callers if it changes what they return, what it accepts, or what side effects it has. Checking that is harder than checking signatures, and it often needs tests written against the parent's contract.

The classic mistake is using inheritance for code reuse or for a name that sounds related, and then overriding methods to throw or do nothing. Those overrides are a sign the subclass doesn't belong. Prefer [interfaces](/t/interface) that describe what callers need, as in [interface segregation](/t/interface-segregation-principle), or composition, and keep [abstract classes](/t/abstract-class) small enough that every subtype can honour them.
