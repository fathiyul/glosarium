---
title: "SQL Data Types"
summary: "Choosing integer, numeric, text, timestamp and other column types."
levels: { backend: junior, data-engineer: junior , data-analyst: junior , data-scientist: mid-level }
aliases: ["column types", "data types"]
prereqs: ["schema"]
related: ["schema", "constraint", "audit-columns", "coalesce-nullif"]
---

Every column has a data type that says what kind of value it holds: whole numbers, decimals, text, dates, timestamps, true/false values and so on. The type decides what you can store, how values are compared and sorted, and how much space they take.

```sql
CREATE TABLE products (
  id          INTEGER PRIMARY KEY,
  name        VARCHAR(100) NOT NULL,
  price       NUMERIC(10, 2) NOT NULL,
  in_stock    BOOLEAN NOT NULL,
  released_on DATE,
  created_at  TIMESTAMP NOT NULL
);
```

The common families are:

- **Integers** (`INTEGER`, `BIGINT`) for counts and IDs.
- **Exact decimals** (`NUMERIC` or `DECIMAL`) for money and anything that must add up exactly.
- **Text** (`VARCHAR(n)` for a length limit, or `TEXT` for unbounded text). Exactly how these differ, and whether the length limit is enforced, depends on the database.
- **Dates and timestamps** (`DATE`, `TIMESTAMP`) for points in time.
- **Booleans** for true/false values.

Support for these types varies. Some databases, such as SQLite, use flexible typing and are less strict about what goes into a column, so check the documentation of the database you use.

The classic mistake is storing money in a floating-point type. Binary floats can't represent most decimal amounts exactly, so totals drift by tiny amounts. Use `NUMERIC` with a fixed scale. For moments in time, know whether your timestamp type stores a time zone; see [timestamp with vs without time zone](/t/timestamp-with-timezone). Also avoid storing dates as text: `'03/04/2026'` can't be sorted or compared reliably. Pick the type that matches the data, and add a [constraint](/t/constraint) when a value must stay within a range.
