---
title: "Data Downtime"
summary: "Periods when data is missing, late or wrong."
levels: { data-engineer: mid-level , data-analyst: mid-level }
aliases: ["data outage", "data reliability downtime", "silent data failure", "data unavailability"]
prereqs: ["data-incident", "data-observability"]
related: ["data-observability", "data-freshness", "data-sla", "data-tests", "data-on-call", "data-anomaly-detection"]
---

Data downtime is the time during which data is missing, late or wrong, so people cannot trust or use it. It is the data equivalent of a service outage, with one difference: it is usually **quiet**. A dashboard still loads and still shows numbers, so nobody realises the numbers are a day old or half-complete.

A data incident is the event; data downtime is how long and how widely it hurt. Teams often measure it as a combination of how long the problem lasted, how much data was affected, and how many consumers noticed, which is why the same bug in a rarely used table counts for far less than one in the revenue report.

The classic example: an overnight job fails to load new orders, but the pipeline reports success and the dashboard simply keeps yesterday's totals. Nobody notices for a week. Decisions were made on stale numbers the whole time.

## Reducing it

- Detect faster. Freshness, volume and quality checks, plus [anomaly detection](/t/data-anomaly-detection), catch silent breakage before a person does ([data observability](/t/data-observability), [data tests](/t/data-tests)).
- Respond faster. Named [owners](/t/data-ownership) and [data on-call](/t/data-on-call) with [runbooks](/t/runbook) shorten the time from alert to fix.
- Contain it. Stop bad data reaching consumers ([data circuit breaker](/t/circuit-breaker-data)) and communicate early ([data incident](/t/data-incident)).
- Recover cleanly. [Idempotent pipelines](/t/idempotent-pipeline) make reruns and backfills safe.
- Measure it. Track mean time to detect and mean time to resolve, and review each incident.

## Trade-off

Not all data deserves the same protection. A finance table feeding regulatory reports needs tight monitoring and on-call; a sandbox table does not. Tier datasets by who uses them and what happens if they are wrong, and spend your monitoring budget accordingly. Over-investing everywhere produces alerts nobody reads; under-investing in the critical few produces the week-long silent outage above.
