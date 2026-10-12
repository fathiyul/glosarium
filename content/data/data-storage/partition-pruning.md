---
title: "Partition Pruning"
summary: "The engine skipping partitions a query doesn't need."
levels: { data-engineer: mid-level , data-scientist: mid-level }
aliases: ["partition elimination", "partition skipping", "pruning partitions", "static partition pruning"]
prereqs: ["hive-partitioning"]
related: ["hive-partitioning", "predicate-pushdown", "partitioning", "small-files-problem", "query-cost", "open-table-format"]
core: [data-engineer]
---

**Partition pruning** is the query engine **skipping partitions it knows can't contain matching rows**, so it reads only the relevant slices of a partitioned table. It's the main payoff of partitioning data.

```
orders/
  order_date=2024-05-30/
  order_date=2024-05-31/
  order_date=2024-06-01/      ◄── the only folder read
  order_date=2024-06-02/
```

```sql
SELECT SUM(total) FROM orders WHERE order_date = '2024-06-01';
-- the engine reads one partition out of hundreds
```

On a table with years of daily partitions, this can turn a full scan of terabytes into reading a day's files, with big savings in time and cost ([query cost](/t/query-cost)).

## What makes pruning work

- **The filter must be on the partition column**, in a form the engine can evaluate against partition values: `=`, `IN`, ranges like `BETWEEN` or `>=`.
- **The comparison should be on the raw column.** Wrapping it in a function can stop pruning:

```sql
WHERE order_date >= '2024-06-01'                 -- prunes
WHERE DATE_FORMAT(order_date, '%Y-%m') = '2024-06'   -- may not prune, depending on the engine
```

- **Types should match**, since casts on the partition column can prevent it.
- **Joins**: filtering one table can prune another through "dynamic partition pruning" in engines that support it, where the filter values are only known at run time.

## Check that it happens

Look at the query plan (`EXPLAIN`) for the number of partitions or files scanned, or at bytes scanned in the query statistics. If a query that should read one day scans everything, the filter isn't pruning ([EXPLAIN](/t/explain-query)). A common cause is filtering on a *different* column (an event timestamp) than the partition column (a load date).

## Design considerations

- **Partition by what queries filter on**, most often a date ([Hive partitioning](/t/hive-partitioning), [partitioning](/t/partitioning)).
- **Don't over-partition**: too many tiny partitions create the [small files problem](/t/small-files-problem) and slow planning.
- **Make queries always include the partition filter.** Some warehouses can *require* it, to prevent accidental full scans.
- Within files, further skipping uses statistics ([predicate pushdown](/t/predicate-pushdown)). Pruning removes whole partitions first, then pushdown skips parts of the remaining files.
