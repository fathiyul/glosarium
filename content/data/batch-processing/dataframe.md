---
title: "DataFrame"
summary: "A table-like data structure with named columns, as in pandas, Polars and Spark."
levels: { data-engineer: junior , data-analyst: mid-level , data-scientist: junior }
aliases: ["DataFrames", "pandas DataFrame", "Polars DataFrame", "Spark DataFrame", "df"]
prereqs: ["pandas"]
related: ["pandas", "apache-spark", "single-node-engines", "transformations-vs-actions", "notebooks", "udf"]
core: [data-engineer]
---

A **DataFrame** is a table-like data structure: **named columns**, each with a type, and rows. It's the main working object in
data processing tools: **pandas** and **Polars** (on one machine) and **Spark** (distributed) all have one.

```python
import pandas as pd

orders = pd.read_csv("orders.csv")

paid = orders[orders["status"] == "paid"]                     # filter rows
by_country = (paid.groupby("country")["amount"]               # group and aggregate
                   .sum()
                   .reset_index()
                   .sort_values("amount", ascending=False))
```

The same idea in PySpark:

```python
orders = spark.read.parquet("orders/")
(orders.filter("status = 'paid'")
       .groupBy("country").sum("amount")
       .orderBy("sum(amount)", ascending=False)
       .show())
```

## DataFrame operations map to SQL

| DataFrame | SQL |
|---|---|
| select columns | `SELECT a, b` |
| filter rows | `WHERE` |
| group and aggregate | `GROUP BY` |
| merge / join | `JOIN` |
| sort | `ORDER BY` |
| add a computed column | `SELECT ..., a * b AS c` |

If you know [SQL](/t/sql), you already know most of what a DataFrame can do. The difference is that code gives you loops, functions,
tests and libraries.

## Things to know

- **Think in columns, not rows.** Operations on whole columns (**vectorized**) are fast. Looping over rows in Python (`for row in
  df.iterrows()`) is very slow on large data. Use column operations instead.
- **Eager vs lazy.** pandas runs each step immediately. Spark and Polars' lazy mode build a plan and run it when you ask for a result,
  which lets them optimize ([transformations vs actions](/t/transformations-vs-actions)).
- **Memory.** A pandas DataFrame must fit in RAM, often with extra copies while processing. For bigger data, use a
  [single-node engine](/t/single-node-engines) that streams from disk, or a cluster.
- **Types and nulls** differ between libraries. Check how missing values and integers with nulls are represented.
- **Copy vs view surprises**: chained assignments in pandas can silently not modify what you expect. Prefer explicit `.loc[...]`
  and read the warnings.
- **Python functions per row (UDFs) are slow**, especially in Spark ([UDFs](/t/udf)).

DataFrames are everywhere in notebooks ([notebooks](/t/notebooks)) and also in production jobs. Write production
transformations in small, testable functions.
