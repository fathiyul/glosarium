---
title: "Data Ingestion"
summary: "Moving data from source systems into storage you control."
levels: { data-engineer: junior , data-scientist: junior }
aliases: ["ingestion", "data loading", "data ingest", "ingesting data"]
prereqs: ["source-systems"]
related: ["batch-vs-streaming-ingestion", "landing-zone", "full-vs-incremental-load", "schema-drift", "deduplication", "ingestion-connectors"]
core: [data-engineer]
---

**Data ingestion** is moving data from [source systems](/t/source-systems) into storage you control, so it can be processed and
analyzed. It's the second stage of the [data engineering lifecycle](/t/data-engineering-lifecycle), and usually where the first
problems appear.

## The questions that shape an ingestion design

| Question | Options |
|---|---|
| **When?** | On a schedule (batch) or continuously ([batch vs streaming](/t/batch-vs-streaming-ingestion)) |
| **Who starts it?** | You pull from the source, or the source pushes to you ([push vs pull](/t/push-vs-pull-ingestion)) |
| **How much?** | A full copy every time, or only changes ([full vs incremental](/t/full-vs-incremental-load)) |
| **From where?** | Databases (queries or [change data capture](/t/log-based-cdc)), [APIs](/t/api-ingestion), [files](/t/file-ingestion), streams |
| **Into what?** | Usually raw files or tables in a [landing zone](/t/landing-zone) |

## Principles that save pain

- **Land the raw data first and keep it unchanged**, then transform later. If your logic has a bug, you can reprocess the original
  data instead of re-pulling it (which may no longer be possible).
- **Make runs idempotent.** Rerunning a failed load must not create duplicates ([deduplication](/t/deduplication), upserts, replacing
  whole partitions).
- **Track progress** explicitly (a watermark, a file manifest), so you know what's been loaded.
- **Expect change.** Sources add columns, change types and send odd values ([schema drift](/t/schema-drift)). Detect it and decide:
  adapt, or alert and stop.
- **Handle failure and retries**: timeouts, rate limits, partial responses. Use backoff.
- **Be gentle with sources.** Don't hammer production databases or exceed API limits.
- **Record metadata**: when it was loaded, from where, how many rows, so that you can audit and debug.
- **Monitor freshness and volume.** A pipeline that "succeeds" with zero rows is a silent failure.
- **Mind sensitive data** from the moment it enters.

## Don't build everything yourself

Ready-made [connectors](/t/ingestion-connectors) exist for most popular databases and SaaS tools, and handle pagination, retries and schema
changes. Write custom ingestion for the cases they don't cover, or where you need special control.

Getting ingestion right matters disproportionately, since errors here flow into everything built on top.
