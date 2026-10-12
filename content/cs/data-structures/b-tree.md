---
title: "B-Tree"
summary: "A wide, shallow tree optimized for disks; how database indexes work."
levels: { backend: mid-level, frontend: senior, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["B tree", "B+ tree"]
prereqs: ["binary-search-tree"]
related: ["binary-search-tree", "indexing", "storage-engine", "index-selectivity"]
also: [indexing, storage-engines]
---

A B-tree is a balanced search tree where each node holds many keys and has many children, not just two. Keeping the tree wide keeps it shallow, so finding a key takes few steps. Each node is sized to fit in one disk block, so reading a node is one disk access. That's why B-trees underlie most database indexes.

```
              [ 30 | 60 ]
             /     |      \
   [10 | 20]    [40 | 50]   [70 | 80 | 90]
```

Each node holds several keys, so a tree of millions of records can be only a few levels deep. A lookup visits one node per level, and within each node it chooses the child by comparing keys.

The trade-off is that writes must keep the tree balanced, which means splitting and merging nodes, and that costs more than a plain insert. A B-tree is built for storage that is read in blocks, so its advantage shrinks in memory, where a balanced binary tree or a hash map may serve better.

The classic mistake is assuming an index is free. Each index is another B-tree that every insert, update and delete must maintain, so too many indexes slow writes. For lookups by exact key on data in memory, a [hash table](/t/hash-table) is often simpler. The [storage engine](/t/storage-engine) chooses which structure backs an index, and the indexing topic covers how to pick columns.
