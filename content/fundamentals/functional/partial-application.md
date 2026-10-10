---
title: "Partial Application"
summary: "Fixing some arguments of a function to get a new function."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["partial function", "functools.partial"]
prereqs: ["higher-order-function"]
related: ["currying", "function-composition", "closure"]
---

Partial application fixes some of a function's arguments now and returns a new function that takes the rest later. You give the function part of its input in advance, so you can reuse it in more places.

```python
from functools import partial

def power(base, exp):
    return base ** exp

square = partial(power, exp=2)
square(7)     # 49
square(9)     # 81
```

`square` is a new function with `exp` already set. You could pass it to `map` or to any code that expects a one-argument function, without writing a separate `lambda`.

The trade-offs are small but real. A `partial` object's signature is less obvious to readers and to some tools, so type checkers and IDEs may show less help. Positional and keyword arguments interact in ways that are easy to get wrong. A `lambda` can be clearer when the logic is more than a simple fixed argument.

The classic mistake is partially applying an argument that changes between calls, or relying on argument order when keyword arguments would be safer. A `partial` also freezes its arguments at creation time, so a value that changes later isn't picked up. Use it for stable configuration, and compare it with [currying](/t/currying), which does the same job through a chain of calls, and with [function composition](/t/function-composition) for combining steps.
