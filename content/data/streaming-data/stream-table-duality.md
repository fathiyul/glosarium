---
title: "Stream-Table Duality"
summary: "A table is the latest state of a stream; a stream is a table's changelog."
levels: { data-engineer: senior , data-scientist: senior }
aliases: ["stream table duality", "streams and tables", "KStream KTable", "changelog stream", "table as a stream"]
prereqs: ["stream-processing", "change-data-capture"]
related: ["change-data-capture", "event-sourcing", "kafka", "stream-joins", "stateful-stream-processing", "materialized-view"]
core: [data-engineer]
---

**Stream–table duality** is the idea that **streams and tables are two views of the same thing**:

- A **stream** is the **sequence of changes** (a changelog): every event that happened.
- A **table** is the **current state** you get by applying all those changes: the latest value per key.

You can convert in both directions:

```
stream of changes                                   table (latest value per key)
 (user 1, "Jakarta")    ─┐
 (user 2, "Bandung")     ├─ aggregate/apply ──►     user 1 → "Singapore"
 (user 1, "Singapore")  ─┘                           user 2 → "Bandung"

table updates (each insert/update/delete) ─── emit as events ──►  a stream (the table's changelog)
```

The first direction ("replay the stream into a table") is what happens when you build a materialized view, rebuild state from a log ([event sourcing](/t/event-sourcing)), or load a changelog topic into a database. The second ("turn table changes into a stream") is what [change data capture](/t/change-data-capture) does for a database table.

## Why it's a useful way to think

- **A database's log is the truth, and its tables are caches of it.** The write-ahead log is a stream, and the tables derive from it.
- **Streaming results are tables that update continuously.** A count per user per hour is a table whose rows keep being revised as events arrive.
- **Joining** a stream of events with a table of reference data (orders enriched with customer details) means looking up the current table state for each event. A **stream–stream join** matches events within a time window. A **table–table join** keeps a continuously updated joined table ([stream joins](/t/stream-joins)).
- **Compaction** keeps a topic usable as a table: a **log-compacted** topic retains the latest record per key, so it can serve as a table's changelog (a delete is a record with a null value, a tombstone).

In stream-processing libraries, you often see both abstractions: a record **stream** (every event is independent) and a **table** (updates to the same key replace earlier values), such as `KStream` and `KTable` in Kafka Streams ([Kafka](/t/kafka)).

## Practical consequences

- **Choose per dataset**: is each record a new event (clicks, payments), or an update to an entity's state (customer profile)? The first is naturally a stream, and the second a table with a changelog.
- **Rebuilding state is replaying the stream**, so retaining the log gives you recovery and new views ([Kappa architecture](/t/kappa-architecture)).
- **A materialized view is a table maintained from a stream**, and keeping it up to date incrementally is the job of stateful processing ([stateful processing](/t/stateful-stream-processing), [materialized views](/t/materialized-view)).
- **Be careful with semantics**: a table view hides history, and a stream preserves it. Don't treat a state-update stream as independent events (summing "balance" updates is wrong), or an event stream as a table (you lose the occurrences).
- **Ordering per key matters** for the table to be correct, which is why changelog events are keyed and partitioned by the primary key.

It's a conceptual unifier: batch tables, streams, logs, materialized views and CDC are all points on the same continuum.
