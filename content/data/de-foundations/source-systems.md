---
title: "Source Systems"
summary: "Where data originates: application databases, APIs, logs, files, SaaS tools and devices."
levels: { data-engineer: junior , data-analyst: junior , data-scientist: mid-level }
aliases: ["data sources", "upstream systems", "operational systems", "source system"]
prereqs: ["data-engineering"]
related: ["data-ingestion", "structured-semi-unstructured", "log-based-cdc", "api-ingestion", "file-ingestion", "data-engineering-lifecycle"]
core: [data-engineer, data-scientist]
---

**Source systems** are where data **originates**: the systems that generate data as a side effect of doing something else. The data
engineer usually doesn't own them, but everything downstream depends on them.

## Common types

| Source | Examples | Typical access |
|---|---|---|
| **Application databases** | Postgres, MySQL behind the product | Query a replica, or read the change log ([log-based CDC](/t/log-based-cdc)) |
| **APIs / SaaS tools** | Payments, CRM, support, ad platforms | Pull via REST APIs ([API ingestion](/t/api-ingestion)), often rate-limited |
| **Files** | CSV, JSON and Parquet drops from partners or exports | Pick up from storage ([file ingestion](/t/file-ingestion)) |
| **Event streams and logs** | Clickstream, application logs, message queues | Consume continuously |
| **Devices and sensors (IoT)** | Machines, vehicles, wearables | Streaming, often noisy and intermittent ([IoT data](/t/iot-sensor-data)) |
| **Third-party data** | Purchased or public datasets | Files or APIs ([external data](/t/external-data)) |

## What to find out about each one

- **Who owns it**, and how do you reach them when it changes?
- **What does it contain**: schema, keys, meaning of columns, which fields are reliable?
- **How does it change**: does a row get *updated* in place (you lose history), or only appended?
- **How often does it change**, and how fresh do you need the copy to be?
- **How can you read it safely**: load limits, rate limits, a read replica, a maintenance window?
- **Is it reliable**: duplicates, late or missing data, outages, clock problems?
- **What's sensitive** in it (personal or regulated data), and what are you allowed to copy?

## Pitfalls

- **Querying the production database directly** for big extracts can slow down the application. Use a replica, an export or
  change data capture.
- **Schema changes upstream** can silently break your pipeline ([schema drift](/t/schema-drift)). Agree on notifications or contracts
  with the owning team.
- **Source data quality is the ceiling** for everything downstream. Fix problems at the source when you can.
- **Business logic lives in the source.** What does "active customer" mean in the app? Understand it before reinterpreting it.
- Operational databases are built for fast transactions, not analysis, which is why data gets copied elsewhere.

Treat the relationship with source system owners as a core part of the job. Many pipeline failures are communication failures.
