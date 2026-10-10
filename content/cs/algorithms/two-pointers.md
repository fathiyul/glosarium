---
title: "Two Pointers"
summary: "Walking two indexes through data to avoid nested loops."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["two pointer technique"]
prereqs: ["array"]
related: ["sliding-window", "binary-search", "quicksort", "amortized-analysis"]
---

The two-pointer technique uses two indexes that move through a sequence, often from opposite ends or both in the same direction, to find a pair or a range without checking every combination. On sorted data, it replaces a nested loop of O(n²) with a single pass of O(n).

Finding two numbers that add up to a target in a sorted list:

```python
def two_sum(a, target):
    i, j = 0, len(a) - 1
    while i < j:
        s = a[i] + a[j]
        if s == target:
            return a[i], a[j]
        if s < target:
            i += 1           # the sum is too small: move the low end up
        else:
            j -= 1           # the sum is too large: move the high end down
    return None

two_sum([1, 3, 4, 6, 8], 10)   # (4, 6)
```

The sorted order justifies each move. If the sum is too small, no pair using the current low value can reach the target, so that value can be dropped.

The trade-off is the sorting requirement. Sorting first costs O(n log n), which is more than the scan itself, so the technique pays off when the data is already sorted or is used repeatedly. On unsorted data, a hash set often gives a simpler solution.

The classic mistake is applying the technique to unsorted input, where moving a pointer has no reason to be correct. Confirm the order first, or use a set when the input isn't sorted. For a related technique that keeps a moving range, see the [sliding window](/t/sliding-window).
