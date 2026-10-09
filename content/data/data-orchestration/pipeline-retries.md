---
title: "Retries and Failure Handling"
summary: "Retrying transient failures and alerting on real ones."
levels: { data-engineer: junior }
aliases: ["retries", "failure handling in pipelines", "task retries", "retry policy", "pipeline failure alerts"]
prereqs: ["pipeline-dag", "idempotent-pipeline"]
related: ["retry-with-backoff", "idempotent-pipeline", "data-incident", "alerting", "debugging-failed-pipeline", "circuit-breaker-data"]
core: [data-engineer]
---

Pipelines fail. Networks hiccup, a source API returns a `503`, a warehouse is briefly overloaded, a cloud worker is reclaimed mid-task. Good
failure handling separates problems that **fix themselves if you try again** from problems that **need a person**.

| Failure | Example | What to do |
|---|---|---|
| **Transient** | Timeout, rate limit, brief outage | **Retry** automatically |
| **Permanent** | Bug in the code, missing permission, a column that no longer exists | Don't retry endlessly. **Alert** and fix |
| **Data problem** | Source delivered garbage or nothing | Stop downstream tasks, **quarantine**, alert |

```python
# Airflow-style task settings
default_args = {
    "retries": 3,
    "retry_delay": timedelta(minutes=5),
    "retry_exponential_backoff": True,     # wait longer after each failure
    "execution_timeout": timedelta(hours=1),
}
```

## Rules

- **Retries require idempotency.** If a task half-finishes and runs again, the result must be the same as one clean run, with no
  duplicate rows ([idempotent pipelines](/t/idempotent-pipeline)). Otherwise retries make things worse.
- **Limit retries and use backoff**, as with any retry ([retry with backoff](/t/retry-with-backoff)). Hammering a struggling source
  doesn't help it recover.
- **Set timeouts** so a hung task fails and can retry, instead of blocking forever.
- **Alert on final failure**, not on every retry (that creates noise, see [alerting](/t/alerting)). Include what failed, which run
  and a link to the logs.
- **Alert on missing runs and staleness** too: no failure message because nothing ran is still a failure
  ([data freshness](/t/data-freshness)).
- **Don't retry what can't succeed**: an authentication error or an invalid query won't fix itself.
- **Stop downstream work** when upstream failed or data checks failed, so you don't publish wrong numbers
  ([circuit breaker for data](/t/circuit-breaker-data)).
- **Partial failures**: make sure a failed run can be resumed or fully redone without leftover half-written output
  (write to a temporary location, then swap in).

## When a person gets involved

Failures that survive retries need a person: look at logs, find the cause and rerun
([debugging a failed pipeline](/t/debugging-failed-pipeline)). Keep a runbook for the common ones.

The goal isn't "never fail"; it's "fail loudly, safely and recoverably".
