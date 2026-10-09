---
title: "Data Observability"
summary: "Monitoring freshness, volume, schema and distributions to catch silent breakage."
levels: { data-engineer: mid-level }
aliases: ["data monitoring", "data pipeline observability", "monitoring data quality", "data health monitoring"]
prereqs: ["data-quality-dimensions", "observability"]
related: ["data-freshness", "data-anomaly-detection", "data-lineage", "data-incident", "data-tests", "data-downtime"]
core: [data-engineer]
---

**Data observability** is **monitoring the health of your data itself**, not just whether jobs ran, so you find out about silent breakage before your stakeholders do. A pipeline can finish "successfully" while loading half the rows, stale data or values with a changed meaning. Infrastructure monitoring wouldn't notice. Data observability would.

It borrows the idea from software [observability](/t/observability): enough signals to understand what's going on inside the system.

## The signals usually tracked

| Pillar | Question | Example check |
|---|---|---|
| **Freshness** | Did the data arrive on time? | Latest `loaded_at` is within the expected window ([data freshness](/t/data-freshness)) |
| **Volume** | Is the amount of data normal? | Today's row count is within the usual range for this weekday |
| **Schema** | Did the structure change? | Columns or types differ from yesterday ([schema drift](/t/schema-drift)) |
| **Distribution** | Do the values look normal? | Null rate, distinct counts, min/max, averages are within normal bounds ([data profiling](/t/data-profiling)) |
| **Lineage** | What's affected, and where did it come from? | Which dashboards depend on this broken table ([data lineage](/t/data-lineage)) |

```sql
-- a volume check: today's rows versus the last four same weekdays
SELECT COUNT(*) AS today_rows FROM events WHERE event_date = CURRENT_DATE;
-- alert if it's far outside the typical range for this weekday
```

## How it differs from data tests

[Data tests](/t/data-tests) check **rules you wrote** (this column is never null). Observability adds **monitoring that learns what's normal and flags unexpected change** ([anomaly detection](/t/data-anomaly-detection)), including problems you didn't think to write a test for. You want both.

## Making it work

- **Cover the important tables first**, and the ones feeding critical dashboards, finance and ML.
- **Set sensible alert thresholds**, since too sensitive means noise (and ignored alerts), and too lax misses problems. Account for seasonality (weekends, month-end).
- **Route alerts to owners**, with context: what changed, how much, and the likely upstream cause ([data ownership](/t/data-ownership)).
- **Use lineage** to assess impact and trace root causes quickly.
- **Track incidents and time-to-detect and time-to-resolve** ([data downtime](/t/data-downtime), [data incidents](/t/data-incident)).
- **Close the loop**: each incident should produce a new test or monitor.

Tools exist (commercial and open source), and you can start with simple scheduled SQL checks. The important thing is that someone **looks at the data's health on purpose**, instead of discovering problems when a customer complains.
