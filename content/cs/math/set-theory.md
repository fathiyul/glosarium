---
title: "Set Theory"
summary: "Unions, intersections and differences; the basis of SQL."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["sets", "set operations"]
prereqs: ["discrete-math"]
related: ["set-theory", "discrete-math", "set-operations", "combinatorics"]
---

Set theory studies collections of distinct items and the operations on them. A set has no repeated members and no fixed order. The main operations are union (everything in either set), intersection (everything in both) and difference (everything in the first and not the second). SQL's `UNION`, `INTERSECT` and `EXCEPT` are these operations on rows.

```python
a = {"ada", "bob", "cy"}
b = {"bob", "dee"}

a | b    # {'ada', 'bob', 'cy', 'dee'}: union
a & b    # {'bob'}: intersection
a - b    # {'ada', 'cy'}: difference
```

Sets are also the basis for membership tests. Checking whether an item is in a set is fast, which is why many programs use sets to track what they've already seen.

The trade-off is that a set discards duplicates and order. When either matters, such as a list of events in time order, a set is the wrong structure, even though the operations look the same.

The classic mistake is using a set when the order or the count of duplicates matters, then losing data without an error. Check what you need from the collection before choosing. The same operations on rows are covered in [set operations](/t/set-operations), and the counting of sets in [combinatorics](/t/combinatorics).
