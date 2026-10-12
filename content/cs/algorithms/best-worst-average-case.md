---
title: "Best, Worst and Average Case"
summary: "Different inputs can make the same algorithm fast or slow."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["worst case", "best case", "average case"]
prereqs: ["big-o-notation"]
related: ["big-o-notation", "time-complexity", "quicksort", "hash-table", "amortized-analysis"]
---

The same algorithm can run quickly on some inputs and slowly on others. We describe it by three cases.

- **Best case**: the input that makes it fastest.
- **Worst case**: the input that makes it slowest.
- **Average case**: the typical cost over all, or random, inputs.

```python
def linear_search(items, target):
    for i, x in enumerate(items):
        if x == target:
            return i
    return -1
```

| Case | When | Steps |
|---|---|---|
| Best | the target is first | 1 |
| Worst | it's last, or missing | n |
| Average | somewhere in the middle | about n / 2, still proportional to n |

When people write O(n) for linear search, they usually mean the worst case, which is a guarantee: it will never be slower than that.

## Why the distinction matters

- **Worst case gives guarantees.** When responses must be fast every time, you care about it.
- **Average case matches typical use**, but depends on assumptions about the data.
- **Best case is rarely useful**, since it's too optimistic.

Examples:

- **Quicksort**: average O(n log n), but worst O(n²) on unlucky inputs, which is why implementations pick pivots carefully ([sorting algorithms](/t/sorting-algorithms)).
- **Hash table lookup**: average O(1), worst O(n) if many keys collide ([hash tables](/t/hash-table)).
- **Dynamic array append**: usually O(1), occasionally O(n) when it resizes, so O(1) amortized ([amortized analysis](/t/amortized-analysis)).

## In practice

Ask: *what input could be adversarial or common?* An algorithm that's fast on average but terrible on already-sorted data may hit exactly the data you have. For user-facing latency, tail behavior matters ([tail latency](/t/tail-latency)).
