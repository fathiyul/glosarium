---
title: "Hash Index"
summary: "An index for equality lookups only."
levels: { backend: senior, data-engineer: senior }
aliases: ["hash index", "hash indexes", "hash index vs b-tree"]
prereqs: ["db-index", "b-tree"]
related: ["index-selectivity", "query-plan", "composite-index"]
---

A **hash index** maps a value's hash to its location, so an exact-equality lookup (`WHERE key = ?`) is a direct jump — no tree traversal. It uses less space than a [B-tree](/t/b-tree) and can be faster for pure equality on large values. The catch is severe: a hash index **cannot support range queries** or ordering.

```text
hash index:  WHERE email = 'a@example.com'   ✓  (equality)
             WHERE created_at > '...'         ✗  (no ordering)
             ORDER BY created_at              ✗
```

So a hash index is only useful when the column is queried *solely* by equality and never for ranges, sorting or prefix matches. Otherwise a B-tree serves the equality case *and* the rest.

The classic mistakes:

- Choosing hash when ranges matter. Any query needing `>`, `<`, `BETWEEN`, `ORDER BY`, or `LIKE 'prefix%'` needs a B-tree. Hash indexes are dead weight there.
- Assuming portability and durability. Hash index support, and whether it's WAL-logged (crash-safe), varies by database and version. Check before adopting; in some systems they've historically been less robust than B-trees.
- Expecting better performance by default. For many workloads the difference is marginal, and B-tree's flexibility wins. Hash is a narrow optimisation, not a general upgrade.
- Ignoring the hash quality. A poor hash distribution concentrates lookups; both the index and the data print out warnings about the hash function's quality.
- Confusing it with hash partitioning. An index is a lookup structure; [hash partitioning](/t/key-range-vs-hash-partitioning) distributes rows across partitions. Different mechanisms that share the word "hash".
- Forgetting that equality on a composite key still fits. If you truly only test `(a, b) = (?, ?)`, a hash index on the pair can work — but the constraint on ranges still applies.

**When to use it:** rarely, and deliberately — for a column queried only by exact equality, where the value is large and storage matters. In most schemas a B-tree is the safer, more flexible default. Reach for hash only after confirming the access pattern is pure equality and measuring a real benefit. See [index selectivity](/t/index-selectivity) and [query plans](/t/query-plan).
