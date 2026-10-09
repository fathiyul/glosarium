---
title: "Schema Drift"
summary: "A source adding, renaming or retyping fields without telling you."
levels: { data-engineer: mid-level }
aliases: ["source schema changes", "upstream schema change", "schema changes in pipelines", "column drift"]
prereqs: ["data-ingestion", "structured-semi-unstructured"]
related: ["schema-evolution", "data-contract", "landing-zone", "data-tests", "source-systems", "handling-schema-changes"]
core: [data-engineer]
---

**Schema drift** is when a data source **changes its structure without warning**: a column is added, renamed or removed, a type changes (`int` becomes `string`), a nested field appears, or a value format changes. Your pipeline, built for yesterday's shape, breaks or, worse, **silently produces wrong results**.

Typical examples:

- A new column appears in the source table.
- `customer_id` is renamed to `client_id`.
- An API now returns amounts as strings (`"12.50"`) instead of numbers.
- A date column switches from `YYYY-MM-DD` to `DD/MM/YYYY`.
- A column that was always filled starts arriving as null.
- A JSON field gets a new nested object, or an array becomes a single value.

## Why it's dangerous

Loud failures (the load crashes) are annoying but safe. The **silent** ones hurt: a renamed column loads as all nulls, a changed unit is summed with old data, a dropped field defaults to zero. Dashboards keep updating, with wrong numbers.

## Strategies

| Approach | What it does | Use when |
|---|---|---|
| **Fail loudly** | Compare incoming schema to the expected one, and stop with an alert on any unexpected change | Critical tables where wrong data is worse than late data |
| **Evolve automatically** | Add new columns to the target, tolerate extras | Raw layers and tolerant consumers ([schema evolution](/t/schema-evolution)) |
| **Rescue and quarantine** | Load what you understand, and put unexpected data in a "rescue" column or a quarantine table | Semi-structured sources |
| **Contract** | Agree the schema with the producer and test against it ([data contracts](/t/data-contract)) | Internal sources you can negotiate with |

## Practices

- **Land the raw data untouched**, so you can reprocess when the schema changes ([landing zone](/t/landing-zone)).
- **Select columns explicitly** in transformations instead of `SELECT *`, so new columns don't unexpectedly flow through (or break things).
- **Test schemas and values**: expected columns and types, not-null, accepted values, value ranges ([data tests](/t/data-tests)).
- **Monitor profiles** (null rates, distinct counts, value distributions) to catch semantic drift that a schema check can't see ([data profiling](/t/data-profiling)).
- **Talk to the owners** of source systems and ask to be told of changes, ideally before release ([source systems](/t/source-systems)).
- **Version and document** how you handled each change, and how to backfill after one ([handling schema changes](/t/handling-schema-changes), [backfill](/t/backfill)).

Drift is normal, since sources are living systems. Designing for it is part of building trustworthy pipelines.
