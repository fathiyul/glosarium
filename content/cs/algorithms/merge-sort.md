---
title: "Merge Sort"
summary: "Split in half, sort each half, merge: a stable O(n log n) sort."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["mergesort"]
prereqs: ["divide-and-conquer"]
related: ["stable-sort", "quicksort", "divide-and-conquer", "big-omega-theta"]
---

Merge sort splits a list in half, sorts each half recursively, and merges the two sorted halves into one. It's a divide-and-conquer sort, and it always runs in O(n log n) time, whatever the input order, and it's stable.

```python
def merge_sort(items):
    if len(items) <= 1:
        return items
    mid = len(items) // 2
    left = merge_sort(items[:mid])
    right = merge_sort(items[mid:])
    out, i, j = [], 0, 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:       # <= keeps equal items in their original order
            out.append(left[i]); i += 1
        else:
            out.append(right[j]); j += 1
    return out + left[i:] + right[j:]

merge_sort([5, 2, 9, 1, 5, 6])   # [1, 2, 5, 5, 6, 9]
```

Each level of recursion does O(n) work merging, and there are about log n levels, so the total is O(n log n). Because the merge takes the left item when two are equal, equal items keep their order, which makes the sort stable.

The trade-off is extra memory. The merge needs a temporary list of about n items, so merge sort is O(n) extra space, unlike an in-place sort such as [quicksort](/t/quicksort).

The classic mistake is writing the merge with `<` instead of `<=`. The sort still returns sorted numbers, but equal records can swap places, which breaks any code that relies on stability. Check the comparison when the items are records rather than plain numbers. For the property itself, see [stable sort](/t/stable-sort).
