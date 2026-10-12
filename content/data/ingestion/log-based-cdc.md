---
title: "Log-Based CDC"
summary: "Capturing changes from a database's write-ahead log instead of querying tables."
levels: { data-engineer: senior , data-scientist: senior }
aliases: ["log-based change data capture", "WAL-based CDC", "binlog CDC", "logical decoding", "transaction log CDC"]
prereqs: ["change-data-capture", "wal"]
related: ["change-data-capture", "wal", "kafka", "transactional-outbox", "full-vs-incremental-load", "schema-evolution"]
core: [data-engineer]
---

**Log-based CDC** captures changes by reading the database's own **transaction log** (the write-ahead log or binary log), the sequential record of every committed change that the database already writes for recovery and replication, instead of repeatedly querying the tables. It's the most complete and least intrusive way to stream changes from a database ([change data capture](/t/change-data-capture), [WAL](/t/wal)).

```
app writes ──► database ──► transaction log (every insert/update/delete, in commit order)
                                  │
                         CDC connector reads the log
                                  ▼
                 change events: { op, before, after, source position, timestamp } ──► stream (e.g., Kafka)
```

## How it works

Each database exposes its log in some form: PostgreSQL's **logical decoding** (through a replication slot and an output plugin), MySQL's **binlog**, SQL Server and Oracle's own mechanisms, and MongoDB's oplog or change streams. A connector (Debezium is a well-known open-source one; managed services exist too) connects as a kind of replica, reads the log from a saved **position**, and emits one event per row change.

An event typically carries:

- The operation: create, update, delete (and often a snapshot read).
- The row **before** and **after** the change (depending on settings).
- The table, a transaction ID, a commit timestamp and the log position.

## Why prefer it to polling

- **Captures deletes** and every intermediate update, not just the latest state ([full vs incremental](/t/full-vs-incremental-load)).
- **Low load** on the source: it reads a log instead of running queries against tables.
- **Low latency**, often seconds.
- **No reliance on `updated_at` columns** or schema changes to the source tables.
- **Preserves commit order** and transaction boundaries.

## Operating it: things that go wrong

- **Initial snapshot.** You need the existing data, then a seamless switch to the live log, with no gaps or duplicates. Connectors handle this, but large tables take time.
- **Log retention and replication slots.** In PostgreSQL, a replication slot makes the database **keep WAL until the connector reads it**. If the connector stops or lags, the WAL grows and can **fill the disk of the production database**. Monitor slot lag and set alerts and limits.
- **Configuration prerequisites**: the database must be set up to produce logical changes (for example, PostgreSQL's `wal_level = logical`), with permissions for a replication user. These changes can require a restart and the DBA's approval.
- **Schema changes** in the source must be handled: new columns, type changes and renamed columns flow into events ([schema evolution](/t/schema-evolution), [schema drift](/t/schema-drift)).
- **Ordering and partitioning.** Keep events for one row in order, by keying on the primary key. Global order across tables isn't guaranteed downstream.
- **At-least-once delivery**: after a restart the connector may re-emit some events, so consumers must be idempotent ([idempotent consumers](/t/idempotent-consumer)).
- **Large transactions** and big updates create event bursts.
- **Failover**: positions after a database failover or a major upgrade need care. Some setups lose their place.
- **Sensitive columns**: decide what to include, mask or exclude ([data masking](/t/data-masking)).
- **Tombstones and compaction** in log-compacted topics, for representing deletes.

## Design notes

- Downstream, apply changes with merges keyed by primary key, using the log position or commit time to ignore stale events ([append vs merge](/t/append-vs-merge)).
- The events expose your **table structure**, so consumers become coupled to it. For service integration, publish deliberate domain events, perhaps through the [outbox pattern](/t/transactional-outbox).
- Treat the connector as production infrastructure: monitor lag, errors and slot size, and rehearse recovery.
