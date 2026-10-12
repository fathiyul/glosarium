---
title: "Data Quality Checks"
summary: "The assertions a dataset must pass before you build numbers on it."
levels: { data-analyst: mid-level , data-scientist: junior }
aliases: ["data quality check", "data validation checks", "quality checks", "data checks"]
prereqs: ["data-profiling", "sql"]
related: ["data-tests", "data-quality-dimensions", "data-reconciliation", "data-freshness", "metric-discrepancy", "data-incident"]
---

Data quality checks are the assertions a dataset must pass before you build numbers on it. They are the analyst's version of [data tests](/t/data-tests): the same [quality dimensions](/t/data-quality-dimensions), applied to the table in front of you today, with someone accountable for the failures.

A practical starter set:

| Check | Example |
|---|---|
| Row count | Yesterday's volume, not ten times it and not zero |
| Key uniqueness | No duplicate `order_id`; the count of distinct keys equals the count of rows |
| Null rate | `customer_id` never null; `country` null on no more than a few percent |
| Domain | `status` is one of the allowed values; dates are not in the future; amounts are not negative |
| Freshness | The latest `event_time` is inside the expected window, and the table updated when it should have |
| Reconciliation | A total matches the source or the finance report ([data reconciliation](/t/data-reconciliation)) |

The classic mistake is a suite that **only counts rows**. Row counts are cheap and they catch the loud failures: an empty load, a doubled one. They do not catch the quiet ones. A many-to-one join fans out — 100 orders joined against a product table with a duplicated product row become 120 orders and a total that is twenty percent too high — and if both sides grew, the row count still looks normal.

So add checks that look at values and not just volume. Compare a total against an independent source. Compare the distinct key count to the row count. Re-run yesterday's query and flag a result that moved without an explanation ([metric discrepancy](/t/metric-discrepancy)). Watch the profile rather than only the totals, so a column that changes shape gets noticed ([data profiling](/t/data-profiling)). **Row count is not a fan-out check.**

Then decide the failure behaviour: alert, quarantine the table, or stop the report. Set thresholds by impact rather than by perfection, since a rate that is fine for analytics can be unacceptable for billing. And give every check an owner, or nobody reads the alert — an unowned check is documentation, and an unnoticed failure becomes a [data incident](/t/data-incident).
