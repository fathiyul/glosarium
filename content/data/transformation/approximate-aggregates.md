---
title: "Approximate Aggregates"
summary: "Fast, nearly exact counts and percentiles on huge data."
levels: { data-engineer: senior , data-analyst: senior , data-scientist: senior }
aliases: ["approximate distinct count", "APPROX_COUNT_DISTINCT", "sketches", "approximate percentile"]
prereqs: ["hyperloglog", "group-by"]
related: ["hyperloglog", "percentile", "bloom-filter", "cardinality", "group-by", "query-cost"]
---

Approximate aggregates return a close-enough answer to a heavy question quickly. They cover distinct counts, percentiles, frequencies and top-N — the calculations that are expensive to do exactly because they'd require keeping every value.

**The classic mistake is running an exact `COUNT(DISTINCT ...)` over billions of rows.** An exact distinct count has to remember every distinct value, which means memory and time that grow with the data, so the query gets slow or fails. If a dashboard shows unique visitors, "about 9.98 million" is just as useful as the exact number, and it comes back in a fraction of the resources.

## The main families

- Distinct count: [HyperLogLog](/t/hyperloglog) estimates cardinality in a fixed, small amount of memory and, crucially, its sketches can be merged across partitions.
- Percentiles and quantiles: t-digest, KLL and similar sketches estimate a [percentile](/t/percentile) with bounded error, without sorting all values.
- Frequency and heavy hitters: count-min sketch and Space-Saving find the most common values without counting every key exactly.
- Mergeable by design. Sketches combine, which is what makes them work in a distributed engine: each task builds a partial sketch and the results merge into one estimate.

## Accuracy and behavior

Approximate functions come with an error bound rather than a promise of exactness. The error is typically small — often a percent or two for distinct counts at common sketch sizes, though it depends on the size and precision you choose — but it's real. Results can also vary slightly between runs or data orders, so treat repeated output as approximate (e.g. two runs might report 9.98 million and 9.99 million).

Naming and defaults differ by engine. Several warehouses and engines expose an approximate-distinct and an approximate-percentile function, often named with `APPROX_` prefixes, but the exact names, error guarantees and settings are vendor-specific — check the docs.

## When not to use them

Don't use an approximation where the exact number matters: billing, user-facing counts, compliance, or anything you reconcile against another system. Also remember a sketch keeps only an estimate — you can't get the underlying values back, so if you'll need the set later, store it. And don't reach for approximation before measuring: on small or medium data the exact aggregate is often fast enough, and a sketch is just one more thing to explain. For the general problem of expensive aggregates, see [query cost](/t/query-cost) and [cardinality](/t/cardinality).
