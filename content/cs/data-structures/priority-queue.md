---
title: "Priority Queue"
summary: "A queue that always returns the highest-priority item first."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["priority queue data structure", "heapq"]
prereqs: ["heap"]
related: ["heap", "deque", "job-queue", "dijkstra"]
---

A priority queue is a collection where each item has a priority, and removing an item always returns the one with the highest priority, which is the smallest value in a min-priority queue. Items don't come out in the order they went in, so a priority queue is not a plain first-in-first-out queue.

Python's `heapq` implements one on top of a list, using the [heap](/t/heap) structure:

```python
import heapq

tasks = []
heapq.heappush(tasks, (2, "send email"))
heapq.heappush(tasks, (1, "charge card"))
heapq.heappush(tasks, (3, "update report"))

heapq.heappop(tasks)   # (1, 'charge card'): the lowest number goes first
```

Each entry is a tuple whose first item is the priority. Ties are broken by the next item in the tuple, which is why the priority should be unique or the second item should be comparable.

Pushing and popping cost O(log n), and peeking at the top costs O(1). A queue of many jobs can be processed in priority order without sorting the whole list each time.

The trade-off is that a priority queue doesn't support fast search for an arbitrary item, and changing an item's priority in place needs extra work, such as marking the old entry as stale and pushing a new one. Also, a priority that never changes can starve low-priority work if high-priority items keep arriving.

The classic mistake is assuming the queue is fair. Under constant high-priority load, low-priority items may wait indefinitely. Add aging, or a separate queue for low-priority work, when starvation matters. Priority queues are also the core of [Dijkstra's algorithm](/t/dijkstra) for shortest paths. For work handed to separate workers, see the [job queue](/t/job-queue).
