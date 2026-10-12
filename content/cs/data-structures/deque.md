---
title: "Deque"
summary: "A double-ended queue that adds and removes at both ends."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["double-ended queue", "double ended queue"]
prereqs: ["queue"]
related: ["doubly-linked-list", "priority-queue", "lru-cache-structure", "big-o-notation"]
---

A deque, short for double-ended queue, is a sequence that lets you add and remove items at both the front and the back. A queue removes from one end, and a stack adds and removes from the same end, so a deque covers both uses and more.

```python
from collections import deque

d = deque([1, 2, 3])
d.appendleft(0)     # [0, 1, 2, 3]
d.append(4)         # [0, 1, 2, 3, 4]
d.popleft()         # 0
d.pop()             # 4
```

In Python's `collections.deque`, adding or removing at either end takes O(1) time. Looking up an item by position in the middle takes longer, because the deque has to walk to it.

The trade-off is that a deque doesn't offer cheap access by index in the middle. If you need that, a list suits better, and it's the reason a list is a poor queue: `pop(0)` on a list shifts every remaining item, which is O(n) per call.

The classic mistake is using a list as a queue with `pop(0)`. It works for small inputs and slows down badly as the queue grows. Use a deque whenever you add and remove at the ends, such as in a breadth-first search. Sliding-window problems and [LRU caches](/t/lru-cache-structure) also rely on this behaviour.
