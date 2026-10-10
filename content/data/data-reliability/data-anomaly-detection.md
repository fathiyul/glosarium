---
title: "Anomaly Detection on Data"
summary: "Flagging unusual volumes or values automatically."
levels: { data-engineer: mid-level , data-analyst: mid-level }
aliases: ["data anomaly detection", "anomaly detection in pipelines", "volume anomaly detection", "data change alerts"]
prereqs: ["data-observability", "data-quality-dimensions"]
related: ["data-observability", "data-freshness", "data-tests", "data-quality-dimensions", "data-downtime", "data-incident"]
---

Anomaly detection on data means flagging values that deviate from what is normal for a dataset, automatically, without a hand-written rule for every case. Instead of "row count must be above zero", you learn the usual range for this table on this weekday and alert when it leaves that range. It is one of the signals behind [data observability](/t/data-observability).

It exists because pipelines fail silently. A job can finish green while loading 40,000 rows instead of the usual 1.2 million, or while a column that is normally 2% null becomes 60% null. A [not-null test](/t/data-tests) would pass. Only comparing today's behaviour with the past catches it.

## What people monitor

- Volume: row counts, bytes and file counts.
- Freshness: how far behind the newest record is ([data freshness](/t/data-freshness)).
- Distribution: null rate, distinct count, min, max, mean, and the share of values per category.
- Schema: columns and types changing ([schema drift](/t/schema-drift)).
- Business metrics: daily revenue or signups moving oddly, which is what stakeholders notice.

A simple baseline uses the same weekday over recent weeks, then flags a value beyond a fixed percentage. More elaborate methods use statistical scores (for example z-score or median absolute deviation) or a model of seasonality. Many teams start with scheduled SQL that writes a check result and alerts on it.

## Getting it right

**Seasonality is the trap.** Weekends, month-ends and holidays look like anomalies to a naive baseline. Compare like periods, or model the pattern.

**False positives cause [alert fatigue](/t/alert-fatigue).** A monitor nobody trusts is worse than none. Tune thresholds, and start with important tables only.

**An anomaly is not proof of an error.** A genuine spike from a campaign is not a bug. Route alerts to an owner who can judge, and let them close it as expected.

One upstream problem fires many alerts. Use [lineage](/t/data-lineage) to group them and find the root cause.

Anomaly detection complements explicit [data tests](/t/data-tests): tests catch the rules you thought of, detection catches the changes you did not. Neither proves the data is correct, so reconcile against a source when accuracy matters.
