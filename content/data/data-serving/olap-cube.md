---
title: "OLAP Cube"
summary: "Pre-aggregated data for fast slicing by dimensions."
levels: { data-engineer: senior }
aliases: ["OLAP", "multidimensional cube", "data cube", "online analytical processing"]
prereqs: ["dimensional-modeling", "aggregate-tables"]
related: ["aggregate-tables", "dimensional-modeling", "star-schema", "materialized-view", "rollup-cube"]
---

An OLAP cube (online analytical processing cube) is a **pre-aggregated** data structure that stores measures summed across every combination of a set of dimensions, so users can slice, dice and drill down without scanning the detail table. Instead of computing "sales by region by quarter by product" on demand, the cube holds those totals ready.

The classic mistake is building one cube for everything. The number of cells grows with the product of the dimension cardinalities, so adding a dimension or a high-cardinality column (customer id, order id) makes the cube **explode in size** and load time. A cube is also only as fresh as its last build, so a nightly cube answers "as of last night". Teams that tried to cube their way out of slow queries often ended up with an enormous, stale, hard-to-maintain artifact.

## How it fits with modern tools

Traditional cubes came from a time when warehouses were slow. Today, [columnar](/t/row-vs-columnar-formats) [MPP warehouses](/t/mpp-warehouse) scan billions of rows quickly, and a well-designed [aggregate table](/t/aggregate-tables) or [materialized view](/t/materialized-view) covers many of the same use cases with less machinery. The idea behind a cube, though, is alive in SQL: `GROUP BY ROLLUP`, `CUBE` and `GROUPING SETS` compute subtotals and grand totals in one pass ([rollup and cube](/t/rollup-cube)), and [dimensional models](/t/dimensional-modeling) still organise data for slicing.

Cube implementations vary: some precompute and store all cells, some translate queries to SQL against relational tables, and some use a hybrid. Query languages such as MDX differ from SQL, so a cube is a separate skill and toolchain.

## When a cube still makes sense

- A small, stable set of dimensions with low cardinality, queried interactively by many users.
- A legacy BI platform that expects a cube and cannot query the warehouse directly.
- Very predictable, repeated queries where precomputation pays for itself.

## When it doesn't

- High-cardinality or frequently changing dimensions.
- Ad hoc questions where you cannot predict the slices.
- Data that must be current to the minute.

Before building a cube, measure whether [partition pruning](/t/partition-pruning) and a good [star schema](/t/star-schema) already answer the query fast enough; often they do, and you avoid another thing to keep in sync ([query cost](/t/query-cost)).
