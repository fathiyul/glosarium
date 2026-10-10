---
title: "Query Federation"
summary: "One query reading from several different systems."
levels: { data-engineer: senior }
aliases: ["federated query", "federated queries", "query virtualization", "data virtualization"]
prereqs: ["distributed-query-engine", "data-warehouse"]
related: ["distributed-query-engine", "data-lake", "lakehouse", "predicate-pushdown", "etl-vs-elt", "database-federation"]
---

Query federation runs one query across several different systems — a warehouse, a relational database, files in object storage — through a single engine, without first copying all the data into one place. The engine presents each source as a table and joins them.

**The classic mistake is putting federation on a hot path.** It is convenient for exploration and one-off joins, but it inherits the slowest, least predictable part of every source. A join that crosses systems may have to pull a large table across the network, and the remote system's latency, concurrency limits and cost all apply.

## How it works

- The engine has a connector per source. At query time it plans which filters and columns to push down to each source ([predicate pushdown](/t/predicate-pushdown)).
- Pushdown is what makes federation usable: if the source can filter and aggregate, only a small result travels. If it can't, the engine scans everything and moves it.
- The rest of the query — joins, final aggregation — runs in the engine, so cross-system joins still mean network transfer.
- [Trino/Presto-style distributed query engines](/t/distributed-query-engine) are the classic implementation; warehouses add external tables and federated query features of their own, and capabilities vary by engine and source.

## When it helps

- Joining a small reference table from an operational database to a large fact table in the warehouse, where the small side can be pushed or broadcast.
- Exploring data spread across systems before deciding where to land it.
- Dashboards that need a couple of live values without building a pipeline.

## When not to use it

If a join repeats or is performance-critical, move the data into one system and keep it there ([ETL vs ELT](/t/etl-vs-elt), [lakehouse](/t/lakehouse)). Federation adds network hops and more failure modes, and it raises governance questions: credentials and access controls now span every source. Each source keeps its own cost model too, so a federated query can be cheap in the warehouse and expensive in the database it hits.

Don't confuse it with [database federation](/t/database-federation), which means splitting one logical database into separate services. Query federation is the opposite direction: one query, many systems. See [data lake](/t/data-lake) and [data warehouse](/t/data-warehouse).
