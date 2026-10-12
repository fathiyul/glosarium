---
title: "Memoization"
summary: "Caching a function's results for inputs it has already seen."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["memo", "function caching"]
prereqs: ["function-composition"]
related: ["caching", "pure-function", "lazy-evaluation", "cache-hit-miss"]
---

Memoization stores the result of a function call, keyed by its arguments, so that repeated calls with the same inputs return the stored value instead of recomputing it. It's a form of [caching](/t/caching) applied inside a function.

Python's `functools.lru_cache` does it with one decorator:

```python
from functools import lru_cache

@lru_cache(maxsize=None)
def fib(n):
    return n if n < 2 else fib(n - 1) + fib(n - 2)

fib(50)   # 12586269025, computed in linear time instead of exponentially many calls
```

Without the cache, `fib` recomputes the same subproblems over and over. With it, each value is computed once.

The trade-offs matter. Memoization is only correct for pure functions: if the result depends on something outside the arguments, such as the current time or a database row, the cached value can be stale. The cache also grows with the number of distinct inputs, so an unbounded cache can exhaust memory. `lru_cache` requires hashable arguments, so passing a list raises a `TypeError`.

The classic mistake is memoizing a method that reads mutable state, then wondering why it returns old answers. Limit the cache size, or use a clear time limit for data that changes. Memoization helps most when the same inputs really do repeat, and when the computation is expensive. Check that with [cache hit and miss](/t/cache-hit-miss) numbers before adding it.
