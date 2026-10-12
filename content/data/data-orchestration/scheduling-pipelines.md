---
title: "Pipeline Scheduling"
summary: "Running pipelines on a time schedule or when upstream data arrives."
levels: { data-engineer: junior , data-analyst: mid-level , data-scientist: junior }
aliases: ["pipeline scheduling", "cron for pipelines", "scheduled runs", "schedule interval", "triggering pipelines"]
prereqs: ["pipeline-dag"]
related: ["data-aware-scheduling", "sensors", "catchup-reruns", "partitioned-runs", "scheduled-jobs", "timezone"]
core: [data-engineer]
---

Pipelines run either **on a time schedule** ("every day at 02:00") or **when something happens** (a file arrives, an upstream table updates).

## Time-based schedules

Most orchestrators accept **cron expressions**:

```
0 2 * * *     every day at 02:00
*/15 * * * *  every 15 minutes
0 6 * * 1     Mondays at 06:00
```

(Fields: minute, hour, day of month, month, day of week.)

## The idea people trip over: data interval vs run time

A daily run at 02:00 on June 2nd usually processes **June 1st's data**. In some orchestrators (Airflow is the well-known example), a run
is triggered at the **end** of the interval it covers. So it's important to separate:

- **Logical date / data interval**: *which* data this run is responsible for (June 1st).
- **Actual start time**: when it really ran (June 2nd, 02:00).

Use the logical date inside your job, not "now", so that reruns and [backfills](/t/backfill) process the right day
([partitioned runs](/t/partitioned-runs)).

## Event-based and data-aware triggers

Instead of guessing a time, wait for the thing you depend on:

- **Sensors** that poll for a file or a table update ([sensors](/t/sensors)).
- **Data-aware scheduling**: run when upstream datasets have been updated ([data-aware scheduling](/t/data-aware-scheduling)).
- A message or API call that starts the run.

This avoids the fragile pattern "the upstream job usually finishes by 01:30, so run at 02:00", which breaks the first time it runs late
and your job processes incomplete data.

## Practical guidance

- **Schedule in UTC** and avoid daylight-saving surprises ([time zones](/t/timezone)).
- **Don't pile everything at midnight.** Spread schedules out so you don't create a thundering herd on sources and the warehouse.
- **Avoid overlapping runs** of the same pipeline unless it's designed for it. Set limits on concurrent runs.
- **Decide what happens to missed runs** after downtime: skip them or catch up ([catch-up and reruns](/t/catchup-reruns)).
- **Set deadlines.** If the report must be ready by 08:00, alert when it isn't, instead of discovering it at 09:00
  ([data freshness](/t/data-freshness)).
- Give every schedule an **owner**, so that someone is responsible when it fails.

Application-side scheduled work follows similar rules ([scheduled jobs](/t/scheduled-jobs)).
