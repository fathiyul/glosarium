---
title: "Skip List"
summary: "A layered linked list with O(log n) search."
levels: { backend: senior, data-engineer: senior , data-scientist: senior }
aliases: ["skip list", "skiplist", "probabilistic search structure"]
prereqs: ["linked-list", "binary-search-tree"]
related: ["balanced-tree", "redis"]
---

A **skip list** is a sorted [linked list](/t/linked-list) with extra **layers** that act as express lanes. The bottom layer holds every element in order; each higher layer skips over more of them. To search, you start at the top-left and move right as far as you can, then drop down a layer and repeat — so you skip large parts of the list instead of walking node by node.

```text
level 2: 1 ───────────────▶ 9
level 1: 1 ──────▶ 5 ─────▶ 9
level 0: 1 ─▶ 3 ─▶ 5 ─▶ 7 ─▶ 9     (all elements)
search 7: 1 → 9 (too far) → down → 5 → 9 → down → 7 ✓
```

Each level includes roughly half the nodes of the level below (chosen probabilistically), giving expected O(log n) search, insert and delete — comparable to a [balanced tree](/t/balanced-tree), but *simpler to implement* because it avoids rotations. That simplicity, plus good concurrency behaviour for inserts, is why it's used in real systems — Redis's sorted sets and some databases use skip lists.

The classic mistakes:

- Expecting worst-case guarantees. The O(log n) is *expected*; unlucky level choices can degrade it, though the probability is astronomically small. Balanced trees give hard worst-case bounds; skip lists trade that for simplicity.
- Assuming it's a tree. It's a layered linked list. That's the whole appeal — no rebalancing logic.
- Ignoring memory overhead. The extra layers cost pointers (roughly double, if each node appears in ~2 levels on average). Usually fine, but it's real.
- Using it when order doesn't matter. For pure key lookup, a [hash table](/t/hash-table) is faster. Skip lists give *ordered* operations: range scans, predecessor/successor, sorted iteration.
- Confusing it with a singly linked list. A plain linked list is O(n) to search; the layers are what make it fast.

A skip list is the "good-enough, easy-to-write" alternative to a balanced tree for ordered data. It's a nice illustration of probability doing the job that careful rebalancing does in trees — and it's a common real-world choice when you want logarithmic ordered operations without rotation code.
