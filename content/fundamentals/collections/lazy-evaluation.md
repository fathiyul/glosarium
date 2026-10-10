---
title: "Lazy Evaluation"
summary: "Computing values only when they're actually needed."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["lazy", "deferred evaluation", "call by need"]
prereqs: ["generator"]
related: ["generator", "iterator", "memoization", "immutability"]
---

Lazy evaluation delays a computation until its result is actually used. Instead of building every value up front, the program produces each one on demand. In Python, a generator expression is lazy, while a list comprehension is eager:

```python
import itertools

squares = (x * x for x in range(10**9))   # nothing is computed yet
list(itertools.islice(squares, 5))         # [0, 1, 4, 9, 16]: only five values computed

eager = [x * x for x in range(10**9)]      # builds a billion-item list, which runs out of memory
```

Lazy pipelines save memory, and they let you work with sequences that are too big to hold, or infinite. Each stage does its work only for the items that reach the end. `islice` stops after five values, so the rest of the range is never squared.

The trade-offs are real. Work and errors move to the point of use, so a bug can surface far from where the bad value was created, and a traceback may point at code that just happened to trigger it. A lazy sequence also runs its computation again each time you traverse it, unless you cache the results. And laziness adds overhead per item, which can make small sequences slower than a plain list.

Lazy evaluation is the default in some languages, such as Haskell. Most mainstream languages make it opt-in through [generators](/t/generator), streams or views. Use it when the data is large, when you may not need all of it, or when a pipeline reads from something slow. For results you'll reuse, [memoization](/t/memoization) is often a better fit.

The classic mistake is writing a lazy pipeline and then iterating over it several times, expecting it to be fast the second time.
