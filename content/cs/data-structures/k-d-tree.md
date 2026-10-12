---
title: "K-D Tree"
summary: "A tree for searching points in multi-dimensional space."
levels: { backend: senior, data-engineer: senior , data-scientist: senior }
aliases: ["k-d tree", "kd-tree", "k-dimensional tree"]
prereqs: ["binary-search-tree", "array"]
related: ["tree-traversal", "heap"]
---

A **k-d tree** is a binary tree for organizing points in *k*-dimensional space — 2D, 3D, or more. It's like a [binary search tree](/t/binary-search-tree) that, at each level, splits the data along one dimension: the first split might be on x, the next on y, the next on z, then back to x, and so on. Each node partitions the remaining points to its left and right along that axis.

```text
split on x → split on y → split on x → ...
gives a spatial partition you can search by pruning whole regions
```

The payoff is efficient spatial queries: **nearest neighbours** (which points are closest to a given point), **range searches** (everything in a rectangle or radius), and **k-nearest-neighbours** for classification or recommendation. Instead of scanning every point, the tree lets you prune entire subtrees that can't contain a closer answer.

Common uses: collision detection in games and graphics, nearest-neighbour lookup in machine learning (including building an index for vector search), and geographic proximity.

The classic mistakes:

- Expecting it to scale to high dimensions. Pruning relies on splitting space usefully; in many dimensions (say dozens+), nearly everything ends up roughly equidistant and the tree degenerates toward a linear scan. k-d trees are strong in low dimensions (2–3, maybe up to ~10), weak in high. For high-dimensional similarity, purpose-built indexes (like approximate nearest-neighbour graphs) are used instead.
- Assuming it's always balanced in practice. Building from already-sorted data, or repeatedly inserting, can unbalance it. Build from a balanced construction on a static set.
- Using it for dynamic data. Insertions can degrade balance; for frequently changing data, another structure may fit better.
- Forgetting the distance metric matters. The tree is built around a metric; changing how you measure distance changes which points prune.
- Confusing it with a general graph. It's a spatial index, not a connectivity structure.

A k-d tree is the spatial-search workhorse for low-dimensional data: fast nearest-neighbour and range queries where a plain scan would be too slow. It's a specialised, multidimensional form of the balanced-tree idea, and it teaches the general lesson that indexing depends on the shape and dimension of your data.
