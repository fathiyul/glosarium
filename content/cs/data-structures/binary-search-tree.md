---
title: "Binary Search Tree"
summary: "A binary tree ordered so each lookup can halve the search."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["BST", "ordered binary tree"]
prereqs: ["tree-traversal"]
related: ["b-tree", "tree-traversal", "heap", "big-o-notation"]
---

A binary search tree (BST) is a binary tree where every node's left subtree holds smaller keys and its right subtree holds larger ones. A lookup starts at the root and goes left or right at each node, so each comparison can discard a whole subtree.

```python
class Node:
    def __init__(self, key):
        self.key, self.left, self.right = key, None, None

def insert(root, key):
    if root is None:
        return Node(key)
    if key < root.key:
        root.left = insert(root.left, key)
    else:
        root.right = insert(root.right, key)
    return root

def height(node):
    return 0 if node is None else 1 + max(height(node.left), height(node.right))

root = None
for k in range(1, 8):          # keys arrive in sorted order
    root = insert(root, k)
print(height(root))            # 7: the tree is a chain
```

Lookup, insert and delete take O(h) time, where h is the height of the tree. When the tree is balanced, h is about log n, so the operations are O(log n) on average for random insertion order. When the input is sorted, as in the example, the tree becomes a chain with height n, and the same operations take O(n) in the worst case.

The trade-off is that a plain BST gives no guarantee on height. Self-balancing variants such as AVL and red-black trees keep the height logarithmic, at the cost of extra rotations on insert and delete.

The classic mistake is building a BST from data that's already sorted or nearly sorted, then finding that every operation is linear. Shuffle the input, or use a self-balancing tree. For disk-backed indexes, the [B-tree](/t/b-tree) is the usual choice instead.
