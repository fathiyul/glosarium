---
title: "Linked List"
summary: "Nodes pointing to the next node: fast inserts, slow random access."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["singly linked list", "doubly linked list"]
prereqs: ["array", "object"]
related: ["array", "dynamic-array", "queue", "stack", "doubly-linked-list"]
---

A linked list is a chain of nodes, where each node holds a value and a reference to the next node. Unlike an array, the nodes can sit anywhere in memory.

```
head ─► [3 | ●]─► [7 | ●]─► [9 | ●]─► None
```

```python
class Node:
    def __init__(self, value, next=None):
        self.value = value
        self.next = next

head = Node(3, Node(7, Node(9)))

node = head
while node:                      # walk the list
    print(node.value)
    node = node.next
```

A **doubly linked list** also keeps a reference to the previous node, so you can walk both ways ([doubly linked list](/t/doubly-linked-list)).

## Costs

| Operation | Linked list | [Array](/t/array) |
|---|---|---|
| Access the nth item | linear: walk from the head | constant |
| Insert or remove at the front | constant | linear |
| Insert or remove after a node you hold | constant | linear |
| Search by value | linear | linear |
| Memory | extra pointer per item | compact |

## When they're useful

- Building [queues](/t/queue) and [stacks](/t/stack) with cheap ends.
- Frequent insertions and removals in the middle, when you already hold the node (LRU caches combine them with a hash map, [LRU cache](/t/lru-cache-structure)).
- Teaching pointers and recursion, and as the basis for other structures.

## When they're not

In practice, [dynamic arrays](/t/dynamic-array) usually win even for jobs that look like linked-list jobs. Arrays are contiguous in memory, which the CPU cache loves, while a linked list chases pointers all over memory. You rarely write a linked list yourself, but the idea is everywhere, and a classic interview topic.

Watch out for: forgetting the empty list, losing the rest of the list when you reassign `next`, and cycles that cause infinite loops.
