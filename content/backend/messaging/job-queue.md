---
title: "Job Queue"
summary: "A queue of background tasks with workers, like Sidekiq, Celery or BullMQ."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["job queue", "job queues", "background queue"]
prereqs: ["worker", "message-queue"]
related: ["worker", "message-queue", "cron", "dead-letter-queue"]
---

A **job queue** holds units of background work for [workers](/t/worker) to process, separating "accept the work now" from "do the work now". A web request enqueues a job (send an email, resize an image, run a report) and returns immediately; a worker picks up the job and processes it, retrying on failure.

```text
request → enqueue job → respond fast
worker → dequeue job → process → ack
```

Why it matters: it keeps request handling fast (no long work inline), smooths bursts (jobs wait in the queue rather than blocking users), and makes work retryable and observable. Background work is a normal part of almost any application.

The classic mistakes:

- Doing long work in the request. Sending an email, calling a slow API or generating a report inline makes users wait and ties up workers. Enqueue it.
- No retries or dead-lettering. A job that fails silently loses the work. Retry transient failures and route repeated failures to a [dead-letter queue](/t/dead-letter-queue) for inspection.
- Non-idempotent jobs. Retries mean a job can run twice; make handlers idempotent or guard them, or you double-send (see [idempotence](/t/idempotence)).
- Letting the queue grow unbounded. A backlog means workers can't keep up; it must be visible and bounded (see [queue depth](/t/queue-depth) and [backpressure](/t/backpressure)).
- Worker sizing wrong. Too few workers and the queue backs up; too many and they thrash or overwhelm the database. Size to the workload and downstream capacity.
- Losing jobs on crash. In-memory queues lose work on restart; use a durable queue for jobs that matter.
- Confusing it with cron. A job queue processes enqueued work whenever it arrives; [cron](/t/cron) runs on a time schedule. Most systems need both.

**When to use it:** for almost any asynchronous work — emails, notifications, image/video processing, third-party calls, reports, imports. It's the backbone of "respond fast, work in the background", and it makes work reliable (retries) and scalable (more workers). See [worker](/t/worker) and [producer-consumer](/t/producer-consumer).
