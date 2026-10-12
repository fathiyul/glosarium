---
title: "Data Expectations / Assertions"
summary: "Declared rules data must satisfy, checked in the pipeline."
levels: { data-engineer: mid-level , data-analyst: mid-level , data-scientist: mid-level }
aliases: ["data assertions", "pipeline assertions", "declarative data checks", "expectations"]
prereqs: ["data-tests", "data-quality-dimensions"]
related: ["data-tests", "data-quality-dimensions", "data-observability", "data-contract", "write-audit-publish", "circuit-breaker-data"]
---

A data expectation (also called an assertion) is a rule you declare about your data that must hold when the pipeline runs: a column is never null, values stay within a range, a table has at least one row, a total matches another table. You write them as code or config next to the pipeline, and the pipeline checks them and reacts.

The difference from plain [data tests](/t/data-tests) is mostly framing and scope. "Data tests" usually means the small set of built-in checks (not null, unique, accepted values). "Expectations" usually means a broader, declarative set that you attach to many tables, often with metadata such as a description, a severity, and who to alert. The underlying idea is the same: a query that should return nothing, or a computed result compared against an expected bound.

```yaml
# illustrative expectation, not tied to one tool
table: analytics.orders
expect:
  - column: order_id
    rule: not_null
  - column: total_cents
    rule: between
    min: 0
    max: 100000000
  - rule: row_count_between
    min: 1000
    max: 5000000
severity: warn   # or "fail", which stops the pipeline
```

## Why declare them

- They live with the code, so they are reviewed and versioned, unlike a check someone runs by hand.
- They carry intent: a severity, a description, an owner.
- They compose: one engine can apply them across hundreds of tables and produce a single quality report.

## Cautions

**Expectations only encode what you thought of.** They will not catch a meaning change or a new kind of corruption; pair them with monitoring ([data observability](/t/data-observability)).

**Decide warn versus fail.** A failed key check in billing should stop the pipeline; a mild distribution shift should only alert. This is what turns an expectation into a gate ([write-audit-publish](/t/write-audit-publish), [data circuit breaker](/t/circuit-breaker-data)).

Keep thresholds loose enough to survive normal variation, or people will start ignoring failures. And too many expectations slow every run and produce noise, so focus on the columns and tables that matter.

Expectations are the checks; where they run and what they block is a separate design choice.
