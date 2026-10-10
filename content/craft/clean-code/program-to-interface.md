---
title: "Program to an Interface"
summary: "Depending on what something does rather than which class it is."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["program to an interface, not an implementation"]
prereqs: ["interface"]
related: ["interface", "dependency-inversion-principle", "duck-typing", "interface-segregation-principle"]
---

Program to an interface means that code should depend on what an object can do, described by an interface or an abstract type, rather than on which concrete class it happens to be. The phrase comes from the Gang of Four's design patterns book, and it's the everyday form of the [dependency inversion principle](/t/dependency-inversion-principle).

```python
from typing import Protocol

class Cache(Protocol):
    def get(self, key: str): ...
    def set(self, key: str, value) -> None: ...

class ProductService:
    def __init__(self, cache: Cache):   # depends on the operations, not the class
        self.cache = cache
```

`ProductService` can use an in-memory cache, a Redis cache or a test fake, as long as each provides `get` and `set`. The caller decides which one to pass in.

The trade-off is indirection. A reader has to find the implementation to know what runs, and an interface with one implementation adds a file without adding flexibility. Languages with [duck typing](/t/duck-typing) can often skip the interface entirely, relying on the shape of the object.

The classic mistake is declaring an interface for every class by reflex, so the code is full of one-implementation abstractions that nobody needed. Program to an interface where there are real alternatives, such as storage backends, external services or test doubles. Keep interfaces [small](/t/interface-segregation-principle), so each caller depends only on what it uses.
