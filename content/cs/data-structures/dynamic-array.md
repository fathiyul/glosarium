---
title: "Dynamic Array"
summary: "An array that grows by reallocating, with amortized O(1) appends."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["resizable array", "ArrayList", "vector", "growable array"]
prereqs: ["array"]
related: ["array", "list", "big-o-notation", "amortized-analysis", "linked-list"]
---

A dynamic array is an array that grows automatically as you add elements. It's the structure behind Python's `list`, JavaScript's arrays, Java's `ArrayList`, C++'s `vector` and Rust's `Vec`.

A plain array has a fixed size, chosen up front. A dynamic array keeps a bigger block of memory than it currently needs, and when it fills up, it allocates a larger block (commonly about double), copies everything over and carries on.

```
capacity 4:  [a][b][c][d]          full
append e  →  allocate capacity 8, copy, add:  [a][b][c][d][e][ ][ ][ ]
```

## Costs

| Operation | Cost |
|---|---|
| Read or write by index | constant time |
| Append at the end | **amortized** constant time |
| Insert or remove in the middle or front | linear: later elements shift |
| Search by value | linear |

"Amortized" means that most appends are instant, and an occasional one is expensive because of the copy, but spread across many appends the average is constant ([amortized analysis](/t/amortized-analysis)).

```python
items = []
for i in range(1_000_000):
    items.append(i)          # fast on average
```

## Why it's the default

Elements sit next to each other in memory, which is friendly to CPU caches, and indexing is trivial. For most uses, it beats a [linked list](/t/linked-list), even for things that look like linked-list jobs.

## Things to know

- **Occasional slow append**: copying can cause a pause with a huge array. If you know the size, reserve space (`reserve` in C++, `ArrayList(capacity)` in Java).
- **Removing from the front is slow**: use a deque if you need it ([queue](/t/queue)).
- **Memory**: spare capacity wastes some space.
- **References can go stale** in languages where growing moves the data.
- A fixed-size array is faster and simpler if the size never changes.

See [arrays](/t/array) and [lists](/t/list).
