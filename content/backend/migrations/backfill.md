---
title: "Backfill"
summary: "Filling in data for existing rows after a change."
levels: { backend: mid-level, data-engineer: junior }
aliases: ["backfilling", "data backfill", "backfill job", "historical backfill", "reprocessing"]
prereqs: ["schema-migration", "upsert"]
related: ["data-migration", "schema-migration", "expand-contract-migration", "online-schema-change", "idempotence"]
core: [data-engineer]
also: [data-orchestration]
---

A **backfill** fills in data for rows or time periods that **already exist**, after something changed. It's the "and now fix
the old data too" step.

Typical situations:

- You add a column `full_name` and need to compute it for the 20 million existing rows.
- You change how revenue is calculated, and need to recompute the last two years of reports.
- A pipeline was broken for a week, and you need to load the missing days.
- A new data source starts, and you need its history.

## Doing it safely

```python
# Chunked, resumable, idempotent
last_id = 0
while True:
    rows = db.query("SELECT id FROM users WHERE id > %s AND full_name IS NULL ORDER BY id LIMIT 1000", last_id)
    if not rows:
        break
    db.execute("UPDATE users SET full_name = first_name || ' ' || last_name WHERE id = ANY(%s)", [r.id for r in rows])
    last_id = rows[-1].id
    time.sleep(0.1)          # be kind to the database
```

- **Work in batches**, not one giant statement. A single huge `UPDATE` can lock the table, bloat the transaction log and
  take everything down.
- **Make it idempotent and resumable.** If it crashes at 60%, rerunning it should continue, not duplicate or corrupt things
  (the `IS NULL` check above, or an [upsert](/t/upsert)).
- **Throttle** to protect production traffic, and run off-peak if you can.
- **Test on a copy**, then on a small slice, then everything.
- **Verify afterwards**: count the rows, spot-check values, compare totals.
- **Write new data correctly first.** Deploy the code that fills the new field for new rows, *then* backfill the old
  ones, or you'll chase a moving target ([expand and contract](/t/expand-contract-migration)).
- **Log progress** so you know how far it got and can estimate how long it'll take.

## In data pipelines

A backfill means rerunning a pipeline over a historical date range. This works well when jobs take the date as a parameter and
write by partition or by upsert, so reprocessing a day **replaces** that day and never appends duplicates. Orchestrators
usually have a built-in way to run a pipeline for past dates.

A backfill is normally a one-off job, separate from the schema change itself ([schema migrations](/t/schema-migration)), and
sometimes run as a script ([data migrations](/t/data-migration)).
