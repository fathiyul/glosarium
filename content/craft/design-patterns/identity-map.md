---
title: "Identity Map"
summary: "Ensuring each database row is loaded into only one object per session."
levels: { backend: senior }
aliases: ["identity map", "identity map pattern", "session cache"]
prereqs: ["data-mapper", "orm"]
related: ["unit-of-work", "repository-pattern", "transaction", "active-record-pattern", "enterprise-application-patterns"]
---

An **identity map** is a per-session cache that guarantees each database row is represented by exactly one in-memory object. When you load a record, the map is checked first: if that row's object already exists, it's returned; otherwise it's loaded and stored. Within a session, "row 42" always maps to the same object instance.

```text
load Order #42 → not in map → SELECT, build object, store under key 42
load Order #42 → in map     → return the same object
```

Why it matters: without it, the same row can be loaded twice into two objects. Then a change to one isn't seen by the other, and saving both can overwrite data or produce duplicate updates. The identity map makes the session consistent — one row, one object — the way a database transaction gives you one consistent view.

It's usually part of a persistence framework rather than something you write. ORMs implement it under the hood, often alongside a [unit of work](/t/unit-of-work), which tracks the objects the map loaded and flushes their changes together.

The classic mistakes:

- A map that outlives the session. The identity map is scoped to a unit of work or request. If it persists across requests (an "application-wide session"), data goes stale and memory grows without bound — the classic long-session bug.
- Assuming it means caching. An identity map ensures *identity*, not freshness; the object may be older than the database. It's about consistency within a session, not performance across them.
- Two maps, two truths. If different parts of the code use separate maps for the same rows, you're back to duplicate objects. One session, one map.
- Ignoring concurrency. The map gives consistency inside the session, but another transaction can change the row. That's the job of [transactions](/t/transaction) and version checks, not the map.
- Hand-rolling it and leaking. A custom map that never evicts is a [memory leak](/t/memory-leak) with a database attached.

**When to use it:** when working with a rich [domain model](/t/domain-model-pattern) over a relational store, especially with object graphs that reference each other by ID. It's a core piece of Fowler's [enterprise application patterns](/t/enterprise-application-patterns), normally supplied by a [data mapper](/t/data-mapper) and paired with a [repository](/t/repository-pattern).
