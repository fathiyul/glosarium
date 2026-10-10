---
title: "Segment Tree"
summary: "A tree for fast range queries over arrays."
levels: { backend: senior, data-engineer: senior }
aliases: ["segment tree", "range query tree", "interval tree"]
prereqs: ["binary-search-tree", "array"]
related: ["tree-traversal", "heap"]
---

A **segment tree** answers **range queries** — "what's the sum/min/max over indices 3 to 7?" — quickly, and supports updates, both in O(log n). It stores a tree where each node represents an interval of the underlying array, and the node's value is the aggregate (sum, minimum, maximum, …) over that interval. A query combines values from the O(log n) nodes whose intervals exactly cover the requested range.

```text
array: [ 1 3 2 7 5 ]
        root = sum(0..4) = 18
       /                  \
  sum(0..2)=6          sum(3..4)=12
   /     \              /      \
sum(0..1)=4 sum(2)=2  sum(3)=7 sum(4)=5
range sum(1..3) → combine nodes for [1..2] and [3..3] → 3+2+7 = 12
```

The problem it solves: computing a range aggregate naively is O(n) per query, and a prefix-sum array is O(1) for sums but can't handle updates (every update would be O(n)). A segment tree gives both queries *and* updates in O(log n), which matters when you interleave them — think a leaderboard, a time series, or any dashboard querying dynamic data.

The classic mistakes:

- Using it when updates never happen. If the data is static, a prefix-sum array gives O(1) queries with less code. Segment trees earn their keep when data *changes*.
- Over-generalising. If you only ever need a single aggregate, simpler structures (Fenwick/BIT trees) do it with less code, though they're less flexible.
- Forgetting what the merge must satisfy. Range queries assume the aggregate is associative and combinable (sum, min, max, gcd). Counting *distinct* values, for instance, needs more machinery.
- Ignoring the build cost. Building is O(n); if you rebuild per query you've gained nothing.
- Reaching for it too soon. For small arrays or rare queries, the simple loop is fine. The overhead is only worth it at scale.

A segment tree is a classic range-query structure: it trades O(n) build and O(n) memory for O(log n) queries and updates. It's the dynamic counterpart to prefix sums, and the same "aggregate over intervals in a tree" idea appears in databases and data processing. It's closely related to the [binary search tree](/t/binary-search-tree), but indexed by position rather than key.
