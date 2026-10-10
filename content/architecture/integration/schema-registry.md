---
title: "Schema Registry"
summary: "A central store of event schemas and their compatibility rules."
levels: { backend: senior, data-engineer: mid-level }
aliases: ["schema registry", "event schema registry", "avro schema registry"]
prereqs: ["event-driven-architecture", "avro"]
related: ["event-schema-versioning", "avro", "backward-compatibility"]
---
A **schema registry** centralises event/message schemas: producers register versions, consumers fetch them, and compatibility rules (backward/transitive) reject breaking publishes in CI — before they reach production. It's version control plus contract enforcement for the event-driven estate.

```text
producer CI → register v3 → compatibility check (vs v2, v1) → pass/fail
consumer → fetch schema → deserialize safely (upcasters handle gaps)
```

Registries pair with binary formats (Avro, Protobuf) where schemas aren't self-describing, but govern JSON too. References by id (not embedded schemas) keep payloads lean while retaining evolvability.

The classic mistakes:

- Registry as documentation only. Schemas registered but compatibility unchecked decay into suggestion boxes. Enforce in CI; block breaking publishes.
- Incompatible defaults. Permissive modes ("none") during early development fossilise into production anarchy. Start strict (backward-transitive); relax deliberately per subject.
- Unregistered producers. Shadow topics bypassing the registry fragment governance — unknown schemas breaking unknown consumers. All production schemas registered, no exceptions.
- Deleting schemas. Removing old versions breaks replay, new consumers and audits. Schemas are immutable history; deprecate, never delete.
- Subject strategy chaos. Topic-per-subject vs global subjects mixing breaks compatibility scoping. One strategy, documented, enforced.
- Ignoring consumer lag. Compatibility windows must cover the slowest consumer's upgrade cadence; aggressive sunsets strand laggards. Version support follows consumer reality.
- No disaster story. Registry outage blocking all deploys (or worse, deserialization) makes governance the SPOF. Cache, replicate, and degrade publishes safely.

**How to run it:** every schema registered, compatibility enforced in CI, versions immutable, subjects strategised. The registry is the event estate's constitution — write it strictly, amend it carefully.
