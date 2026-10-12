---
title: "Data On-Call"
summary: "Being responsible for pipeline failures and late data."
levels: { data-engineer: mid-level , data-scientist: mid-level }
aliases: ["data on call", "pipeline on-call", "on-call for data", "data engineer on-call"]
prereqs: ["on-call", "data-observability"]
related: ["data-incident", "alerting", "runbook", "data-sla", "debugging-failed-pipeline", "data-downtime"]
---

Data on-call is being the person responsible for the data pipelines when they fail or run late: broken tasks, missing partitions, data that arrives hours after it should, or numbers that look wrong. It is the data version of [on-call](/t/on-call) for software services.

The classic mistake is **alerting on everything**. If every task failure pages someone, the rotation learns to ignore pages, and a real outage gets lost in the noise. A flaky source that retries and succeeds is not an incident. Alerts should fire on things a person must act on now: data that has not arrived by its promised time, a table that failed its tests, or a downstream dashboard reading stale values.

## How data on-call differs from software on-call

- Failure is often **silent**. A service that is down is obvious; a pipeline that loads yesterday's numbers unchanged may page no one while a decision is made on wrong data. Watch [freshness, volume and schema](/t/data-observability), not just job success.
- "Late" is a first-class failure. Many issues are about timeliness against a [data SLA](/t/data-sla), not a crash ([data downtime](/t/data-downtime)).
- You often reprocess rather than roll back. Fixing the cause and rerunning the affected partitions is normal ([reprocessing history](/t/reprocessing-history)).
- The cause may be upstream. A schema change in a source system, or a partner's API, can break you through no fault of your own.

## Making it humane and useful

- Alert on symptoms that matter. Tie alerts to consumer promises and severity, and route non-urgent ones to a queue ([alerting](/t/alerting)).
- Write [runbooks](/t/runbook). The first five minutes of [debugging a failed pipeline](/t/debugging-failed-pipeline) should not require the original author.
- Retry transient failures automatically. Distinguish retryable errors from real ones ([pipeline retries](/t/pipeline-retries)).
- Have clear ownership and escalation, so it is obvious who fixes a broken source.
- Follow up with [blameless postmortems](/t/blameless-postmortem) and fix causes, not people.

Rotations should be shared across a team, with realistic expectations about out-of-hours coverage. Being paged at 3am for a non-critical report is a sign the alerting needs work, not that the engineer is unlucky.
