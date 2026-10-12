---
title: "Interface Segregation Principle (I)"
summary: "Clients shouldn't depend on methods they don't use."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["ISP", "interface segregation"]
prereqs: ["interface", "solid"]
related: ["solid", "interface", "single-responsibility-principle", "liskov-substitution-principle", "dependency-inversion-principle"]
---

The interface segregation principle, the **I** in [SOLID](/t/solid), says that clients should not be forced to depend on methods they don't use. It's better to have several small, focused interfaces than one large one that every implementation must fill in, whether or not it needs each method.

```python
from typing import Protocol

class Worker(Protocol):          # too big: a robot can't eat or sleep
    def work(self): ...
    def eat(self): ...
    def sleep(self): ...

class RobotWorker:
    def work(self): ...
    def eat(self): raise NotImplementedError   # forced to implement what it can't do
    def sleep(self): raise NotImplementedError

class Workable(Protocol):        # focused: each client asks only for what it uses
    def work(self): ...

class RobotTask:
    def work(self): ...          # satisfies Workable with no unused methods
```

The fat interface forces every implementer to provide methods that don't make sense for it, usually as stubs that raise an error. Those stubs are a sign the interface is too broad.

The trade-off is that many small interfaces add files and names to keep track of, and a class may need to implement several of them. Splitting too finely makes the design harder to follow, and the benefit disappears when every client needs every method anyway.

The classic mistake is the "fat interface" built to cover every current and future need, then implemented by classes that use only part of it. Split along the needs of each caller: if one client uses only `read`, give it a reader interface, not the whole storage contract. Keep the principle in mind alongside [liskov substitution](/t/liskov-substitution-principle), since a class forced to throw on a method it can't support is one that won't substitute cleanly.
