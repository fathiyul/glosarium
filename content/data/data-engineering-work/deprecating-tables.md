---
title: "Deprecating Tables"
summary: "Retiring datasets without breaking hidden downstream users."
levels: { data-engineer: mid-level , data-scientist: mid-level }
aliases: ["table deprecation", "deprecating a table", "retiring datasets", "sunsetting tables"]
prereqs: ["deprecation", "data-lineage"]
related: ["data-lineage", "data-catalog", "data-contract", "data-ownership", "handling-schema-changes", "data-sharing"]
---

Deprecating a table means retiring a dataset on purpose: announcing that it will be removed, giving users time to move to a replacement, and then deleting it. The hard part is that the people using a table are often not the people who built it, and they rarely announce themselves.

The classic mistake is dropping a table that looks unused. It has no recent writes, the owner left, and the name is vague, so someone deletes it, and a week later a finance report breaks or a model starts failing because it read that table. **Looks unused** is not the same as "unused". Use [lineage](/t/data-lineage), query logs and the [data catalog](/t/data-catalog) to find who actually reads it, including indirect consumers downstream.

## A safe sequence

1. Find the consumers. Check lineage, catalog, BI usage stats and query history. Look at views and jobs that reference it, not just direct queries.
2. Decide the replacement. Point users at the successor table, or state plainly that there is none. A [data contract](/t/data-contract) makes the promise explicit.
3. Announce and set a date. Put a deprecation notice in the catalog, the table description and the docs, with a removal date and a contact ([documenting datasets](/t/documenting-datasets), [deprecation](/t/deprecation)).
4. Watch usage during the grace period. If someone is still reading it near the date, contact them; extend if the migration is real work.
5. Stop writes, then remove. Turn off the pipeline that fills it before dropping the table, so nothing silently recreates it.
6. Archive before deleting. Keep a copy in cheap storage or a snapshot, in case someone needs history later. On platforms with [time travel](/t/time-travel) or snapshots, dropping may still be recoverable for a while, but do not rely on that.

## The trade-off

The opposite failure is **never deprecating anything**, so the warehouse fills with ambiguous, duplicated and stale tables, and nobody knows which is safe to use. Deprecation is [data ownership](/t/data-ownership) in practice: someone is accountable for saying "this is going away and here is what to use instead". For [shared](/t/data-sharing) tables used outside your team or company, give longer notice, since you may not be able to see every consumer.
