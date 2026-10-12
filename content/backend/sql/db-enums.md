---
title: "Enums in the Database"
summary: "Storing fixed sets of values safely."
levels: { backend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["database enums", "enum column", "enum vs lookup table"]
prereqs: ["schema", "constraint"]
related: ["relational-model", "natural-vs-surrogate-key", "foreign-key"]
---

A **database enum** restricts a column to a fixed set of values — `status IN ('pending','shipped','cancelled')`. It prevents typos and invalid states at the storage layer. There are three common ways to model this, and they trade off flexibility against safety:

- Native enum type — the database defines a named type with allowed values. Compact and fast, but adding a value is a schema change (and dropping one is often hard or impossible).
- Check constraint — a `CHECK (status IN (...))` on a normal text/string column. Simpler and more portable; changing the list means altering the constraint.
- Lookup table — a separate table of valid values with a foreign key. Most flexible (add a row to add a value, attach extra attributes like labels), but adds a join.

```text
enum type:     CREATE TYPE status AS ENUM (...)
check:         CHECK (status IN ('pending','shipped','cancelled'))
lookup table:  statuses(id, label) + FK from the main table
```

The classic mistakes:

- Choosing an enum, then needing to change it constantly. If statuses change often (and they do in evolving products), a native enum that requires a schema migration each time becomes friction. A lookup table or check constraint is easier to evolve.
- Encoding meaning in the value. Storing `"pending"` is fine; storing a numeric code that only code can interpret is worse. Use readable values, or a lookup table with a label.
- Forgetting order. Enums constrain *values*, not *order*. If statuses have a sequence (pending < shipped < delivered), that's separate logic, not the enum.
- Losing label/localisation. A lookup table can carry a display label and translated names; a raw string column can't. If the UI needs labels, the lookup table earns its keep.
- Application and database disagree. If the app has its own enum and the DB has another, they drift. Keep one source of truth (generated from the schema, or the schema from the app).

**How to choose:** a check constraint for a small, stable set you rarely change; a lookup table when the set evolves or needs attributes/labels; a native enum when the set is truly fixed and you want the database to enforce a named type. Whichever you pick, decide it deliberately — see [constraints](/t/constraint) and the [relational model](/t/relational-model).
