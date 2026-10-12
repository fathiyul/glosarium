---
title: "Merkle Tree"
summary: "A tree of hashes that verifies large data efficiently."
levels: { backend: senior, data-engineer: senior , data-scientist: senior }
aliases: ["merkle tree", "hash tree", "merkle root"]
prereqs: ["hash-function", "binary-search-tree"]
related: ["hash-collision", "git", "version-control"]
---

A **Merkle tree** is a tree of hashes. Each leaf hashes a chunk of data; each internal node hashes the concatenation of its children's hashes; the single hash at the root (**Merkle root**) summarises the entire dataset. Change one byte anywhere, and the hashes up to the root change — so comparing two roots tells you instantly whether two datasets are identical.

```text
            root = H(H(a,b) + H(c,d))
           /                        \
      H(a,b)                       H(c,d)
      /    \                      /    \
   H(a)   H(b)                 H(c)   H(d)
    a       b                   c       d    ← data blocks
```

The efficiency is in *verification and sync*: to check a single block, you need only the hashes on the path to the root (its "audit path"), not the whole dataset. To find how two copies differ, you compare hashes top down and descend only into the branches that disagree — no need to transfer or scan matching parts. That's why Merkle trees power Git (objects identified by content hash), blockchains, distributed file systems, and efficient replication/sync.

The classic mistakes:

- Thinking it stores the data. It stores hashes; the data lives elsewhere. The tree lets you verify the data, not retrieve it.
- Confusing it with encryption. A Merkle tree proves *integrity* (data unchanged), not *secrecy*. Hashes aren't encryption.
- Ignoring the hash choice. The security rests on the hash being collision-resistant; a broken hash weakens the guarantees. It also assumes the root itself is trusted — an attacker who controls the root controls the verdict.
- Assuming it's only about whole-tree comparison. The real win is *partial* checks and *finding differences efficiently*, which is what makes it useful for sync.
- Over-engineering small data. For a handful of items, comparing directly is fine. Merkle trees pay off at scale and when you need verifiable partial proofs.

A Merkle tree turns "do these large datasets match, and where do they differ?" into a walk down a hash tree, touching only the parts that differ. It's a core idea behind content-addressed storage and distributed integrity — see how [Git](/t/git) identifies objects and how replication systems detect divergence.
