---
title: "Scheduled Jobs"
summary: "Tasks that run on a schedule, like nightly cleanups."
levels: { backend: junior, data-engineer: junior }
aliases: ["cron job", "cron"]
prereqs: ["backend"]
related: ["background-job", "idempotence", "request-lifecycle", "backend"]
also: [messaging]
---

A scheduled job is a task that runs at set times without anyone making a request. Typical examples are a nightly cleanup, a daily report or a periodic refresh of a cache. Cron is the classic way to define a schedule:

```
# minute  hour  day-of-month  month  day-of-week  command
0         2     *             *      *            /usr/bin/python3 /app/cleanup.py
```

That line runs the cleanup every day at 02:00. Cron typically uses the server's own time zone, so check it before you rely on a time.

Three things go wrong with scheduled jobs:

- **Overlap.** If one run takes longer than the interval, a second copy can start while the first is still running. Guard against this with a lock or an "already running" check.
- **Duplicates.** If two servers both run the same schedule, the job runs twice. Make the job [idempotent](/t/idempotence), so running it again gives the same result instead of doubling the effect.
- **Daylight saving.** When clocks change, a local time can be skipped or repeated, so a job set for 02:30 may not run, or may run twice.

The classic mistake is assuming the job runs exactly once, at exactly the time you set. Design for the job failing, running late or running twice. For data pipelines the same rules apply, and an orchestrator is often used to manage the order between jobs. See [message queues](/t/message-queue) for work that should happen in response to events rather than on a clock.
