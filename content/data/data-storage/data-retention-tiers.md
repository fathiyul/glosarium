---
title: "Data Retention and Tiering"
summary: "Expiring or moving old data to cheaper storage on purpose."
levels: { data-engineer: mid-level }
aliases: ["retention policy", "data tiering", "storage tiering"]
prereqs: ["data-retention", "storage-lifecycle"]
related: ["object-storage", "s3", "data-governance", "backups", "time-series-database"]
---

Data retention is a policy for how long you keep data; tiering is moving older data to cheaper storage. Together they decide what gets deleted, what stays queryable, and what is cheap to store but slow to read. See [data retention](/t/data-retention) for the policy side.

The classic mistake is keeping everything forever in the fast, expensive store because deleting feels risky. A logs table or an events table grows without bound, and the bill grows with it. The opposite mistake is deleting on a fixed timer when something else requires the data — legal, finance or an incident that needs old records.

A common pattern is tiers:

- **Hot**: recent data in the fast store for dashboards and alerts.
- **Warm**: older data still queryable but on cheaper storage.
- **Cold/archive**: rarely read, restored on demand, cheapest per byte.

In object storage this maps to [storage lifecycle policies](/t/storage-lifecycle) that move objects between classes or delete them after a set age (for example, on [S3](/t/s3)).

## What to watch

- Deletion has to respect legal and business rules; a [data governance](/t/data-governance) policy should decide the periods, not an engineer's guess.
- "Deleted" does not always mean gone. [Backups](/t/backups) and replicas may still hold copies, and immutable or append-only formats make true deletion harder.
- Tiering adds retrieval latency and sometimes retrieval cost, so it suits data you rarely need quickly.
- Retention is engine-specific: warehouses, object stores and [time-series databases](/t/time-series-database) each express it differently.

The trade-off is cost versus access. Short retention and aggressive tiering save money but remove history you cannot get back. Pick retention from the requirement (compliance, debugging, product) rather than from storage price alone.
