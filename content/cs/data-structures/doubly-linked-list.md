---
title: "Doubly Linked List"
summary: "A linked list with pointers in both directions."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["doubly linked list", "double linked list"]
prereqs: ["linked-list"]
related: ["linked-list", "deque", "lru-cache-structure", "big-o-notation"]
---

A doubly linked list is a list where each node points to both its next and its previous node. Removing a node you already have a reference to is cheap, because you can splice it out without searching for its predecessor. That's why doubly linked lists appear inside structures such as deques and LRU caches.

```python
class Node:
    def __init__(self, value):
        self.value = value
        self.prev = None
        self.next = None

def remove(node):
    # O(1): reconnect the neighbours around this node
    if node.prev:
        node.prev.next = node.next
    if node.next:
        node.next.prev = node.prev
    node.prev = node.next = None
```

Inserting or removing at a node you already hold takes O(1). Finding a node by value still means walking the list, which takes O(n).

The trade-off is memory and bookkeeping. Each node stores two pointers instead of one, and every insert or removal must update four links correctly. A missed link produces corruption that's hard to spot.

The classic mistake is forgetting to update both directions, so forward traversal and backward traversal disagree. Keep the link updates in one function, and write tests for the head, the tail and a middle node, since those are where the edge cases hide. For a use of this structure, see the [LRU cache](/t/lru-cache-structure).
