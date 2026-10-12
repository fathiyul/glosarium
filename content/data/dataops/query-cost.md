---
title: "Query Cost"
summary: "Why scanning a whole table can cost real money in a cloud warehouse."
levels: { data-engineer: junior , data-scientist: junior }
aliases: ["warehouse query cost", "cost of queries", "bytes scanned", "cloud data warehouse pricing", "compute cost"]
prereqs: ["select-query", "row-vs-columnar-formats"]
related: ["warehouse-cost-management", "partition-pruning", "hive-partitioning", "data-platform-team", "compute-storage-separation", "small-files-problem"]
core: [data-engineer]
---

In a cloud data warehouse, **every query has a price**. On a laptop database, a heavy query is just slow. In the cloud, it can also be
expensive, and one careless query on a huge table can cost real money.

How you're charged depends on the platform. The two common models:

- **Pay per data scanned**: you're billed by the amount of data the query reads.
- **Pay for compute time**: you pay for the warehouse or cluster while it's running, by size and duration, so slow or wasteful queries keep it busy and
  billing longer.

Check how your platform charges, because the best habits differ.

## What makes queries cost more

```sql
SELECT * FROM events;                                   -- reads every column of every row
SELECT * FROM events WHERE event_date = '2024-06-01';   -- reads one day's partition (if partitioned)
```

- **Scanning more data than you need**: `SELECT *` on a wide table, or no filter on the partition column.
- **Repeating expensive work**: the same heavy aggregation run by 50 dashboards every hour.
- **Joins that explode** (a missing condition, or many-to-many).
- **Sorting and shuffling huge results**.
- **Re-running a full rebuild** when an incremental load would do.

## Habits that cut cost

- **Select only the columns you need.** Columnar storage reads just those ([row vs columnar](/t/row-vs-columnar-formats)).
- **Filter on partition and clustering columns** so the engine skips data ([partition pruning](/t/partition-pruning), [Hive
  partitioning](/t/hive-partitioning)).
- **Preview before running.** Many warehouses can estimate how much a query will scan, or show a plan, before executing.
- **Don't rely on `LIMIT` to save money.** On some platforms it limits the rows returned but the full scan is still billed.
- **Develop on samples or small tables**, and run on full data once the query is right ([sampling data](/t/sampling-data)).
- **Precompute and reuse**: build aggregate tables or materialized results that many queries share
  ([aggregate tables](/t/aggregate-tables)), and use caching where it exists.
- **Process incrementally** ([incremental models](/t/incremental-models)).
- **Set budgets, quotas and alerts**, and track the most expensive queries and who runs them
  ([warehouse cost management](/t/warehouse-cost-management)).

## Mindset

Treat cost as a normal engineering dimension, like latency. A pipeline that's correct and costs five times what it should is still a problem. Look for
the biggest cost drivers first. A few queries usually account for most of the bill.
