---
title: "Apache Spark"
summary: "The most widely used engine for distributed batch and streaming processing."
levels: { data-engineer: mid-level , data-analyst: senior , data-scientist: mid-level }
aliases: ["Spark", "PySpark", "Spark SQL", "Spark Structured Streaming", "Apache Spark"]
prereqs: ["dataframe", "batch-processing"]
related: ["spark-driver-executor", "shuffle", "transformations-vs-actions", "data-skew", "data-partitions-compute", "single-node-engines"]
core: [data-engineer]
---

**Apache Spark** is the most widely used engine for **distributed data processing**: it splits a big dataset into partitions, spreads the work across a cluster of machines and combines the results. It handles batch jobs, SQL, streaming and machine learning in one framework, and you can use it from Python (PySpark), Scala, Java, R and SQL.

```python
from pyspark.sql import SparkSession, functions as F

spark = SparkSession.builder.appName("daily-revenue").getOrCreate()

orders = spark.read.parquet("s3://lake/orders/")
daily = (orders
    .filter(F.col("status") == "paid")
    .groupBy("order_date")
    .agg(F.sum("total_cents").alias("revenue")))

daily.write.mode("overwrite").parquet("s3://lake/marts/daily_revenue/")
```

## How it works, in short

- A **driver** program builds a plan, and **executors** on worker machines run tasks on **partitions** of the data in parallel ([driver and executors](/t/spark-driver-executor), [partitions](/t/data-partitions-compute)).
- Operations are **lazy**: transformations build a plan, and an action triggers execution, so Spark can optimize the whole thing first ([transformations vs actions](/t/transformations-vs-actions)).
- The **DataFrame / SQL API** is the main interface ([DataFrames](/t/dataframe)), optimized by Spark's query planner.
- Steps that regroup data by key (joins, group-bys, sorts) cause a **[shuffle](/t/shuffle)**: data moves across the network, which is usually the most expensive part.
- It can spill to disk when memory is short ([spill to disk](/t/spill-to-disk)).

## Where it fits

- **Large-scale batch transformations** over data lakes ([batch processing](/t/batch-processing)).
- **Streaming** with Structured Streaming ([stream processing](/t/stream-processing)).
- **ML pipelines** on big data, and a common engine behind lakehouse platforms.

## Practical lessons

- **You may not need it.** For data that fits on one machine, a [single-node engine](/t/single-node-engines) or plain SQL in your warehouse is simpler and often faster. Distribution has overhead.
- **Performance problems usually come from shuffles, skew and small files**: a few hot keys that overload one task ([data skew](/t/data-skew)), too many or too few partitions, or reading thousands of tiny files ([small files](/t/small-files-problem)).
- **Prefer built-in functions to Python UDFs**, which are slow ([UDFs](/t/udf)).
- **Avoid `collect()` on big data**, which pulls everything to the driver and crashes it.
- **Filter and select columns early**, and use columnar formats ([Parquet](/t/parquet)).
- **Learn to read the Spark UI** (stages, tasks, shuffle sizes). It tells you where time goes.
- **Memory tuning and cluster sizing** are real work. Managed platforms handle some of it.

It's a big ecosystem. Start with DataFrames and SQL, and the rest makes more sense.
