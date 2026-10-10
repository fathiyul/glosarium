---
title: "Data Tests"
summary: "Automated checks like not-null, unique and accepted values on tables."
levels: { data-engineer: junior , data-analyst: mid-level }
aliases: ["data quality tests", "dbt tests", "not null unique accepted values", "table tests", "data assertions"]
prereqs: ["data-quality-dimensions", "select-query"]
related: ["data-expectations", "write-audit-publish", "data-observability", "data-freshness", "data-contract", "circuit-breaker-data"]
core: [data-engineer]
---

**Data tests** are automated checks on the data a pipeline produces. Software has unit tests, and data needs tests too, because pipelines
are written once and run on ever-changing input.

The common built-in kinds:

| Test | Asserts |
|---|---|
| **Not null** | A column never contains NULL (`order_id`, `customer_id`) |
| **Unique** | No duplicates in a key column, matching the table's [grain](/t/grain) |
| **Accepted values** | A column only has allowed values (`status` in `new`, `paid`, ...) |
| **Relationships** | Every foreign key has a matching row in the parent table (no orphans) |
| **Row count / volume** | Not zero, and within an expected range of normal |
| **Freshness** | Latest timestamp is recent enough ([data freshness](/t/data-freshness)) |
| **Custom** | Any business rule: revenue ≥ 0, `ship_date` ≥ `order_date`, totals agree with a source |

A test is basically a query that **should return no rows**:

```sql
-- test: orders must have a customer that exists
SELECT o.order_id
FROM orders o
LEFT JOIN customers c ON c.customer_id = o.customer_id
WHERE c.customer_id IS NULL;
```

Tools ([dbt tests](/t/sql-transformation-models), expectations libraries, orchestrator checks) let you declare these in config and run them
automatically.

## When and where to run them

- **After building a table, before consumers use it.** Better still, run checks on new data **before publishing** it, and only promote it if it passes
  ([write-audit-publish](/t/write-audit-publish)).
- **On sources** as they arrive, to catch upstream problems early.
- **In CI** on code changes, against sample or development data.

## Designing good tests

- **Test what would hurt**: keys, joins, money, important filters. Don't test everything equally.
- **Distinguish warn from fail.** Some tests should stop the pipeline (duplicate keys in a billing table). Others should just alert.
- **Avoid flaky tests** with tight thresholds that trip over normal variation. Alert fatigue makes people ignore real failures.
- **Make failures actionable**: show which rows failed, and who owns the table.
- **Add a test whenever you fix a data bug**, as a regression test ([regression tests](/t/regression-test)).
- **Tests complement monitoring.** They check rules you thought of, and monitoring and anomaly detection catch unexpected changes
  ([data observability](/t/data-observability)).

Passing tests doesn't prove the data is right, only that it satisfies the rules you've written. See
[data quality dimensions](/t/data-quality-dimensions).
