---
title: "Linear Search"
summary: "Checking every element in turn."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["sequential search", "scan"]
prereqs: ["loop", "array"]
related: ["binary-search", "big-o-notation", "brute-force", "set", "hash-table"]
---

Linear search checks every element in turn until it finds the one it wants, or reaches the end.

```python
def linear_search(items, target):
    for i, item in enumerate(items):
        if item == target:
            return i
    return -1
```

Python's `in` and `list.index`, JavaScript's `includes` and `indexOf`, and a `WHERE` on an unindexed column all do linear searches.

## Cost

- **Best case**: found first, 1 step.
- **Worst case**: last or missing, n steps.
- Overall O(n): double the data, double the time ([best, worst and average case](/t/best-worst-average-case)).

## When it's the right choice

- **Small collections.** For a few dozen items, nothing is simpler or faster.
- **Unsorted data** that you search once.
- **Data you can't index** or that changes constantly.
- Searching by a **complicated condition** instead of equality.

## When to switch

If you search the same data repeatedly, scanning each time adds up:

- **Sorted data**: use [binary search](/t/binary-search), O(log n).
- **Lookups by key**: use a dictionary or [set](/t/set), roughly O(1) ([hash tables](/t/hash-table)).
- **In a database**: add an [index](/t/db-index) so it doesn't scan the table.

```python
if user_id in allowed_ids:      # list: scans each time. Make allowed_ids a set.
```

A hidden linear search inside a loop is one of the most common causes of slow code ([Big O notation](/t/big-o-notation)).
