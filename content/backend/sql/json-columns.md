---
title: "JSON Columns"
summary: "Storing semi-structured data inside a relational database."
levels: { backend: mid-level, data-engineer: mid-level , data-analyst: mid-level , data-scientist: mid-level }
aliases: ["json columns", "jsonb", "json in the database"]
prereqs: ["schema", "json"]
related: ["document-database", "normalization", "db-index"]
---

A **JSON column** stores a structured blob inside a single column — `{"theme":"dark","notifications":true}` — instead of modelling each field as its own column. Databases support this with JSON/JSONB types that can be queried and indexed, so you get **schema flexibility** without a schema-less store.

The case for it: data that is genuinely variable or sparse — user preferences, third-party payloads, feature-specific settings — where a column per field would mean dozens of mostly-null columns or constant migrations. The case against: data you filter, join and constrain becomes hard to query, index and validate.

```text
fixed shape:  preferences(theme, notifications, language)   ← columns
variable shape: preferences(jsonb)                          ← one column, flexible
```

The classic mistakes:

- Using JSON to avoid schema design. Dumping everything into JSON because "it's flexible" trades type safety, constraints and clear queries for convenience. Queryable, relational data belongs in columns.
- Not indexing the parts you query. JSON is queryable, but only fast if you add an index on the specific paths you filter (and the DB supports expression/GIN indexes). Otherwise every query scans and parses.
- No validation. A JSON column accepts almost anything. Without a schema check (at the app or via a check constraint), typos and wrong types accumulate invisibly.
- Storing relational data. If you're joining to values inside JSON, you've re-implemented a bad document store over a relational one. Normalise those parts.
- Ignoring update granularity. Rewriting a whole JSON document to change one field is heavier and more contention-prone than updating one column.
- Assuming portability. JSON path syntax and index support differ across databases; don't assume interchangeable behaviour.

**When to use it:** for genuinely variable, opaque or rarely-queried data — provider payloads, feature flags, per-user settings — that you can validate and mostly read as a whole. For anything you filter, sort, join or enforce, use real columns. It's the relational answer to [document databases](/t/document-database) applied to a corner of the schema, not a replacement for it — see [normalisation](/t/normalization).
