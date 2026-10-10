---
title: "Heap"
summary: "A tree that keeps the min or max at the root; backs priority queues."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["binary heap", "min heap", "max heap"]
prereqs: ["binary-search-tree"]
related: ["priority-queue", "binary-search-tree", "tree-traversal", "big-o-notation"]
---

A heap is a binary tree with a simple ordering rule: in a min-heap, every parent is no larger than its children, so the smallest value is at the root. A max-heap reverses the rule. Heaps are usually stored in an array, where a node's children sit at computed positions, which keeps the tree compact.

```python
import heapq

h = []
for x in [5, 1, 4, 2]:
    heapq.heappush(h, x)       # O(log n) per push

smallest = h[0]                # 1: peeking at the root is O(1)
heapq.heappop(h)               # O(log n): removes 1 and restores the order
```

Python's `heapq` module implements a min-heap on a list. Pushing and popping take O(log n), and reading the smallest item takes O(1). Building a heap from an existing list with `heapq.heapify` takes O(n).

The trade-off is that a heap only gives the minimum or maximum quickly. Finding an arbitrary item, or listing everything in sorted order, is slower than with a sorted structure. A heap is also not a sorted list, so iterating over `h` directly doesn't return items in order.

The classic mistake is iterating over the heap's list and expecting sorted output. The list is only partially ordered; you get sorted order only by popping items one at a time. Use a heap when you need the next smallest item repeatedly, as in a [priority queue](/t/priority-queue), and a [binary search tree](/t/binary-search-tree) when you need ordered lookups.
