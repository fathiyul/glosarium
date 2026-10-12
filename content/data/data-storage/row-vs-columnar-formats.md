---
title: "Row vs Columnar File Formats"
summary: "CSV and Avro store rows together; Parquet and ORC store columns together."
levels: { data-engineer: junior , data-scientist: junior }
aliases: ["row-oriented vs column-oriented", "columnar storage", "Parquet vs CSV", "Avro vs Parquet", "columnar file formats"]
prereqs: ["csv-format"]
related: ["orc", "arrow", "compression-codecs", "predicate-pushdown", "json-lines", "hive-partitioning"]
core: [data-engineer]
---

A file format either stores data **row by row** or **column by column**. That choice largely decides how fast analytics queries
run, and how much storage they use.

```
Table:   id | country | amount
         1  | ID      | 10
         2  | SG      | 25
         3  | ID      | 40

Row-oriented (CSV, JSON lines, Avro):   [1, ID, 10] [2, SG, 25] [3, ID, 40]
Column-oriented (Parquet, ORC):          ids: 1 2 3 | country: ID SG ID | amount: 10 25 40
```

## Why columnar wins for analytics

A typical analytical query touches a few columns of a wide table: `SELECT SUM(amount) WHERE country = 'ID'`.

- **Read only the needed columns.** With a columnar file, the engine skips `country`-less data and the other 40 columns you didn't ask
  for. A row format must read every row in full.
- **Compress much better.** Similar values sit together (a column of country codes), so encoding and compression are more
  effective ([compression codecs](/t/compression-codecs)).
- **Skip chunks using statistics.** Columnar files store min/max values per block, so the engine can ignore blocks that can't
  match the filter ([predicate pushdown](/t/predicate-pushdown)).
- Files carry their **schema and types**.

## Why row formats still matter

- **Writing and streaming records one at a time** is natural: appending a row is cheap. Avro is common for messages and events.
- **Reading whole records** (an application fetching one order) suits rows.
- **Human-readable and simple**: CSV and JSON lines can be opened anywhere.

| Format | Layout | Typical use |
|---|---|---|
| [CSV](/t/csv-format) | Row, text, no types | Exchange, small data |
| [JSON lines](/t/json-lines) | Row, text, flexible | Logs, event dumps |
| Avro | Row, binary, schema included | Streaming and messaging |
| Parquet | Columnar, binary, typed | The default for analytics storage |
| [ORC](/t/orc) | Columnar, binary, typed | Common in Hive-based systems |

## Rules of thumb

- **Land data in whatever form it comes**, then **convert to Parquet** (or another columnar format) for analytics.
- Write reasonably **large files** (avoid millions of tiny ones), partitioned sensibly
  ([Hive partitioning](/t/hive-partitioning)).
- Columnar files are **not good for frequent small updates**. Open table formats add that capability on top
  ([open table formats](/t/open-table-format)).
- [Apache Arrow](/t/arrow) is related, but it's a columnar format for data **in memory**, used to move data between tools without conversion.
