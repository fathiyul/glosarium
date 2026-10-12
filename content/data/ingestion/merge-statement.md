---
title: "MERGE Statement"
summary: "SQL that inserts, updates or deletes rows in one pass based on a match."
levels: { data-engineer: mid-level , data-scientist: mid-level }
aliases: ["MERGE", "SQL MERGE", "upsert statement"]
prereqs: ["sql", "upsert"]
related: ["upsert", "append-vs-merge", "scd-types", "deduplication", "change-data-capture"]
---

A MERGE statement compares rows from a source to rows in a target table and inserts, updates or deletes in a single statement. It is the SQL way to express an [upsert](/t/upsert): match on a key, then act depending on whether a row was found.

```sql
MERGE INTO customers AS t
USING new_customers AS s
  ON t.customer_id = s.customer_id
WHEN MATCHED THEN
  UPDATE SET name = s.name, email = s.email
WHEN NOT MATCHED THEN
  INSERT (customer_id, name, email)
  VALUES (s.customer_id, s.name, s.email);
```

The classic mistake is reaching for MERGE for every load. If you are only appending new rows, a plain INSERT is simpler and faster. MERGE pays off when you must keep a table in sync with a changing source — daily snapshots, [change data capture](/t/change-data-capture) feeds, or [slowly changing dimensions](/t/scd-types).

Watch for these:

- **Duplicate source rows.** If the source has two rows with the same key, some engines error out ("unstable" or "non-deterministic" match) rather than picking one. Deduplicate first.
- **Non-standard syntax.** MERGE is in the SQL standard, but support and details vary by engine and version; not every database has it. Check your engine's docs.
- **Concurrency.** A MERGE is not a magic lock. Two MERGEs running at once, or writes during the MERGE, can still produce duplicates or conflicts on some engines.
- **Cost.** The join can scan a lot of data. Indexing or clustering the target key helps.

When not to use it: for append-only event data, or when the source and target are already aligned, MERGE adds overhead for no benefit. See [append vs merge](/t/append-vs-merge).
