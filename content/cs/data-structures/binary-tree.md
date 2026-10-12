---
title: "Binary Tree"
summary: "A tree where each node has at most two children."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["binary trees", "BST", "tree with two children"]
prereqs: ["tree"]
related: ["tree", "binary-search-tree", "tree-traversal", "balanced-tree", "recursion"]
---

A binary tree is a tree where each node has at most two children, usually called left and right.

```
        8
       / \
      3   10
     / \    \
    1   6    14
```

```python
class Node:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

root = Node(8)
root.left = Node(3)
root.right = Node(10)
```

## Vocabulary

- **Root**: the top node. **Leaf**: a node with no children.
- **Parent / child**: connected nodes, one level apart.
- **Depth** of a node: steps from the root. **Height** of the tree: the longest path from the root to a leaf.

## Working with them

Most binary tree code is recursive, since a tree is a node plus two smaller trees ([recursion](/t/recursion)):

```python
def height(node):
    if node is None:            # base case
        return 0
    return 1 + max(height(node.left), height(node.right))
```

Common ways to visit every node ([tree traversal](/t/tree-traversal)):

- **In-order** (left, node, right): yields sorted order for a search tree.
- **Pre-order** (node, left, right) and **post-order** (left, right, node).
- **Level-order**: row by row, using a [queue](/t/queue).

## Why they matter

A **binary search tree** keeps values ordered (left smaller, right larger), so searching takes time proportional to the tree's height, around log n if it's balanced ([binary search trees](/t/binary-search-tree), [balanced trees](/t/balanced-tree)). A badly unbalanced one degrades to a linked list with O(n) search.

Binary trees also underlie heaps, expression trees and many database and compiler structures. Trees with more than two children (file systems, the DOM) are described in [trees](/t/tree).
