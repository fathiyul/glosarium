---
title: "Avro"
summary: "A binary serialization format whose schemas are designed to evolve."
levels: { backend: senior, data-engineer: mid-level , data-scientist: mid-level }
also: [data-storage]
aliases: ["avro", "apache avro", "avro schema"]
prereqs: ["json-schema", "protocol-buffers"]
related: ["protocol-buffers", "messagepack", "json-schema"]
---

**Avro** is a binary serialization format where data is compact and the *schema* describes it — for reading, the schema travels with the data or lives in a registry. Originally from the Hadoop world, it's now standard plumbing for event streams and data pipelines (notably Kafka), where small messages and schema evolution matter.

```text
schema: {"type":"record","name":"User","fields":[{"name":"id","type":"string"},…]}
bytes:  [compact binary — no field names repeated]
```

Its distinguishing traits: dynamic typing without code generation (readers use the schema at runtime), strong schema-evolution rules (add optional fields safely; the reader/writer schema resolution handles mismatches), and excellent size efficiency for streams of small records.

The classic mistakes:

- No schema registry. Schemas floating in code comments drift; producers and consumers disagree silently. A registry versions schemas and enforces compatibility rules.
- Breaking evolution rules. Renaming fields, changing types or removing required fields breaks readers. Avro tolerates *additive, defaulted* change — treat anything else as a new version.
- Using it for APIs. Avro's strength is streams and files, not request/response APIs — no browser support, poor debuggability. JSON or protobuf serve APIs better.
- Forgetting defaults. New fields need defaults so old readers can process new data. Missing defaults turn additive change into breakage.
- Assuming self-description. Avro binary without its schema is opaque — unlike JSON you can't eyeball it. Tooling (schema registry UI, converters) is mandatory, not optional.
- Namespace collisions. Record names share namespaces; careless naming across teams collides. Namespace deliberately.

**When to choose it:** streaming and lakehouse pipelines where compact binary plus enforced schema evolution pays — Kafka topics, file archives. For APIs and browser-facing work, prefer JSON or protobuf; for maximum simplicity, JSON with [JSON Schema](/t/json-schema).
