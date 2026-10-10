---
title: "Sampling"
summary: "Working on a representative subset to go faster."
levels: { data-engineer: mid-level }
aliases: ["sampling data", "random sample", "TABLESAMPLE", "stratified sampling"]
prereqs: ["select-query", "data-profiling"]
related: ["data-profiling", "approximate-aggregates", "query-cost", "statistics-basics", "data-quality"]
---

Sampling means working on a representative subset of the data instead of the whole set, to go faster and spend less. You use it for exploring unfamiliar tables, developing and testing pipelines, and approximate analysis where an exact answer isn't required.

**The classic mistake is a convenient sample that isn't representative.** `ORDER BY random() LIMIT 1000` reads and sorts the entire table, so it's slow, and it can still miss rare groups. Sampling only the first rows by insertion order can skip an entire region that loaded later, and every conclusion from that sample is then wrong.

## Common methods

- Random sample. Every row equally likely. Some databases expose `TABLESAMPLE`; semantics and supported sampling fractions differ, and not every engine has it. A `WHERE random() < 0.01` filter works in some databases but still scans the table.
- Hash sample. A filter such as `MOD(HASH(user_id), 100) = 0` keeps roughly 1% of rows and is reproducible — the same keys land in the sample every run and as data grows, which makes it good for a stable development set. The hash function's name and the exact expression differ by database.
- Stratified sample. Sample within each group so rare categories are represented, instead of being swamped by common ones.
- Block or file sample. Take whole [partitions](/t/table-partitioning) or files. Cheap, but biased if the data is clustered by the sampling column.

## Using it well

- Size isn't everything. A modest random sample often estimates proportions well; rare events need targeted or stratified sampling to show up at all.
- Say it's a sample. Label sample-derived numbers, and don't ship them where exactness matters.
- Freeze a seed or key for a development sample so tests and bug reports stay reproducible.

## When not to sample

Don't sample when exact results are the point — billing, compliance, reconciliation, or any number someone will act on. And don't assume a sample query is always cheap: some sampling methods still scan the whole table, so check the [query plan](/t/query-plan) and [cost](/t/query-cost). For approximate answers on huge data, purpose-built [approximate aggregates](/t/approximate-aggregates) are often a better fit than sampling by hand. See [data profiling](/t/data-profiling) and [statistics basics](/t/statistics-basics).
