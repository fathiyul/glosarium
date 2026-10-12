---
title: "Transformations vs Actions"
summary: "Lazy steps that build a plan vs commands that trigger execution."
levels: { data-engineer: mid-level , data-scientist: mid-level }
aliases: ["lazy evaluation in Spark", "Spark transformations", "Spark actions", "lazy transformations", "narrow and wide transformations"]
prereqs: ["apache-spark", "dataframe"]
related: ["dataframe", "lazy-evaluation", "shuffle", "apache-spark", "udf", "data-partitions-compute"]
core: [data-engineer]
---

In Spark (and similar engines like Polars' lazy mode and Dask), operations come in two kinds:

- **Transformations** describe a computation and return a **new DataFrame**, but **don't run anything yet**: `select`, `filter`, `withColumn`, `join`, `groupBy`.
- **Actions** **trigger execution** and return a result or write output: `count`, `collect`, `show`, `take`, `write`.

```python
df = spark.read.parquet("orders/")                 # nothing is read yet (just a plan)
paid = df.filter("status = 'paid'")                # transformation: plan grows
by_day = paid.groupBy("order_date").count()        # transformation: still just a plan

by_day.show(10)                                    # ACTION: now Spark optimizes the whole plan and runs it
```

This is [lazy evaluation](/t/lazy-evaluation).

## Why it works this way

Because Spark sees the **whole chain** before executing anything, its optimizer can rearrange and simplify it: push filters down, drop columns you never use, combine steps and pick efficient join strategies. If every step ran immediately, none of that would be possible.

## Consequences you must know

**Errors show up late.** A typo in a column name in a transformation may not fail until the action runs, possibly after other expensive work.

**Each action re-runs the plan.** Calling several actions on the same DataFrame recomputes it each time, from the source:

```python
by_day.count()      # runs the whole pipeline
by_day.show()       # runs the whole pipeline AGAIN
by_day.cache()      # keep the result in memory/disk after the first action, if you'll reuse it
```

Use `cache()` or `persist()` for results you'll use repeatedly. Remember to release them when done.

**`collect()` is dangerous.** It brings all rows to the driver's memory. On big data, it crashes the job. Use `limit`, `take`, or write results to storage.

**Narrow vs wide transformations.** `filter` and `select` work partition by partition. `groupBy`, `join` and `orderBy` need a [shuffle](/t/shuffle) and are the expensive ones.

**"It ran instantly" can mean it didn't run.** A transformation that finishes in milliseconds only built a plan. Timings come from actions.

## Debugging tip

Use `df.explain()` to see the plan Spark will execute, and `df.limit(100).show()` to check intermediate results cheaply. Remember that writing a pipeline as many small steps costs nothing extra, since the optimizer fuses them.

See [DataFrames](/t/dataframe) and [Apache Spark](/t/apache-spark).
