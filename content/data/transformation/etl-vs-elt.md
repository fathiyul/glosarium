---
title: "ETL vs ELT"
summary: "Transforming before loading vs loading raw data and transforming in the warehouse."
levels: { data-engineer: junior , data-analyst: junior }
aliases: ["ETL vs ELT", "ELT vs ETL", "extract load transform", "transform before load"]
prereqs: ["etl", "data-transformation"]
related: ["etl", "landing-zone", "sql-transformation-models", "data-transformation", "batch-vs-stream"]
core: [data-engineer]
---

Both move data from sources to an analytical store. The difference is **where and when the transformation happens**.

```
ETL:  source ──► extract ──► TRANSFORM (separate server/tool) ──► load ──► warehouse
ELT:  source ──► extract ──► load (raw) ──► warehouse ──► TRANSFORM (inside, with SQL)
```

| | ETL | ELT |
|---|---|---|
| Transforms in | A processing engine outside the warehouse | The warehouse (or lakehouse) itself |
| Raw data in the warehouse | Usually not | Yes, in a raw layer ([landing zone](/t/landing-zone)) |
| Reprocessing | Re-extract from the source (if still available) | Re-run SQL on stored raw data |
| Typical language | Python, Java, GUI tools | SQL ([SQL transformation models](/t/sql-transformation-models)) |
| Era | Traditional, when warehouse compute and storage were expensive | Cloud warehouses with cheap storage and elastic compute |

## Why ELT became the default

- **Storage is cheap**, so keeping raw data is affordable, and raw data gives you the ability to fix mistakes by reprocessing.
- **Warehouse compute is powerful and scalable**, so the transformation can run where the data is, rather than moving it out to
  another system.
- **SQL is a shared language** that analysts and engineers both read, so more people can maintain transformations.
- **Simpler ingestion**: load first, decide later. Connectors just copy.

## When ETL is still the right choice

- **Sensitive data** must be masked, tokenized or dropped **before** it lands in a shared store (privacy and compliance).
- **Heavy, non-SQL processing**: parsing images or text, complex custom logic, machine learning feature work.
- **Reducing volume early**: filtering or aggregating huge streams before paying to store everything.
- **Legacy systems** or constraints where the target can't transform.
- **Transformations that need to run before data is usable at all** (decoding binary formats).

## In practice

Most teams use a **hybrid**: light, necessary processing at ingestion (decrypt, parse, remove prohibited fields), raw landing, then
modeling in SQL in layers ([staging, intermediate, marts](/t/staging-intermediate-marts)).

The deciding questions: **Where is the sensitive data handled? How much will you need to reprocess? Who maintains the logic, and
in which language?** More on the pipeline side in [ETL](/t/etl) and on shaping data in
[data transformation](/t/data-transformation).
