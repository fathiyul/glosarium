---
title: "Using the Database as a Queue"
summary: "Job queues in SQL with SKIP LOCKED, and when that's enough."
levels: { backend: senior, data-engineer: senior }
aliases: ["database as a queue", "db queue", "queue table"]
prereqs: ["job-queue", "transaction"]
related: ["message-queue", "message-broker", "pessimistic-locking"]
---

You can build a queue without a dedicated message broker: a table of jobs where workers claim rows, process them, and mark them done. It's a common, pragmatic choice — you already have a database, transactions, and no extra infrastructure.

The modern pattern uses `SELECT ... FOR UPDATE SKIP LOCKED` to let many workers claim different jobs without stepping on each other:

```sql
SELECT id, payload FROM jobs
WHERE status = 'pending'
ORDER BY created_at
FOR UPDATE SKIP LOCKED
LIMIT 1;
-- then UPDATE status = 'processing', and later 'done'
```

`SKIP LOCKED` means a worker skips rows another worker already locked, so workers don't block each other. Combined with a transaction, claiming a job is atomic.

The classic mistakes:

- **Two workers processing the same job**. Without `FOR UPDATE SKIP LOCKED` (or equivalent), two workers can select the same pending row. The lock-and-skip is what makes it safe.
- No visibility into stuck jobs. A worker that crashes mid-job leaves a row `processing` forever. Use a lease/heartbeat (a `locked_until` timestamp) and requeue expired jobs.
- The job and its side effects not atomic. Common and correct pattern: in one transaction, claim the job *and* write its result, so a crash doesn't leave the job marked done but the effect missing (or vice versa).
- Polling too hard. A tight poll loop hammers the database. Poll on an interval, or use `LISTEN`/`NOTIFY`-style wakeups where available.
- Scaling past the database's comfort. A high-throughput queue in a relational table adds write load, bloat (see [VACUUM](/t/vacuum)), and lock contention. Past a point, a dedicated broker scales better.
- Forgetting ordering and priorities. A database queue can do priority/ordering, but it's up to you; brokers offer these as features.
- Reimplementing a broker badly. Retries, dead-lettering, delayed jobs, fan-out — brokers provide these; doing them by hand in SQL is work and easy to get subtly wrong.

**When to use it:** for modest volumes and when you want one less system to run — background jobs, email sends, small pipelines, especially early in a product's life. It's transactional with your data, which is a real advantage. Graduate to a dedicated [message queue](/t/message-queue) or [broker](/t/message-broker) when throughput, fan-out, delayed messages or delivery guarantees outgrow what a table handles well. See [job queue](/t/job-queue).
