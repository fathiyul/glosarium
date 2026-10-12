---
title: "Columnar Storage"
summary: "Storing data by column for fast analytics."
levels: { backend: senior, data-engineer: junior , data-scientist: junior }
aliases: ["column store", "column-oriented storage", "columnar database", "columnar databases"]
prereqs: ["data-warehouse"]
related: ["row-vs-columnar-formats", "parquet", "mpp-warehouse", "compression-codecs", "oltp-vs-olap", "arrow"]
core: [data-engineer]
also: [data-storage]
---

**Columnar storage** keeps each **column's values together** on disk, instead of keeping each row together. It's the layout behind data
warehouses and analytical file formats, because analytics queries read a few columns across many rows.

```
Row store:     [id=1, country=ID, amount=10] [id=2, country=SG, amount=25] ...
Column store:  id: 1, 2, 3, ...   country: ID, SG, ID, ...   amount: 10, 25, 40, ...
```

For `SELECT SUM(amount) FROM orders WHERE country = 'ID'` a column store reads only the `amount` and `country` columns, ignoring the dozens of others.

## Benefits

- **Less I/O**: read only what the query touches.
- **Better compression**: a column holds one type of similar values (countries, timestamps), which compresses far better than mixed row data
  ([compression codecs](/t/compression-codecs)).
- **Fast scans and aggregates**: processing runs on arrays of one type, which suits modern CPUs.

## Costs

- **Single-row reads and writes are slower.** Fetching one whole record means touching every column, and inserting or updating one row means writing to many
  places. That's why transactional databases that serve applications are row-oriented ([OLTP vs OLAP](/t/oltp-vs-olap)).
- Writes are usually done in **batches**, and engines buffer and merge them.

## Where you meet it

- **Warehouses** such as BigQuery, Snowflake and Redshift, and MPP engines ([MPP warehouses](/t/mpp-warehouse)).
- **File formats** like [Parquet](/t/parquet) and ORC ([row vs columnar formats](/t/row-vs-columnar-formats)).
- **In-memory** columnar data ([Arrow](/t/arrow)).

Rule of thumb: **row stores for applications, columnar for analytics**.
