---
title: "Data Sharing"
summary: "Giving another team or company live access to data without copying it."
levels: { data-engineer: senior }
aliases: ["secure data sharing", "data clean room", "zero-copy sharing"]
prereqs: ["data-warehouse", "data-governance"]
related: ["row-level-security", "column-level-security", "data-masking", "query-federation", "access-control-models"]
---

Data sharing gives another team, partner or customer live read access to data without building a copy-and-copy-again pipeline. The consumer queries the provider's data (or a read-only copy the provider controls), so there is one source of truth and no nightly export to go stale.

The classic mistake is shipping CSV extracts or standing up an ETL copy for every consumer. Each copy drifts, each one is another place sensitive data can leak, and someone has to maintain the pipeline. Sharing in place avoids all of that. For example, a partner who needs daily sales can be granted a read-only **view** over the provider's warehouse instead of receiving a file.

Implementations vary. Some warehouses have first-class sharing (for example, Snowflake's secure data sharing and BigQuery's Analytics Hub), and there are open protocols such as Delta Sharing. Object-storage based sharing hands out scoped access to files. Read your platform's model — the guarantees are not the same.

## Keep it safe

- Share a view, not the raw table, so you control which columns and rows are visible. See [row-level security](/t/row-level-security) and [column-level security](/t/column-level-security).
- Mask sensitive fields before sharing; see [data masking](/t/data-masking).
- Grant the minimum, revoke promptly, and log access. Sharing is an [access-control](/t/access-control-models) decision.
- Decide who pays for compute. Some models run queries on the provider's warehouse; others let the consumer query shared storage. This affects cost and latency.

## Trade-offs

Sharing is not the same as [federation](/t/query-federation): sharing exposes your data to the consumer, while federation lets you query their system without moving data. Sharing can be near real-time and cheap to maintain, but it ties the consumer to your platform and makes governance more important. When not to use it: for one-off extracts, or when the consumer's tooling cannot read your format, a controlled export may still be simpler.
