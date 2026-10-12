---
title: "Separation of Storage and Compute"
summary: "Scaling query engines independently from where data lives."
levels: { data-engineer: mid-level , data-scientist: mid-level }
aliases: ["separation of storage and compute", "decoupled storage and compute", "disaggregated storage", "storage-compute separation"]
prereqs: ["data-warehouse", "data-lake"]
related: ["lakehouse", "data-warehouse", "query-cost", "partition-pruning", "open-table-format", "mpp-warehouse"]
core: [data-engineer]
---

In traditional databases and early warehouses, **storage and compute lived on the same machines**: to get more query power, you bought more nodes, and you paid for storage you didn't need. **Separation of storage and compute** keeps the **data in shared, durable storage** (usually cloud object storage) and runs **queries on independent compute clusters** that you can start, stop and resize at will.

```
            ┌─────────────── shared storage (object store: Parquet / table files) ───────────────┐
            │                                                                                     │
      compute cluster A         compute cluster B             compute cluster C
      (BI dashboards)           (data science)                (nightly transformations)
```

Modern cloud warehouses and lakehouse engines work this way.

## Benefits

- **Scale independently**: add storage cheaply as data grows without paying for compute, and add compute for a heavy workload without copying data.
- **Elasticity and cost control**: pay for compute only while it runs. Pause or shrink clusters when idle.
- **Workload isolation**: the finance dashboard and the data science job use separate compute, so one can't slow the other.
- **Shared data, many engines**: several tools can read the same tables ([lakehouse](/t/lakehouse), [open table formats](/t/open-table-format)).
- **Durability**: data lives in storage designed for it, and a compute failure doesn't lose it.
- Cheap **zero-copy clones** and branches become possible, since data files are shared.

## Trade-offs

- **Network latency**: reading from remote object storage is slower than from local disks. Engines compensate with caching, columnar formats and pruning ([partition pruning](/t/partition-pruning), [predicate pushdown](/t/predicate-pushdown)).
- **Data movement costs**: transfers between regions or clouds cost money. Keep compute near storage.
- **Cold starts**: spinning up compute takes time. Warm pools or caches mitigate it.
- **Cost surprises**: easy elasticity means easy overspending. Idle clusters, runaway queries and large scans add up ([query cost](/t/query-cost)).
- Some workloads with very low latency needs still prefer tightly coupled, local-storage systems.

## Why it matters when you design

- Treat **storage as the long-lived asset** and **compute as disposable**.
- Organize data well on storage (formats, partitioning, file sizes), since every compute engine depends on it.
- Size and schedule compute per workload, and monitor spend.
- It underlies both modern warehouses and the [lakehouse](/t/lakehouse) model. Compare with the [MPP warehouse](/t/mpp-warehouse), which traditionally coupled the two.
