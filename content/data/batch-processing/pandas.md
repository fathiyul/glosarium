---
title: "pandas"
summary: "Python's standard DataFrame library for data analysis."
levels: { data-engineer: junior , data-analyst: mid-level }
aliases: ["pandas library", "pandas DataFrame", "pd"]
prereqs: ["dataframe"]
related: ["dataframe", "notebooks", "apache-spark", "single-node-engines", "csv-format", "parquet", "data-cleaning"]
---

pandas is Python's standard library for working with tabular data. Its central object is the [DataFrame](/t/dataframe): a table with labelled columns, held in memory. It lets you load, filter, join, group and reshape data in a few lines.

```python
import pandas as pd

orders = pd.read_csv("orders.csv")                    # load
big = orders[orders["total"] > 100]                    # filter rows
by_country = (
    orders.groupby("country")["total"]
          .sum()
          .sort_values(ascending=False)
)
orders["created_at"] = pd.to_datetime(orders["created_at"])
merged = orders.merge(customers, on="customer_id", how="left")   # join
merged.to_parquet("orders_enriched.parquet")           # save
```

It is a common choice for exploration in a [notebook](/t/notebooks), quick data cleaning, and small to medium pipeline steps.

## The main limit: memory

pandas loads the whole table into RAM, and operations can create copies, so a file of a few gigabytes may need many times that in memory. When data outgrows one machine's memory, options are loading only the needed columns, processing in chunks, switching to a [single-node engine](/t/single-node-engines) built for larger-than-memory work, or a distributed tool like [Spark](/t/apache-spark).

## Classic mistakes

- **Looping over rows** with `for` or `.apply` where a vectorized column operation would be much faster.
- **Chained assignment confusion.** Changing a slice may or may not change the original DataFrame; use `.loc[...]` and `.copy()` deliberately. Behavior has been changing between versions, so check the docs for yours.
- **Silent type problems.** A column of numbers with one bad value becomes text. Check `df.dtypes`.
- **Missing values.** Missing numbers show up as `NaN`, and comparisons with them behave unexpectedly. See [null](/t/null).
- Using it as a database. For joins and aggregations over large tables, push the work to SQL in the warehouse.
