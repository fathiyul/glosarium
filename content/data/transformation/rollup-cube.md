---
title: "GROUP BY ROLLUP and CUBE"
summary: "Computing subtotals and grand totals in one query."
levels: { data-engineer: mid-level , data-analyst: mid-level , data-scientist: mid-level }
aliases: ["ROLLUP", "CUBE", "GROUPING SETS", "subtotals"]
prereqs: ["group-by", "select-query"]
related: ["group-by", "olap-cube", "pivot", "aggregate-tables", "warehouse-cost-management"]
---

`ROLLUP` and `CUBE` are `GROUP BY` extensions that compute subtotals and a grand total in the same query as the detail groups. `ROLLUP` walks a hierarchy; `CUBE` produces every combination of the listed columns.

**The classic mistake is unioning several `GROUP BY` queries** to get detail plus subtotals. That scans the table once per query, repeats the aggregation, and drifts out of sync when someone edits one branch. One grouped query with `ROLLUP` does it in a single pass.

```sql
SELECT region, product, SUM(amount) AS total
FROM sales
GROUP BY ROLLUP (region, product);
```

This returns a row per `(region, product)`, a subtotal per region (with `product` null), and a grand total (both null). `CUBE (region, product)` additionally returns a subtotal per product — every grouping combination.

## Reading the subtotal rows

The subtotal rows are marked by nulls in the grouped columns, which is ambiguous if a column has real nulls. `GROUPING(region)` returns 1 for a subtotal row and 0 for a detail row, so you can label the output:

```sql
SELECT region, product,
       CASE WHEN GROUPING(region) = 1 THEN 'All regions' ELSE region END AS region_label,
       SUM(amount) AS total
FROM sales
GROUP BY ROLLUP (region, product);
```

`GROUPING SETS` is the most explicit form: list exactly the combinations you want instead of a hierarchy or a full cube.

## Cost and portability

The result grows fast. `CUBE` over *n* columns produces up to 2^n grouping sets, so a four-column cube is sixteen aggregations in one query. If you only need a few subtotals, `GROUPING SETS` is cheaper than a full cube. Support varies by database — several major systems offer all three, some support only `ROLLUP` — so check your engine's docs.

`ROLLUP` is a good fit for report tables and [aggregate/summary tables](/t/aggregate-tables), where the same hierarchy is queried repeatedly. See [GROUP BY](/t/group-by) and [OLAP cubes](/t/olap-cube).
