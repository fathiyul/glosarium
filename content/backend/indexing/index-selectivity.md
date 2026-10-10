---
title: "Index Selectivity"
summary: "How well an index narrows down rows."
levels: { backend: senior, data-engineer: senior }
aliases: ["index selectivity", "selectivity", "cardinality of a column"]
prereqs: ["db-index", "query-plan"]
related: ["seq-scan-vs-index-scan", "cardinality", "table-statistics"]
---

**Index selectivity** is how much a condition narrows the rows: a *highly selective* condition matches a small fraction; a *poorly selective* one matches most of the table. It's the main factor deciding whether an index actually speeds up a query.

```text
WHERE id = 42             (1 of 10M rows)   → highly selective, index wins
WHERE is_active = true     (9.9M of 10M)    → poorly selective, scan wins
```

The intuition: an index helps when it lets you *skip* most rows. If you're returning 90% anyway, reading the index and then nearly every row is more work than a straight [sequential scan](/t/seq-scan-vs-index-scan). The planner uses column [statistics](/t/table-statistics) to estimate this and choose.

The classic mistakes:

- Indexing a low-cardinality column. An index on a column with few distinct values (a boolean, a status that's mostly one value) is rarely used by the planner and just adds write cost. Index it only if some queries select a *rare* value (see [partial index](/t/partial-index)).
- Assuming the index will be used. The planner may ignore it if the condition isn't selective enough. "I added an index and it's still slow" is usually a selectivity story.
- Missing composite-order effects. In a composite index, selectivity of the *leading* column matters most for how well it prunes. Put the more selective, more-used column first.
- Confusing selectivity with cardinality. Related but distinct: cardinality is the number of distinct values; selectivity is how a *specific* predicate partitions the rows. Both feed the planner's estimate.
- Forgetting correlated columns. Individually-unselective columns can be jointly selective (e.g. `country` + `city`); a composite index can help where singles don't.
- Letting stats go stale. Estimated selectivity is only as good as the [statistics](/t/table-statistics); after big data changes, update them.

**How to use it:** index columns that are queried *selectively* — ids, emails, foreign keys, timestamps in ranges. For frequently queried rare-value filters, prefer a [partial index](/t/partial-index) so the index only covers the interesting rows. Read the plan to confirm the index is used, and remember: an index is about *skipping rows*, so no skipping, no win.
