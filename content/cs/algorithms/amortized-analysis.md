---
title: "Amortized Analysis"
summary: "The average cost per operation over a sequence of operations."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["amortised analysis", "amortized complexity"]
prereqs: ["big-o-notation"]
related: ["big-o-notation", "dynamic-array", "hash-table", "big-omega-theta"]
---

Amortized analysis gives the average cost per operation over a whole sequence, even when a few individual operations are expensive. The worst single operation may be costly, but spread over many operations, the total stays low. It's a way to describe the cost of an operation that is usually cheap and occasionally very expensive.

A dynamic array is the standard example. Appending usually writes one element into free space. When the array is full, it allocates a bigger block, typically double the size, and copies everything across. Counting the copies:

```python
cap, size, copies = 1, 0, 0
for _ in range(16):
    if size == cap:          # full: grow and copy the old elements
        copies += size
        cap *= 2
    size += 1
print(copies)                # 15 copies across 16 appends
```

Fifteen copies for sixteen appends is less than one copy per append on average, so the amortized cost of an append is O(1), even though one append can cost O(n).

The trade-off is that amortized bounds are averages over a sequence, not guarantees for each call. A program that needs every single operation to be fast, such as a real-time system, cannot rely on an amortized bound, because one resize may take noticeable time.

The classic mistake is quoting an amortized cost as though it applied to any single call. The occasional expensive call is still there. If latency matters for each call, choose a structure with bounded worst-case cost or spread the work over time. For the structure in this example, see the [hash table](/t/hash-table) entry, which uses the same resizing idea.
