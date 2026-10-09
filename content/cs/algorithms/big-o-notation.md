---
title: "Big O Notation"
summary: "Describing how runtime or memory grows with input size."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["Big O", "O(n)", "time complexity notation", "asymptotic notation", "Big-O"]
prereqs: ["function", "loop"]
related: ["time-complexity", "space-complexity", "best-worst-average-case", "hash-table", "sorting-algorithms"]
core: [backend]
---

**Big O notation** describes how the work an algorithm does (or the memory it uses) *grows* as
the input gets bigger. It ignores exact timings and focuses on the shape of the growth.

| Big O | Name | Example |
|---|---|---|
| O(1) | constant | Look up a key in a [hash table](/t/hash-table), get `items[0]` |
| O(log n) | logarithmic | Binary search in a sorted list |
| O(n) | linear | Loop through a list once |
| O(n log n) | linearithmic | Good sorting algorithms |
| O(n²) | quadratic | A loop inside a loop over the same data |
| O(2ⁿ) | exponential | Trying every subset |

*n* is the size of the input. If you double n, an O(n) task takes about twice as long, O(n²)
about four times, and O(1) the same.

```python
def has_duplicates_slow(items):          # O(n²): compare every pair
    for i in range(len(items)):
        for j in range(i + 1, len(items)):
            if items[i] == items[j]:
                return True
    return False

def has_duplicates_fast(items):          # O(n): one pass with a set
    return len(set(items)) != len(items)
```

With 1,000 items the slow one does around 500,000 comparisons, and the fast one about 1,000.
With a million items, the slow one is unusable.

## Rules for reading it

- **Drop constants and smaller terms.** `3n + 10` is O(n); `n² + n` is O(n²).
- **It describes growth, not speed.** An O(n²) algorithm can beat an O(n) one on tiny inputs.
- Usually it means the **worst case** unless stated (see
  [best, worst, average case](/t/best-worst-average-case)).
- The same notation applies to memory ([space complexity](/t/space-complexity)).

## In practice

You rarely compute it formally. You notice nested loops over large data, queries run inside
loops and repeated list searches, and ask "what happens at 10 times the data?" Measure before
optimizing. Most code isn't the bottleneck.
