---
title: "Data Versioning"
summary: "Tracking versions of datasets the way Git tracks code."
levels: { data-engineer: senior , data-scientist: senior }
aliases: ["dataset versioning", "data version control", "versioned data", "DVC", "lakeFS", "data snapshots"]
prereqs: ["open-table-format", "reprocessing-history"]
related: ["open-table-format", "time-travel", "feature-store", "reprocessing-history", "data-ci-cd", "write-audit-publish"]
core: [data-engineer]
---

Code has Git: every change is recorded, you can compare versions and go back. **Data versioning** gives datasets the same abilities: **identify, retain and reproduce specific versions of data**. It matters whenever results depend on exactly which data was used.

## Why version data

- **Reproducibility**: "the model trained last March" or "the report as filed" should be re-creatable from the exact inputs, not whatever's in the table today ([training data](/t/training-data)).
- **Debugging**: when a number changed, compare today's data with yesterday's.
- **Safe rollback**: revert to the last good state after a bad load ([data incidents](/t/data-incident)).
- **Safe experimentation**: try a transformation on a branch of the data without touching production.
- **Auditing and compliance**: show what data existed at a given time.
- **Testing in CI** against specific, stable datasets ([CI/CD for data](/t/data-ci-cd)).

## Approaches

| Approach | How it works |
|---|---|
| **Table time travel / snapshots** | [Open table formats](/t/open-table-format) (Iceberg, Delta, Hudi) record each commit as a snapshot, so you can query "as of" a version or timestamp, and roll back ([time travel](/t/time-travel)). Retention is limited by how long you keep old snapshots |
| **Immutable, versioned files** | Write each run's output to a new, versioned path (`.../v=2024-06-01T09:00/`, or by run ID) and point consumers at a chosen version |
| **Partition-level versions / dated snapshots** | Keep daily snapshots of mutable tables (useful for slowly changing source data) |
| **Data version control tools** | Tools such as lakeFS (Git-like branches and commits over object storage) and DVC (tracks dataset versions alongside code, often for ML) |
| **Raw data kept forever, code versioned** | Reproduce any version by re-running versioned code on immutable raw input ([landing zone](/t/landing-zone)) |
| **Schema versions** | Separate from data versions: version the *structure* too ([schema evolution](/t/schema-evolution)) |

## Linking data and code versions

A reproducible result needs **both**: the code version (a Git commit) and the data version (a snapshot ID or timestamp). Record them together: in a model's metadata, a report's footer, or a pipeline run record.

## Practical points

- **Retention is a cost trade-off.** Keeping every version of big tables is expensive. Decide how long you retain snapshots, and what you keep permanently (the versions that models and filings depend on).
- **Don't confuse time travel with backup.** It may be limited and tied to the same storage and permissions. Take real backups for disaster recovery.
- **Privacy**: old versions contain data you may be required to delete ([right to erasure](/t/right-to-erasure), [data retention](/t/data-retention)).
- **Immutability helps**: append-only, immutable raw layers make versioning far simpler.
- **Name things clearly**: version identifiers that humans and machines can reference.
- **Pin versions** where stability matters (a training set, a regulatory report), and let others float to latest.

Start with what your platform offers (table snapshots), and add more tooling only for use cases that need it.
