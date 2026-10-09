---
title: "Cron"
summary: "Scheduling commands to run at fixed times."
levels: { backend: junior, data-engineer: junior }
aliases: ["crontab", "cron job", "cron expression", "scheduled task"]
prereqs: ["shell", "terminal"]
related: ["scheduled-jobs", "scheduling-pipelines", "timezone", "background-job", "exit-code"]
---

Cron is the classic Unix scheduler. It runs commands automatically at fixed times or intervals. You list jobs in a file called a crontab.

```sh
crontab -e          # edit your jobs
crontab -l          # list them
```

```
# minute  hour  day-of-month  month  day-of-week  command
  30      2     *             *      *            /usr/local/bin/backup.sh
  */15    *     *             *      *            /usr/bin/python3 /srv/app/poll.py
  0       9     *             *      1-5          /srv/app/report.sh
```

The five fields are minute (0-59), hour (0-23), day of month (1-31), month (1-12) and day of week (0-7, where 0 and 7 are Sunday). `*` means every, `*/15` means every 15, `1-5` is a range, and `1,15` is a list.

| Expression | Meaning |
|---|---|
| `0 * * * *` | every hour, on the hour |
| `30 2 * * *` | every day at 02:30 |
| `0 9 * * 1` | Mondays at 09:00 |
| `*/5 * * * *` | every five minutes |

## Things that go wrong

- **Different environment.** Cron runs with a minimal `PATH` and no shell profile, so commands that work in your terminal "aren't found". Use full paths and set variables in the script ([PATH](/t/path-variable)).
- **Silent failures.** Output is mailed or discarded. Redirect to a log: `... >> /var/log/job.log 2>&1`, and check the [exit code](/t/exit-code).
- **Time zones.** Cron uses the server's zone, and daylight saving can skip or repeat a run. Prefer UTC for servers ([time zones](/t/timezone)).
- **Overlapping runs** if a job takes longer than its interval. Use a lock, or `flock`.
- **Not idempotent.** A job that runs twice (or is retried) shouldn't double-send emails ([idempotence](/t/idempotence)).
- **Single machine.** If that server is down or there are several, jobs are missed or duplicated.
- **No dependencies, retries or monitoring.** Fine for simple tasks.

For application-level scheduling, see [scheduled jobs](/t/scheduled-jobs). Data pipelines use orchestrators that also take cron-style schedules ([pipeline scheduling](/t/scheduling-pipelines)).
