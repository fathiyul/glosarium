---
title: "Queue"
summary: "A first-in, first-out collection."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["FIFO", "queue data structure", "deque"]
prereqs: ["list"]
related: ["stack", "linked-list", "message-queue", "priority-queue", "ring-buffer"]
---

A queue is a collection where the first item added is the first one removed (FIFO: first in, first out). Like a line at a shop, people are served in the order they arrived.

```python
from collections import deque

q = deque()
q.append("a")            # enqueue at the back
q.append("b")
q.popleft()              # dequeue from the front → "a"
q[0]                     # peek at the front → "b"
```

```js
const q = [];
q.push("a");
q.shift();               // works, but shift on a big array is slow
```

Operations: **enqueue** (add at the back), **dequeue** (remove from the front), **peek**, and **is empty**. All should be constant time.

## Implementing it

- A [linked list](/t/linked-list) with a head and a tail.
- A [ring buffer](/t/ring-buffer) (a fixed array used in a circle), efficient and common.
- **Don't** use a plain list and remove from the front, which shifts every element (linear time). Use a deque.

## Where you meet them

- **Breadth-first search** in graphs and level-order tree traversals.
- **Task scheduling**: jobs waiting for a worker ([background jobs](/t/background-job)).
- **Message queues** between services, a distributed version of the same idea ([message queues](/t/message-queue)).
- **Buffers**: keyboard input, network packets, streaming data.
- **Rate limiting and fair processing.**

## Variants

- **Deque** (double-ended queue): add and remove at both ends.
- **[Priority queue](/t/priority-queue)**: items come out by priority, not arrival.
- **Bounded queue**: a maximum size, which forces a choice when full: block, drop or reject (backpressure).

Compare with the [stack](/t/stack), which is last-in, first-out.
