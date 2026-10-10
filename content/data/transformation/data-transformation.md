---
title: "Data Transformation"
summary: "Cleaning, joining and reshaping raw data into useful tables."
levels: { data-engineer: junior , data-analyst: mid-level }
aliases: ["data transformations", "transforming data", "data wrangling", "T in ETL", "transformation layer"]
prereqs: ["data-cleaning", "sql"]
related: ["etl-vs-elt", "sql-transformation-models", "staging-intermediate-marts", "medallion-architecture", "grain", "incremental-models"]
core: [data-engineer]
---

**Data transformation** turns raw data into tables people can use. It's the "T" in [ETL / ELT](/t/etl-vs-elt), and where most of the
business logic of a data platform lives.

Typical steps, roughly in order:

1. **Clean**: fix types, formats, nulls and duplicates ([data cleaning](/t/data-cleaning)).
2. **Conform**: make things from different sources line up: the same IDs, units, time zones and definitions.
3. **Join** related data: orders with customers, events with sessions.
4. **Aggregate** to the needed level: daily totals, per-customer metrics.
5. **Model** into shapes built for analysis: facts and dimensions ([star schema](/t/star-schema)).

```
raw tables ─► staging (cleaned, renamed, typed) ─► intermediate (joined, business logic) ─► marts (final, for reports)
```

Many teams organize these steps in layers ([staging, intermediate and marts](/t/staging-intermediate-marts), or
[medallion](/t/medallion-architecture)) so each stage has one job and can be tested on its own.

## How it's usually written

- **SQL** inside the warehouse, as versioned models ([SQL transformation models](/t/sql-transformation-models)).
- **DataFrame code** in Python for things SQL does awkwardly ([DataFrames](/t/dataframe)).
- **Distributed engines** like Spark for very large data ([batch processing](/t/batch-processing)).

## Qualities of good transformation code

- **Deterministic**: the same input gives the same output.
- **Idempotent**: running it again doesn't duplicate or corrupt anything.
- **Defined grain**: each output table has a [documented grain](/t/grain) and a unique key.
- **Incremental when it needs to be**: process only new data on big tables ([incremental models](/t/incremental-models)).
- **Tested**: uniqueness, not-null, accepted values and row-count sanity checks.
- **Documented**: what a table contains, where it came from, and what the metrics mean.
- **In version control**, with code review, like any other software.
- **Built from raw each time, or rebuildable**: you should be able to recreate any table from its inputs.

## Common mistakes

- Putting business logic in the BI tool, where nobody can find or test it.
- Join fan-out that silently multiplies rows and inflates totals.
- Several slightly different definitions of the same metric ("revenue") in different tables.
- Transformations that depend on the current time (`NOW()`), making them impossible to rerun for a past date.

The aim is for analysts to answer questions from clean, trustworthy tables, without redoing the cleaning each time.
