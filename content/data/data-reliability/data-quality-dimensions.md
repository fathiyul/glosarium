---
title: "Data Quality Dimensions"
summary: "Accuracy, completeness, consistency, timeliness, validity and uniqueness."
levels: { data-engineer: junior , data-analyst: mid-level }
aliases: ["data quality", "dimensions of data quality", "accuracy completeness consistency", "quality dimensions"]
prereqs: ["data-profiling"]
related: ["data-tests", "data-expectations", "data-observability", "data-freshness", "data-reconciliation", "data-anomaly-detection"]
core: [data-engineer, data-analyst]
---

"Good data" is vague. **Data quality dimensions** break it into specific, checkable qualities. Frameworks list a few more or fewer, but
these six cover most needs.

| Dimension | The question | Example check |
|---|---|---|
| **Accuracy** | Does it match reality? | Order totals agree with the payment provider ([reconciliation](/t/data-reconciliation)) |
| **Completeness** | Is everything that should be there present? | No unexpected nulls in `customer_id`; the row count is within the usual range |
| **Consistency** | Do different places agree? | Revenue in the dashboard equals revenue in finance's table; the same country code format everywhere |
| **Timeliness** | Is it recent enough? | The table was updated in the last 24 hours ([data freshness](/t/data-freshness)) |
| **Validity** | Does it follow the rules and formats? | Emails look like emails, status is one of an allowed list, dates are real, amounts aren't negative |
| **Uniqueness** | Is each thing recorded once? | No duplicate `order_id` ([deduplication](/t/deduplication)) |

```sql
-- validity and uniqueness checks as queries that should return zero rows
SELECT * FROM orders WHERE status NOT IN ('new', 'paid', 'shipped', 'cancelled');
SELECT order_id FROM orders GROUP BY order_id HAVING COUNT(*) > 1;
```

## How to use them

- **Pick what matters for each dataset.** Not every table needs every check. A payments table needs accuracy and uniqueness badly.
  A web-log table cares about completeness and timeliness.
- **Turn dimensions into automated tests** ([data tests](/t/data-tests)) that run every time the pipeline runs.
- **Start with profiling** to learn what's normal ([data profiling](/t/data-profiling)).
- **Set thresholds based on business impact**, not perfection. 0.1% bad rows might be fine for analytics and unacceptable for billing.
- **Track quality over time**, and watch for trends.
- **Assign owners** and decide who fixes what, ideally at the source.

## Remember

Accuracy is the hardest to verify automatically, since you need an independent source of truth to compare against. Many "quality" tools
check validity, completeness, uniqueness and freshness, which are easier. Passing every automated check doesn't prove the data is right, so compare against reality
regularly.
