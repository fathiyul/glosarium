---
title: "OLTP vs OLAP"
summary: "Transaction processing vs analytical queries."
levels: { backend: mid-level, data-engineer: junior }
aliases: ["OLTP", "OLAP", "transactional vs analytical", "online transaction processing", "online analytical processing"]
prereqs: ["relational-database"]
related: ["data-warehouse", "columnar-storage", "star-schema", "normalization", "transaction", "query-cost"]
core: [data-engineer]
also: [de-foundations]
---

Databases are used for two very different jobs.

- **OLTP** (online transaction processing): running the application. Many small, fast reads and writes: place an order, update a profile, check a balance.
- **OLAP** (online analytical processing): analyzing the business. Few, large queries that scan and aggregate lots of data: revenue by month, top
  products, cohort retention.

| | OLTP | OLAP |
|---|---|---|
| Purpose | Run the app | Understand the business |
| Typical query | `SELECT * FROM orders WHERE id = 917` | `SELECT region, SUM(amount) ... GROUP BY region` over millions of rows |
| Rows touched per query | A handful | Millions or billions |
| Writes | Constant small inserts and updates | Periodic bulk loads |
| Data | Current state | History |
| Schema | Normalized ([normalization](/t/normalization)) | Denormalized, such as a [star schema](/t/star-schema) |
| Storage | Row-oriented | Column-oriented ([columnar storage](/t/columnar-storage)) |
| Priorities | Low latency, many concurrent users, [transactions](/t/transaction) | Throughput on large scans |
| Examples | PostgreSQL or MySQL behind your app | A [data warehouse](/t/data-warehouse) |

## Why the separation matters

Run a heavy report on the production OLTP database, and it competes with customers for CPU, memory and locks, and checkout slows down. So analytical
work moves to a separate system, fed by pipelines ([ETL](/t/etl)).

```
app (OLTP) ──► pipelines ──► warehouse (OLAP) ──► reports
```

## Notes

- The terms describe **workloads**, and some engines handle both reasonably (often called hybrid systems), but the trade-offs remain.
- Small analytical queries on a **read replica** are sometimes enough before you need a warehouse.
- Interviewers love this question. The core of the answer: "different access patterns need different storage layouts and schemas".
