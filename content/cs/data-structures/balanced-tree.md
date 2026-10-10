---
title: "Balanced Tree"
summary: "Trees like AVL or red-black that stay shallow for guaranteed O(log n)."
levels: { backend: senior, frontend: senior, data-engineer: senior }
aliases: ["balanced tree", "self-balancing tree", "red-black tree"]
prereqs: ["binary-search-tree", "tree-traversal"]
related: ["b-tree", "heap"]
---

A **balanced tree** is a search tree that keeps itself shallow, so lookups stay fast no matter the insertion order. A plain [binary search tree](/t/binary-search-tree) is only fast if it's balanced; insert sorted data and it degenerates into a linked list, turning O(log n) operations into O(n). A balanced tree uses **rotations** and recolouring to keep its height logarithmic, guaranteeing O(log n) search, insert and delete in the worst case.

The classic examples:

- AVL trees — keep the heights of the two subtrees within one of each other. Tighter balance, slightly more rebalancing work.
- Red-black trees — looser balance (enforced with a colour rule), fewer rotations. Common in standard libraries because it's a good practical compromise.

```text
unbalanced BST (sorted inserts): 1 → 2 → 3 → 4 → 5   O(n) search
balanced tree:                  2
                               / \                    O(log n) search
                              1   4
                                 / \
                                3   5
```

They're one of the most reused data structures in computing: ordered maps and sets in many languages, scheduler and index structures, and the basis of database trees like [B-trees](/t/b-tree) (which generalise the idea to disk).

The classic mistakes:

- Assuming any BST is balanced. Unless it *is* a self-balancing type, sorted or adversarial input can make it linear. Know what you're using.
- Choosing it when order doesn't matter. If you only need fast lookup by key and not sorted order, a [hash table](/t-hash-table) is usually faster (O(1) average). Balanced trees win when you need ordering, range queries, or predictable worst-case bounds.
- Ignoring constants and [cache locality](/t/cache-locality). A balanced tree does pointer-chasing; a sorted [array](/t/array) with binary search can beat it in practice despite the same asymptotics.
- Hand-rolling one. Rotations and invariants are easy to get subtly wrong; use a tested implementation.
- Forgetting the worst-case guarantee. Hash tables can degrade to O(n) under collisions; balanced trees don't. That predictability is sometimes the whole reason to choose them.

Balanced trees are the ordered-map workhorse: guaranteed logarithmic operations, sorted traversal, and range queries. They're the in-memory cousin of [B-trees](/t-b-tree) on disk.
