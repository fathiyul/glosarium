---
title: "Audit Columns (created_at, updated_at)"
summary: "Recording when, and by whom, rows changed."
levels: { backend: junior, data-engineer: junior }
aliases: ["audit fields", "timestamps columns"]
prereqs: ["schema"]
related: ["schema", "crud", "db-trigger", "constraint"]
---

Audit columns record when a row was created and last changed. The usual pair is `created_at` and `updated_at`, and some tables also store who made the change, such as `created_by`.

```sql
CREATE TABLE orders (
  id          INTEGER PRIMARY KEY,
  total       NUMERIC NOT NULL,
  created_at  TIMESTAMP NOT NULL,
  updated_at  TIMESTAMP NOT NULL
);

UPDATE orders
SET total = 55.00, updated_at = CURRENT_TIMESTAMP
WHERE id = 1042;
```

These columns are useful for debugging ("when did this change?"), for syncing data to other systems, and for data pipelines that pick up only new or changed rows. Store timestamps in UTC so they compare correctly across time zones.

The classic mistake is relying on application code to set `updated_at` in every place that changes a row. Any path that skips it, such as a manual `UPDATE` in a SQL client or a batch script, leaves the timestamp wrong. Set the default in the schema, or use a [database trigger](/t/db-trigger) that runs on every update, so the rule holds no matter what writes the row.
