---
title: "Worker"
summary: "A process that pulls jobs from a queue and runs them."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["worker", "worker process", "queue worker"]
prereqs: ["job-queue", "producer-consumer"]
related: ["job-queue", "thread-pool", "graceful-shutdown", "producer-consumer"]
---

A **worker** is a process (or thread) that consumes work from a [job queue](/t/job-queue) or message queue and processes it: sending emails, processing images, running reports, syncing data. Workers run separately from the web/API processes, so heavy or slow work doesn't block requests.

```text
API → enqueue job → [queue] → worker → process job → ack
```

Workers are usually **stateless** and **horizontally scalable**: you run more of them to handle more volume, and any worker can take any job (for a work queue). They should start fast, process a job, ack it, and repeat.

The classic mistakes:

- Non-idempotent jobs. Messages can be redelivered (retries, visibility timeouts), so a worker may run the same job twice; handlers must be safe to repeat (see [idempotence](/t/idempotence)).
- Holding state in the worker. A worker that accumulates state breaks when scaled or restarted; keep state in the database/cache, not the process.
- No graceful shutdown. A worker killed mid-job loses it (or duplicates it on redelivery). Handle SIGTERM: stop taking new jobs, finish the current one, then exit (see [graceful shutdown](/t/graceful-shutdown)).
- Wrong worker count. Too few and the queue backs up; too many and they overwhelm the database or a downstream service. Size (and cap) workers to the real bottleneck (see [queue depth](/t/queue-depth)).
- No retries or dead-lettering. A failed job must be retried a bounded number of times, then routed to a [dead-letter queue](/t/dead-letter-queue); otherwise it's lost or loops forever.
- Blocking on slow dependencies. A worker tied up on a slow external call processes fewer jobs; set timeouts and consider concurrency within the worker.
- No observability. Without logs/metrics per job and per queue, a silent backlog or a failing job type goes unnoticed. Monitor processing rate and failures.

**How to run them:** keep workers stateless and idempotent, handle graceful shutdown, scale them to the bottleneck (not past it), bound retries with dead-lettering, and monitor queue depth and job outcomes. They're the "do the work" side of [producer-consumer](/t/producer-consumer) — the component that turns a queue of jobs into completed work reliably. See [thread pool](/t/thread-pool) for concurrency within a worker.
