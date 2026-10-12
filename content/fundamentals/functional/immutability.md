---
title: "Immutability"
summary: "Never changing data after creation, producing new values instead."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["immutable", "immutable data"]
prereqs: ["variable"]
related: ["functional-programming", "mutable-vs-immutable", "referential-transparency", "memoization"]
---

Immutable data can't be changed after it's created. Instead of modifying a value, you make a new one that has the change. The original stays as it was, which makes code easier to reason about: anything holding a reference to it can be sure it hasn't changed underneath it.

In Python, a frozen dataclass enforces this:

```python
from dataclasses import dataclass, replace

@dataclass(frozen=True)
class Point:
    x: int
    y: int

p = Point(1, 2)
p.x = 5                  # FrozenInstanceError
q = replace(p, x=5)      # a new Point(5, 2); p is unchanged
```

JavaScript's `Object.freeze` does the same, but it's shallow. The object's own properties can't change, but nested objects still can. That's a common source of surprise.

The trade-offs are copying cost and the effort of working with nested data. Updating one field in a deeply nested structure means copying each level above it, and that can be expensive for large data. Immutability also doesn't mean "nothing changes": the variable can point to a new value, and the program state still moves forward.

The classic mistake is assuming a frozen outer object makes everything inside it immutable. A tuple of lists, or a frozen dataclass holding a mutable list, can still have its contents changed. Freeze deeply, or use immutable collections if the data is shared. See [functional programming](/t/functional-programming) for how this fits the wider style.
