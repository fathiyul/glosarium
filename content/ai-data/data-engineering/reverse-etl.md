---
title: "Reverse ETL"
summary: "Syncing warehouse data back into operational tools."
levels: { backend: staff, data-engineer: mid-level , data-scientist: mid-level }
also: [data-serving]
aliases: ["reverse ETL", "operational analytics sync", "warehouse to app sync"]
prereqs: ["etl-vs-elt", "data-warehouse"]
related: ["reverse-etl-use-cases", "data-serving", "etl-vs-elt"]
---
**Reverse ETL** moves modelled data out of the warehouse and into the operational tools where people and systems act on it: the CRM, the support desk, the marketing platform. Where ordinary ETL brings data in for analysis, reverse ETL pushes curated results back to where decisions are made, such as a segment of high-value customers or a health score.

```text
warehouse model (customer score) → sync job → CRM field / marketing audience → action
```

Its value depends on trust. The warehouse model that drives a sales alert must be correct and current, and the sync must be reliable and idempotent, because a duplicated or stale push changes real customer experiences.

The classic mistakes:

- Syncing unvalidated models. A broken metric pushed into operational tools causes wrong actions at scale. Test and monitor the source before syncing.
- Non-idempotent writes. Retried syncs that create duplicates or overwrite newer edits cause data corruption in the destination. Use keyed upserts.
- Ignoring destination rate limits. Bulk pushes can be throttled or fail partway. Batch, retry and reconcile.
- Two sources of truth. If the destination also edits the same fields, the warehouse and the CRM disagree. Decide ownership per field.
- No audit of what was sent. When a customer receives the wrong message, you need to know which value was synced and when.

**Practice:** sync only validated models, write idempotently with keys, assign field ownership explicitly, and log every push.

Treat the sync as a product surface: the people reading a pushed field rarely know where it came from, so the warehouse model's definition, owner and refresh schedule should be visible wherever the value lands. See [data serving](/t/data-serving) for the wider picture.
