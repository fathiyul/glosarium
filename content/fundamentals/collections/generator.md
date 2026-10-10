---
title: "Generator"
summary: "A function that lazily yields a sequence of values."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["generator function", "yield"]
prereqs: ["iterator"]
related: ["iterator", "lazy-evaluation", "async-await"]
---

A generator is a function that produces a sequence one value at a time, pausing at each `yield` and resuming when the next value is requested. Between values, its local state is kept, so you don't have to build the whole sequence in memory.

```python
def count_up(n):
    i = 0
    while i < n:
        yield i        # pause here and hand back i
        i += 1

g = count_up(3)
next(g)     # 0
next(g)     # 1
list(g)     # [2]  -- the remaining values
list(g)     # []   -- exhausted
```

Generators are a built-in way to write an [iterator](/t/iterator). Each call to `next` runs the function until the next `yield`. That makes them a good fit for large or endless sequences, such as lines in a big file or pages from an API, where you only need one item at a time.

The trade-offs matter. A generator is single-pass: once you've consumed it, it's empty, as the second `list(g)` shows. It has no length and no indexing, so you can't ask for the tenth item directly. It also postpones work, which can move errors to a later point than you expect.

The classic mistake is passing a generator to two consumers and assuming both see the full sequence. The first one drains it. If you need to read the data twice, collect it into a list, or call the function again to create a fresh generator. For the wider idea of deferred work, see [lazy evaluation](/t/lazy-evaluation).
