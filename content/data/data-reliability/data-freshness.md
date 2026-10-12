---
title: "Data Freshness"
summary: "How recently a table was updated, and whether that's recent enough."
levels: { data-engineer: junior , data-analyst: mid-level , data-scientist: junior }
aliases: ["freshness", "data staleness", "stale data", "data timeliness", "freshness check"]
prereqs: ["scheduling-pipelines"]
related: ["data-sla", "data-downtime", "data-observability", "data-quality-dimensions", "pipeline-retries", "real-time-vs-near-real-time"]
core: [data-engineer]
---

**Data freshness** is how recent the data in a table is, and whether that's recent enough for the people using it. A dashboard that
looks perfect but shows yesterday's numbers as if they were today's is a quiet kind of failure.

## Measuring it

Compare "now" with the newest data in the table:

```sql
SELECT NOW() - MAX(updated_at) AS staleness
FROM analytics.orders;
```

There are two different clocks, and it matters which you use:

| Clock | Means |
|---|---|
| **Event time** (`created_at`: when the thing happened) | How current the *world* is in this data |
| **Load time** (`loaded_at`: when the pipeline wrote it) | Whether the *pipeline* ran |

A pipeline can run on schedule (load time is fresh) while the source stopped sending new events (event time is stale). Monitor both.

## Why "the job succeeded" isn't enough

A job can succeed and still load nothing new: the upstream export was empty, a filter dropped everything, a source silently stopped. Only
checking the data itself catches that.

## Setting expectations

Freshness is a promise to consumers, so state it explicitly:

> `analytics.orders` is updated by 06:00 UTC daily, and is at most 24 hours behind.

This is a [data SLA](/t/data-sla). Different tables need different promises: finance reports might be daily, an operations dashboard needs
minutes ([real-time vs near-real-time](/t/real-time-vs-near-real-time)). Don't over-promise. Fresher costs more.

## Operating it

- **Automate freshness checks** on important tables, with thresholds, that alert when exceeded
  ([data tests](/t/data-tests), [data observability](/t/data-observability)).
- **Show it to consumers**: put a "data as of ..." timestamp on dashboards, so people know what they're looking at.
- **Alert before the deadline** if you can see the pipeline running late.
- **Remember weekends and holidays**: sources have quiet periods, so a threshold needs to allow for normal gaps.
- **When data is late, say so.** A known delay with communication is much better than people discovering wrong numbers on their own
  ([data downtime](/t/data-downtime)).

Freshness is one of the core [data quality dimensions](/t/data-quality-dimensions), usually called *timeliness*.
