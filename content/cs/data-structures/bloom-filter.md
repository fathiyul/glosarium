---
title: "Bloom Filter"
summary: "A compact structure answering \"definitely not\" or \"probably yes\" for set membership."
levels: { backend: senior, frontend: senior, data-engineer: senior }
aliases: ["bloom filter", "bloomfilter", "probabilistic set"]
prereqs: ["hash-function", "set-operations"]
related: ["hash-collision", "cardinality", "hyperloglog"]
---

A **Bloom filter** is a compact, probabilistic way to test set membership. It stores a bitmap and hashes each item into several positions, setting those bits. To check whether an item is in the set, you hash it the same way and look at the bits:

- If any bit is 0 → the item is **definitely not** in the set.
- If all bits are 1 → the item is **probably** in the set (it might be there because of a collision).

```text
add "cat"  → set bits 3, 9, 12
query "cat" → bits 3,9,12 all set → "probably yes"
query "dog" → bit 7 is 0          → "definitely no"
```

The asymmetry is the point: no false negatives, but possible **false positives**. In exchange, it uses a tiny fraction of the memory of storing the items themselves, and membership checks are O(1). It's ideal as a *pre-filter*: check the Bloom filter, and only do the expensive lookup (disk, network) if it says "probably yes". It's used in databases, caches, and network caches to skip work for items that aren't present.

The classic mistakes:

- Forgetting it can't say "definitely yes". A "probably yes" needs confirmation. Using a Bloom filter as if it were exact gives wrong answers.
- Expecting to get items back out. A Bloom filter stores no values, only bits. It can't enumerate the set or return elements.
- Overfilling it. As you add items, more bits become 1 and the false-positive rate climbs. Size it for the number of items you'll insert; beyond capacity it degrades toward "always probably yes".
- Ignoring that items can't be removed. Clearing bits for a deleted item would affect other items that share them. Standard Bloom filters don't support deletion (counting variants get complex).
- Using it where exactness matters. For correctness-critical membership, use a real [set](/t/set-operations). A Bloom filter trades accuracy for space deliberately.

Bloom filters are the canonical "probabilistic data structure": approximate, tiny, and fast, with a one-sided error. They sit beside [HyperLogLog](/t/hyperloglog) (which estimates counts) and explore the same theme — giving up exactness to save massive amounts of memory.
