---
title: "Specialized Indexes (GIN, GiST, BRIN)"
summary: "Index types for JSON, full-text search, geometry and huge tables."
levels: { backend: senior, data-engineer: senior }
aliases: ["specialized indexes", "GIN GiST BRIN", "index types"]
prereqs: ["db-index", "b-tree"]
related: ["inverted-index", "sql-full-text-search", "query-plan", "cardinality"]
---

Most columns are served by a [B-tree](/t/b-tree), which handles equality, ranges and ordering. But some data isn't scalar — JSON documents, arrays, full-text, geometric shapes, huge append-only time series — and databases provide specialised index types for them. In PostgreSQL the notable ones are **GIN**, **GiST** and **BRIN**.

- GIN (Generalized Inverted Index) — indexes the *elements* inside a composite value: keys in a JSON document, words in text, items in an array. This is the type behind fast "contains" and full-text queries (see [inverted index](/t/inverted-index)). Great for search; heavier to maintain.
- GiST (Generalized Search Tree) — a flexible index for non-scalar data where "near" or "overlaps" makes sense: geometry, ranges, nearest-neighbour. Powers spatial queries (see [geospatial data](/t/geospatial-data)).
- BRIN (Block Range Index) — stores a small summary per block range, so it's tiny. Ideal for large tables where a column is *naturally correlated with physical order* (e.g. an append-only `created_at`); fast range scans with minimal space. Useless when values are randomly ordered.

```text
B-tree: scalar, ordered        GIN: containment / full-text / JSON
GiST:   spatial / ranges       BRIN: huge append-only tables, ordered columns
```

The classic mistakes:

- Reaching for GIN without checking write cost. GIN indexes are powerful but slower to update; heavy write workloads pay a real price. Use them for read-heavy search.
- Using BRIN on an uncorrelated column. BRIN's summaries only prune well when the column's values cluster physically. Random ordering makes it useless (and quietly ignored).
- Assuming portability. These types and their names/behaviour vary; a GIN index exists in PostgreSQL and similar systems, not universally.
- Forgetting they still need the right query. A GIN index on JSON helps only for the operators it supports; a query using a different operator won't use it.
- Over-indexing. Each specialised index is expensive to maintain; add them for specific, proven query patterns, not speculatively.
- Ignoring the planner. Confirm with the [query plan](/t/query-plan) that the specialised index is actually chosen.

**When to use them:** when your data isn't scalar. Full-text and JSON containment → GIN; geometry and range/nearest-neighbour → GiST; multi-terabyte append-only tables with time-ordered columns → BRIN. Match the index to the data and the queries, and measure the write cost.
