---
title: "Landing Zone / Raw Layer"
summary: "Where ingested data is stored untouched before any transformation."
levels: { data-engineer: junior , data-scientist: junior }
aliases: ["raw layer", "landing area", "raw zone", "bronze layer", "staging area", "raw data layer"]
prereqs: ["data-ingestion"]
related: ["medallion-architecture", "file-ingestion", "deduplication", "schema-drift", "data-retention-tiers", "hive-partitioning"]
core: [data-engineer]
---

The **landing zone** (or **raw layer**) is where ingested data is stored **exactly as it arrived**, before any cleaning or
transformation. It's the first stop in your data platform.

```
s3://lake/raw/orders/ingest_date=2024-06-01/part-0001.json     ← untouched copy of what the source sent
s3://lake/raw/orders/ingest_date=2024-06-02/part-0001.json
```

## Why keep it raw

- **You can reprocess.** When you find a bug in your transformation logic, or the business definition changes, you rerun
  from the original instead of hoping the source still has the old data. Many sources (APIs, event streams, systems that overwrite records)
  can't give you yesterday's version again.
- **It's evidence.** When someone asks "what did the vendor actually send us on the 3rd?", you can answer.
- **It decouples ingestion from transformation.** Ingestion can be simple and reliable, and transformations can be changed and
  rerun freely.

## Rules of the zone

- **Append-only and immutable.** Never edit or delete data in place. New loads create new files or partitions.
- **Don't clean it.** Keep the original types, quirks and mistakes. Cleaning happens in the next layer
  ([medallion architecture](/t/medallion-architecture) calls this layer "bronze").
- **Add metadata** about the load, without altering the payload: ingestion timestamp, source name, file name or batch ID.
- **Organize it by source and ingestion date** ([Hive-style partitions](/t/hive-partitioning)), so you can find and replay a particular
  load.
- **Keep it in a durable, cheap store** (object storage) and apply retention policies
  ([retention tiers](/t/data-retention-tiers)).
- **Lock down access.** Raw data often contains sensitive and unmasked personal information that downstream layers remove or tokenize.
  Fewer people and processes should be allowed to read it.
- **Expect duplicates and schema changes** here. Handle them in later steps
  ([deduplication](/t/deduplication), [schema drift](/t/schema-drift)).

## Things to watch

- Raw data can grow quickly, so decide what you really need to keep and for how long.
- Keep it easy to read from: partition well and avoid millions of tiny files.
- Some teams parse minimally into a table with typed metadata and a raw payload column (for example JSON stored as text), which keeps
  the original while being queryable.

If you only remember one thing: **never transform data on the way in without saving what came in**.
