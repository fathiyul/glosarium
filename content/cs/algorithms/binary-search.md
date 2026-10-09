---
title: "Binary Search"
summary: "Finding an item in sorted data by halving the range each step."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["bisection", "half-interval search"]
prereqs: ["array", "loop"]
related: ["linear-search", "big-o-notation", "sorting-in-practice", "off-by-one-error", "binary-search-tree"]
---

Binary search finds an item in sorted data by repeatedly halving the range: compare with the middle, discard the half that can't contain the target, and repeat.

```python
def binary_search(items, target):
    lo, hi = 0, len(items) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if items[mid] == target:
            return mid
        if items[mid] < target:
            lo = mid + 1          # target is in the right half
        else:
            hi = mid - 1          # target is in the left half
    return -1

binary_search([2, 5, 8, 12, 16, 23], 12)    # 3
```

Each step halves what's left, so the cost is O(log n): about 20 comparisons for a million items, 30 for a billion. [Linear search](/t/linear-search) would need up to n.

## Requirements

- **The data must be sorted**, and you need fast access by position (an array, not a linked list).
- Sorting costs time itself, so it pays off when you search many times.

## Pitfalls

- **Off-by-one errors** are the classic bug: `lo <= hi` vs `<`, `mid + 1` vs `mid` ([off-by-one errors](/t/off-by-one-error)). Test with one element, two, and a missing target.
- **Integer overflow** in `(lo + hi) / 2` for huge arrays in languages with fixed-size ints. Use `lo + (hi - lo) // 2`.
- **Duplicates**: you may need the first or last occurrence, which needs a variant.

## Use the library version

Python has `bisect`, Java has `Arrays.binarySearch`, and most languages have equivalents. The idea also appears elsewhere: [binary search trees](/t/binary-search-tree), database indexes ([database index](/t/db-index)), and finding a bug by halving the possibilities ([divide and conquer debugging](/t/binary-search-debugging), [git bisect](/t/git-bisect)).
