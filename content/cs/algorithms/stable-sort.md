---
title: "Stable Sort"
summary: "A sort that keeps equal elements in their original order."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["stable sorting", "stability"]
prereqs: ["merge-sort"]
related: ["merge-sort", "quicksort", "sorting-algorithms"]
---

A stable sort keeps items that compare as equal in the same relative order they had before sorting. If two records both have age 1, the one that came first in the input still comes first in the output. Stability matters when you sort again by another key, because the earlier order survives.

Python's built-in `sorted` is stable:

```python
rows = [("ada", 2), ("bob", 1), ("cy", 2), ("dee", 1)]
sorted(rows, key=lambda r: r[1])
# [('bob', 1), ('dee', 1), ('ada', 2), ('cy', 2)]
```

Within age 1, `bob` still comes before `dee`, and within age 2, `ada` still comes before `cy`, which is their original order.

A common use is sorting in layers: sort by a secondary key first, then by the primary key with a stable sort. The result is ordered by both, without a combined key.

The trade-off is that stability isn't free for every algorithm. [Merge sort](/t/merge-sort) is stable and O(n log n) with extra memory, and [quicksort](/t/quicksort) is usually unstable, though stable variants exist at a cost. Choosing a sort because it's fast, without checking stability, can change which equal items come first.

The classic mistake is assuming all sorts keep equal items in order, then relying on that when sorting records. Check the documentation for the sort you call, and don't depend on order that the sort doesn't promise. When you need a specific tie-break, add it to the key instead of relying on stability.
