---
title: "Quicksort"
summary: "Partitioning around a pivot; fast in practice, O(n²) in the worst case."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["quick sort"]
prereqs: ["divide-and-conquer"]
related: ["merge-sort", "stable-sort", "big-omega-theta", "divide-and-conquer"]
---

Quicksort picks a pivot value, partitions the list into items smaller than the pivot and items larger, and sorts each part recursively. On average it runs in O(n log n) time and sorts in place, which makes it fast in practice.

```python
def quicksort(items):
    if len(items) <= 1:
        return items
    pivot = items[-1]
    less = [x for x in items[:-1] if x < pivot]
    more = [x for x in items[:-1] if x >= pivot]
    return quicksort(less) + [pivot] + quicksort(more)

quicksort([3, 6, 1, 4])   # [1, 3, 4, 6]
```

This version builds new lists for clarity. An in-place version partitions within the array and avoids that extra memory.

The average case is O(n log n), because a typical pivot splits the list reasonably. The worst case is O(n²), which happens when every pivot is the smallest or largest item, as with already sorted input and a last-element pivot. Counting comparisons on that case shows it: sorting 200 items in order takes 19,900 comparisons, which is n(n−1)/2, while a shuffled list of the same size takes far fewer.

The trade-off is that quicksort is usually fast and uses little extra memory, but it isn't stable and its worst case is quadratic. Libraries often pick the pivot carefully, for example at random or as a median of a few values, to make the bad case rare.

The classic mistake is choosing a fixed pivot rule on input that arrives sorted, which is common in practice. The sort then takes quadratic time without any error. Pick a randomized or median-based pivot, or use [merge sort](/t/merge-sort) when the worst case must be bounded. For the stability difference, see [stable sort](/t/stable-sort).
