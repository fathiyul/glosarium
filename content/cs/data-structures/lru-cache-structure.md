---
title: "LRU Cache"
summary: "A cache evicting the least recently used item, built from a hash map and a linked list."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["LRU", "least recently used cache"]
prereqs: ["doubly-linked-list", "hash-table"]
related: ["doubly-linked-list", "hash-table", "caching", "deque"]
also: [caching]
---

An LRU cache keeps a fixed number of items and evicts the least recently used one when it needs room. Each get or put marks the item as recently used. A hash map finds items quickly, and a doubly linked list keeps them in order from most to least recently used, so both operations take constant time on average.

Python's `OrderedDict` keeps this order for you:

```python
from collections import OrderedDict

class LRU:
    def __init__(self, capacity):
        self.capacity = capacity
        self.items = OrderedDict()

    def get(self, key):
        if key not in self.items:
            return None
        self.items.move_to_end(key)          # now the most recently used
        return self.items[key]

    def put(self, key, value):
        if key in self.items:
            self.items.move_to_end(key)
        self.items[key] = value
        if len(self.items) > self.capacity:
            self.items.popitem(last=False)   # drop the least recently used

c = LRU(2)
c.put("a", 1); c.put("b", 2)
c.get("a")
c.put("c", 3)          # "b" is evicted
```

The `OrderedDict` is a hash table with a linked list of its own, so this is the same structure built in. A hand-written version uses a dict plus a doubly linked list, as described in the [doubly linked list](/t/doubly-linked-list) concept.

The trade-off is that the structure is only as good as the access pattern. An LRU cache helps when recently used items are likely to be used again soon. For a workload that scans through many items once, it can evict everything useful, and a different policy may do better.

The classic mistake is treating an LRU cache as thread-safe, or as a substitute for correct invalidation. When the underlying data changes, cached entries must be removed or refreshed, or the cache serves stale answers. For the wider design, see [caching](/t/caching).
