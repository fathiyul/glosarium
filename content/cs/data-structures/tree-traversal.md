---
title: "Tree Traversal"
summary: "Visiting tree nodes in pre-order, in-order, post-order or level order."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["tree walk", "pre-order", "in-order", "post-order", "level-order"]
prereqs: ["binary-search-tree"]
related: ["binary-search-tree", "graph", "heap", "trie"]
---

Tree traversal is visiting every node of a tree in a defined order. For a binary tree, the common orders are pre-order (node, left, right), in-order (left, node, right), post-order (left, right, node) and level-order (row by row from the top).

```python
class Node:
    def __init__(self, value, left=None, right=None):
        self.value, self.left, self.right = value, left, right

def in_order(node):
    if node is None:
        return []
    return in_order(node.left) + [node.value] + in_order(node.right)

tree = Node(4, Node(2, Node(1), Node(3)), Node(6, Node(5), Node(7)))
in_order(tree)   # [1, 2, 3, 4, 5, 6, 7]
```

In-order traversal of a binary search tree returns its keys in sorted order, which is a useful property. Pre-order is handy for copying a tree, and post-order for deleting one, since children are handled before their parent.

Every traversal visits each node once, so it runs in O(n) time, where n is the number of nodes. The recursion uses stack space proportional to the tree's height, which is O(log n) for a balanced tree and O(n) for a chain.

The trade-off is that a recursive version is short but can overflow the stack on a very deep tree. An iterative version with an explicit stack avoids that, at the cost of more code.

The classic mistake is assuming a traversal order without naming it, then reading results in the wrong order. Say which order you mean, and check the result on a tiny tree. Level-order traversal uses a queue, and the [breadth-first search](/t/graph) in graphs is the same idea.
