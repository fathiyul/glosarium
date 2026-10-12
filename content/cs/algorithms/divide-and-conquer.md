---
title: "Divide and Conquer"
summary: "Splitting a problem into smaller ones and combining the results."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["divide and conquer algorithm"]
prereqs: ["recursion"]
related: ["merge-sort", "quicksort", "dynamic-programming", "big-omega-theta"]
---

Divide and conquer solves a problem by splitting it into smaller subproblems of the same kind, solving each one, and combining the answers. The recursion stops when the pieces are small enough to solve directly. Merge sort and binary search are two well-known examples.

Binary search shows the pattern in its simplest form. Each step halves the range, so it needs at most about log₂ n comparisons:

```python
def binary_search(items, target):
    lo, hi = 0, len(items) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if items[mid] == target:
            return mid
        if items[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1

binary_search([1, 3, 5, 7, 9], 7)   # 3
```

This version uses a loop rather than recursion, but the idea is the same: discard half, then solve the smaller problem. The recurrence for merge sort, T(n) = 2T(n/2) + O(n), solves to O(n log n).

The trade-off is overhead. Splitting, recursing and combining costs time and, for recursive versions, stack space. For small inputs, a simpler method is often faster, and many library sorts switch to a simple method below a size threshold.

The classic mistake is splitting a problem into subproblems that overlap, so the same work is done repeatedly and the recursion becomes exponential. That's the situation [dynamic programming](/t/dynamic-programming) addresses by storing answers. Divide and conquer works best when the subproblems are independent.
