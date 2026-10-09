---
title: "Schema Evolution"
summary: "Changing data formats so old and new readers and writers keep working."
levels: { backend: senior, frontend: senior, data-engineer: mid-level }
aliases: ["schema changes", "schema versioning", "backward compatibility of schemas", "forward compatibility", "data format evolution"]
prereqs: ["serialization", "json-schema"]
related: ["backward-compatibility", "schema-registry", "protocol-buffers", "avro", "event-schema-versioning", "schema-drift", "api-versioning"]
core: [data-engineer]
also: [ingestion]
---

Data formats change over time: new fields get added, old ones renamed or dropped. **Schema evolution** is changing a schema so that **old and new writers and readers keep working together**, which matters whenever producers and consumers
can't be upgraded at the same moment (APIs, message queues, files in storage, databases with rolling deploys).

Two directions of compatibility:

| | Meaning | Example |
|---|---|---|
| **Backward compatible** | New readers can read **old** data | The new consumer still understands last year's events |
| **Forward compatible** | Old readers can read **new** data | The old consumer ignores fields it doesn't know |
| **Full** | Both | Safe to upgrade in any order |

## Safe changes (usually)

- **Add an optional field** (or one with a default). Old readers ignore it, new readers handle its absence.
- **Remove an optional field** that nobody depends on (after checking!).
- **Widen** carefully: for example, allow a new enum value, if readers tolerate unknown values.

## Breaking changes

- **Renaming** a field (it's a remove plus an add).
- **Changing a field's type** (`int` to `string`) or its meaning.
- **Making an optional field required.**
- **Reusing** a field's identity with new meaning.
- **Removing a required field.**

```json
// v1
{ "id": 7, "name": "Ana" }
// v2: additive, compatible
{ "id": 7, "name": "Ana", "locale": "id-ID" }
// v3: renamed name → full_name: breaking for every consumer of "name"
```

To rename safely: add the new field, write both for a while, migrate readers, then remove the old one ([expand and contract](/t/expand-contract-migration)).

## Format-specific rules

- **Protocol Buffers**: fields are identified by **number**, so never reuse or change a number. Mark removed ones as reserved ([protocol buffers](/t/protocol-buffers)).
- **Avro**: the reader and writer schemas are resolved against each other, and defaults make added fields compatible ([Avro](/t/avro)).
- **JSON**: no built-in rules, so conventions matter. Be a **tolerant reader**: ignore unknown fields, and don't crash on missing optional ones.

## Practices

- **Check compatibility automatically** in CI, or with a [schema registry](/t/schema-registry) that rejects incompatible schemas.
- **Decide the compatibility mode** you promise.
- **Version events and APIs** when you can't stay compatible ([event schema versioning](/t/event-schema-versioning), [API versioning](/t/api-versioning)).
- **Document and announce changes.**
- In data pipelines, expect upstream schemas to change without warning ([schema drift](/t/schema-drift)) and decide how pipelines should react.
