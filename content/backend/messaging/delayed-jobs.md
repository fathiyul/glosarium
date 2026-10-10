---
title: "Delayed Jobs"
summary: "Jobs scheduled to run at a later time."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["delayed jobs", "delayed job", "scheduled once"]
prereqs: ["job-queue", "message-queue"]
related: ["scheduled-jobs", "cron", "job-queue"]
---

A **delayed job** is work that should run *once*, at some future time: send a reminder in 24 hours, retry a failed payment in an hour, expire a trial at the end of the week. It's a one-off schedule, distinct from a recurring [cron](/t/cron) job.

```text
enqueue job with run_at = now + 24h → becomes visible to workers at run_at
```

Most job queues support this directly (a "delay" or "scheduled time" on the enqueue), or via a separate delay/delay-queue mechanism. The queue holds the job until the time arrives, then a worker picks it up.

The classic mistakes:

- Confusing delayed jobs with cron. A delayed job runs *once* at a chosen time; a cron job runs *repeatedly* on a schedule. Reminders are delayed jobs; nightly reports are cron. Using the wrong one leads to either repeats you didn't want or one-shot jobs that never fire again.
- Relying on the delay for exact-time guarantees. Queue delays are approximate, and a delay is a *lower bound* — the job runs at or after the time, depending on worker availability. Don't build "exactly at 00:00:00" expectations on it.
- Losing the job on restart. A delay held only in memory vanishes on a crash. Use a durable queue for anything important.
- Forgetting idempotency and dedupe. If the same delayed job is enqueued twice (a retry, a double click), you get two runs. Use an idempotency key so duplicates collapse (see [idempotence](/t/idempotence)).
- Unbounded accumulation. Millions of delayed jobs scheduled far in the future grow the queue; plan retention and capacity.
- Cancelling nothing. Users cancel a reminder but the job still runs. Store a job id and check cancellation before acting, or make the action safe to skip.
- Long delays in a volatile store. A delay of weeks in a cache that might be flushed is fragile; use a durable scheduler or a database-backed queue.

**When to use it:** for one-off, time-delayed work — reminders, retries with a delay, timed expiries, follow-ups. It's a natural feature of a [job queue](/t/job-queue); pick it when the work happens once, and pick [scheduled/recurring jobs](/t/scheduled-jobs) when it happens repeatedly. See [job queue](/t/job-queue) and [cron](/t/cron).
