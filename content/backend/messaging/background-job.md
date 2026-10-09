---
title: "Background Job"
summary: "Work done outside the request, like sending an email."
levels: { backend: junior, data-engineer: junior }
aliases: ["background jobs", "async job", "asynchronous job", "task queue", "background task", "worker job"]
prereqs: ["message-queue"]
related: ["job-queue", "worker", "retry-with-backoff", "idempotent-consumer", "dead-letter-queue", "scheduled-jobs", "delayed-jobs"]
core: [backend]
also: [backend-basics]
---

A **background job** is work that runs **outside the web request**, so the user doesn't wait for it. The request puts a job on a queue and
returns right away, and a separate **worker** process picks it up and does it.

```python
@app.post("/signup")
def signup(data):
    user = create_user(data)
    queue.enqueue(send_welcome_email, user.id)   # returns immediately
    return {"id": user.id}, 201                  # user sees the page in milliseconds
```

```python
def send_welcome_email(user_id):     # runs later in a worker process
    user = db.get_user(user_id)
    mailer.send(user.email, "Welcome!")
```

## What it's for

- **Slow tasks**: sending email, generating a PDF, resizing images, calling a slow third-party API.
- **Work that shouldn't block**: exporting a big report, importing a file.
- **Retryable tasks**: if the email service is down, try again in a minute.
- **Smoothing spikes**: a burst of requests becomes a queue the workers drain at their own pace.

Common tools: Celery and RQ (Python), Sidekiq (Ruby), BullMQ (Node.js), or any [message queue](/t/message-queue) with
workers. See [job queues](/t/job-queue) and [workers](/t/worker).

## Rules that prevent trouble

- **Jobs must be idempotent.** Queues usually deliver *at least once*, and retries happen, so running the same job twice
  must be harmless (don't send two welcome emails) ([idempotent consumer](/t/idempotent-consumer)).
- **Pass IDs, not whole objects.** Load fresh data inside the job. The data may have changed by the time it runs,
  and big payloads are awkward.
- **Retry with backoff and a limit.** Then move jobs that keep failing to a [dead-letter queue](/t/dead-letter-queue)
  for a person to look at ([retry with backoff](/t/retry-with-backoff)).
- **Enqueue after the transaction commits**, or the worker may look for a row that isn't visible yet.
- **Monitor** queue length, job age and failure rate. A silent, growing queue is an outage nobody noticed.
- **Tell the user.** If they're waiting on the result, give them a status ("Your report is being prepared").

Jobs that run on a schedule (nightly cleanup) are related, see [scheduled jobs](/t/scheduled-jobs).
