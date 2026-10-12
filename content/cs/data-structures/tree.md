---
title: "Tree"
summary: "A hierarchy of nodes with one root and no cycles."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["trees", "tree data structure", "hierarchy"]
prereqs: ["data-structure", "recursion"]
related: ["binary-tree", "binary-search-tree", "graph", "tree-traversal", "trie"]
---

A tree is a hierarchy of nodes: one root at the top, each node having zero or more children, and no cycles. Every node (except the root) has exactly one parent.

```
        /
      ┌─┴──────┐
    home      etc
   ┌──┴──┐       │
  ana   bo     hosts
```

## Vocabulary

- **Root**: the top node. **Leaf**: a node with no children.
- **Parent, child, sibling**: relationships between nodes.
- **Subtree**: any node together with everything below it.
- **Depth** and **height**: the distance from the root, and the longest path down.

```python
class Node:
    def __init__(self, value):
        self.value = value
        self.children = []

def total(node):                        # trees are naturally recursive
    return node.value + sum(total(c) for c in node.children)
```

## Where trees appear

- **File systems**: folders inside folders.
- **The DOM**: elements nested in elements ([DOM](/t/dom)).
- **JSON and XML** documents.
- **Organization charts, comment threads, menus, category hierarchies.**
- **Parsers and compilers**: expressions become syntax trees.
- **Databases**: B-trees power most indexes ([database indexes](/t/db-index)).
- **Search and decision structures**: [binary search trees](/t/binary-search-tree), tries ([trie](/t/trie)), decision trees.

## Working with them

Most tree code is recursive, or uses an explicit [stack](/t/stack) or [queue](/t/queue). Common traversals: depth-first and breadth-first ([tree traversal](/t/tree-traversal)).

## Related

- A **[binary tree](/t/binary-tree)** limits nodes to two children.
- A **[graph](/t/graph)** is more general, allowing cycles and several parents. A tree is a graph with no cycles.
- **Balance matters** for search trees. A tree that degenerates into a long chain loses its speed ([balanced trees](/t/balanced-tree)).
