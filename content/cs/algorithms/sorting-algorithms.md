---
title: "Sorting Algorithms"
summary: "Bubble, insertion, merge, quick and heap sort, and their trade-offs."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["bubble sort", "merge sort", "quicksort", "insertion sort"]
prereqs: ["algorithm", "big-o-notation"]
related: ["sorting-in-practice", "stable-sort", "quicksort", "merge-sort", "big-o-notation"]
---

Sorting puts items in order. Many algorithms exist, with different trade-offs, though in practice you call your language's built-in sort.

| Algorithm | Idea | Typical time | Notes |
|---|---|---|---|
| **Bubble sort** | repeatedly swap adjacent items that are out of order | O(n²) | simple, slow, mostly taught |
| **Insertion sort** | insert each item into its place among those already sorted | O(n²) | fast on small or nearly sorted data |
| **Selection sort** | repeatedly pick the smallest remaining | O(n²) | simple, few swaps |
| **[Merge sort](/t/merge-sort)** | split in half, sort each, merge | O(n log n) | stable, predictable, needs extra memory |
| **[Quicksort](/t/quicksort)** | pick a pivot, partition around it, recurse | O(n log n) average, O(n²) worst | fast in practice, in place |
| **Heap sort** | build a heap, repeatedly take the max | O(n log n) | in place, not stable |

Anything based on comparing items can't beat O(n log n) in general. Special cases (small integer keys) can use counting or radix sort in linear time.

## What the built-ins use

Python's `sorted` and Java's object sort use Timsort, a hybrid of merge and insertion sort that's fast on real data and stable. Many other languages use hybrids too (quicksort that switches to heap sort, for example). You rarely beat them.

## Properties to know

- **Stable**: equal items keep their original order, which matters when you sort by several keys in turn ([stable sort](/t/stable-sort)).
- **In place**: uses little extra memory.
- **Adaptive**: faster when the data is nearly sorted.
- **Worst case**: some algorithms have bad inputs.

## In practice

- **Call the library**, with a key or comparator ([sorting with a key](/t/sorting-in-practice)).
- **Sort in the database** (`ORDER BY`) for large data.
- **Don't re-sort in a loop**, and consider whether you need a full sort at all: for "the top 10", a heap or `heapq.nlargest` is cheaper.
- **Interviews** ask you to explain them, so understand merge sort and quicksort.
