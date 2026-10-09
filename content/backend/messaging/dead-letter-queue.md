---
title: "Dead Letter Queue"
summary: "Where messages go after failing repeatedly."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["DLQ", "dead letter queue", "dead-letter queue", "dead letter topic", "poison queue"]
prereqs: ["message-queue", "at-least-once"]
related: ["poison-message", "retry-with-backoff", "at-least-once", "message-acknowledgement", "message-ttl", "queue-depth"]
core: [backend]
---

A **dead letter queue** (DLQ) is a separate queue where messages go **after they've failed processing too many times** (or expired), so they stop blocking the main queue and can be inspected later.

Without one, a message that always fails (malformed data, a bug on a specific record) gets redelivered forever, wasting capacity and possibly blocking the messages behind it. That's a **poison message** ([poison messages](/t/poison-message)).

```
main queue ─► consumer fails ─► retry 1 ─► retry 2 ─► retry 3 ─► moved to the DLQ
                                                                      │
                                      a person (or a tool) inspects it, fixes the cause, replays it
```

Most brokers and cloud queues support this directly: you configure a maximum delivery count and a DLQ target (and some move expired or rejected messages there too).

## What a DLQ is for

- **Isolation**: bad messages stop interfering with good ones.
- **Evidence**: the failed message is kept, with its payload and metadata (the error, the attempt count), so you can diagnose.
- **Recovery**: after you fix the bug or the data, **redrive** (replay) the messages back to the main queue.
- **Visibility**: a growing DLQ is a clear signal that something's wrong.

## Using it well

- **Retry transient failures first** (with backoff and a limit) so only persistent failures reach the DLQ ([retry with backoff](/t/retry-with-backoff)).
- **Monitor and alert on DLQ depth.** An unwatched DLQ is where data goes to be forgotten. Messages silently lost into it are still lost, just slowly ([queue depth](/t/queue-depth)).
- **Record why** each message failed (the exception, the attempts, the timestamp).
- **Have a runbook**: who looks, how to inspect, how to fix and redrive.
- **Make consumers idempotent**, since replays will deliver messages again ([idempotent consumer](/t/idempotent-consumer)).
- **Keep messages long enough** to investigate (DLQ retention is usually limited).
- **Don't use the DLQ as a normal retry mechanism.** It's for what needs human attention.
- **Mind sensitive data** in stored failed messages.

DLQs work for event streams too, usually as a separate "dead letter topic" that a consumer writes to when it can't process a record.
