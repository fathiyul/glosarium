---
title: "Handling Upstream Schema Changes"
summary: "Responding when a source's structure changes under you."
levels: { data-engineer: mid-level , data-scientist: mid-level }
aliases: ["upstream schema changes", "handling source schema changes", "schema change management", "responding to schema changes"]
prereqs: ["schema-drift", "source-systems"]
related: ["schema-drift", "schema-evolution", "data-contract", "backfill", "data-tests", "debugging-failed-pipeline"]
core: [data-engineer]
---

Upstream systems change: a team adds a column, renames a field, splits a table or changes a type, often without telling you. How you **respond** (and how you prepare for it) decides whether it's a minor update or an outage with wrong numbers. See [schema drift](/t/schema-drift) for the problem itself.

## When a change hits you

1. **Find out what changed.** Compare the new schema to the old one (loaded files, source DDL, API docs, the diff in your landing data). Ask the owner what happened and *why*, including meaning, not just names.
2. **Assess the impact** with lineage: which models, dashboards and consumers use the affected columns ([data lineage](/t/data-lineage)).
3. **Decide the handling** by change type:

| Change | Usual response |
|---|---|
| **New column** | Usually harmless. Decide whether to load and use it (select explicitly), or ignore it |
| **Removed column** | Find where it's used. Replace it, default it deliberately, or stop the affected model rather than faking data |
| **Renamed column** | Map old and new names in the staging layer, so downstream models don't change. Handle history that has the old name |
| **Type change** | Cast safely in staging, check for values that fail, and watch for precision loss |
| **Meaning change** (same name, different semantics or units) | The most dangerous. Treat as a new field, document the change date and handle both eras |
| **Table split or merge** | Rebuild staging to recreate the old shape, then migrate downstream gradually |

4. **Fix in the right layer**: absorb the change in the **staging layer**, which protects downstream models ([staging, intermediate and marts](/t/staging-intermediate-marts)).
5. **Backfill history** if the change means old data needs reprocessing ([backfill](/t/backfill)). Raw data you kept makes this possible ([landing zone](/t/landing-zone)).
6. **Test and deploy** through normal CI, and communicate with consumers about any change in numbers.
7. **Add a guard** so you'd have known sooner ([data tests](/t/data-tests)).

## Preparing for it

- **Explicit column selection** in staging models, so unexpected columns don't flow through silently.
- **Schema checks on arrival**: expected columns and types, with an alert on any difference.
- **Land raw data untouched.**
- **Agree on [data contracts](/t/data-contract)** with source owners where possible, and be on their change-notification list.
- **Know your sources' owners**, and build a relationship ([source systems](/t/source-systems)).
- **Monitor distributions** to catch semantic changes that don't alter the schema ([data observability](/t/data-observability)).
- **Use schema-tolerant formats and settings** where appropriate ([schema evolution](/t/schema-evolution)).

## Mindset

Change is normal. Don't treat each one as a failure of the source team. Aim for **early detection**, **a contained blast radius** (absorb changes in staging) and **fast, safe recovery**. When a pipeline breaks loudly on a schema change, that's often the best outcome. The silent version is the one to prevent. See also [debugging a failed pipeline](/t/debugging-failed-pipeline).
