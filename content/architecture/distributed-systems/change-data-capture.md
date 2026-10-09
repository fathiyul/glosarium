---
title: "Change Data Capture"
summary: "Streaming database changes out as events."
levels: { backend: senior, data-engineer: mid-level }
aliases: ["CDC", "change data capture", "database change stream", "Debezium", "log-based CDC"]
prereqs: ["database-replication", "event-streaming"]
related: ["log-based-cdc", "transactional-outbox", "kafka", "wal", "event-streaming", "data-ingestion"]
also: [integration, messaging, ingestion]
core: [data-engineer]
---

**Change data capture (CDC)** turns a database's **changes** (every insert, update and delete) into a stream of **events** that other systems can consume, in near real time.

```
orders table: INSERT id=917 ...  ──►  { "op": "c", "table": "orders", "after": { "id": 917, ... } }
              UPDATE id=917 ...  ──►  { "op": "u", "before": {...}, "after": {...} }
              DELETE id=917      ──►  { "op": "d", "before": { "id": 917, ... } }
```

The most robust approach is **log-based CDC**: it reads the database's own transaction log (the write-ahead log or binlog, [WAL](/t/wal)) that the database already writes for replication and recovery. Tools such as Debezium do this and typically publish events to a stream like Kafka ([Kafka](/t/kafka), [log-based CDC](/t/log-based-cdc)).

## Why not just query for changes?

Polling (`WHERE updated_at > :last_run`) is simpler, but:

| | Polling | Log-based CDC |
|---|---|---|
| Sees **deletes** | No | Yes |
| Sees every intermediate change | No: only the latest state at poll time | Yes: each change in commit order |
| Load on the source database | Repeated queries, indexes on `updated_at` | Reads the log, so little query load |
| Latency | The poll interval | Seconds or less |
| Needs reliable `updated_at` | Yes | No |

## What it's used for

- **Replicating data to a warehouse or lake** without hammering the source ([data ingestion](/t/data-ingestion), [full vs incremental](/t/full-vs-incremental-load)).
- **Keeping caches and search indexes in sync** (invalidate or update when a row changes).
- **Publishing events** from a database as the source of truth, such as with the [transactional outbox](/t/transactional-outbox).
- **Auditing** and building materialized views elsewhere.
- **Migrations** between databases with minimal downtime.

## Things to handle

- **An initial snapshot** (existing data) followed by the stream, without gaps or duplicates.
- **Ordering**: changes are ordered per transaction and per key. Partition by primary key to preserve order for a row.
- **At-least-once delivery**: consumers must tolerate duplicates ([idempotent consumers](/t/idempotent-consumer)).
- **Schema changes** in the source flow into events ([schema evolution](/t/schema-evolution)).
- **Large transactions, and log retention**: if the connector falls behind and the log is purged, you need a new snapshot.
- **Sensitive data** in changes: decide which columns to include.
- **Operational ownership**: the connector is one more system to monitor.

CDC exposes your **table structure** as an interface. Consumers become coupled to internal columns, so consider publishing deliberately designed events instead for service-to-service integration.
