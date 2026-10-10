---
title: "Poison Message"
summary: "A message that crashes every consumer that tries to process it."
levels: { backend: senior, data-engineer: senior }
aliases: ["poison message", "poison pill", "poison messages"]
prereqs: ["dead-letter-queue", "message-acknowledgement"]
related: ["dead-letter-queue", "visibility-timeout", "message-acknowledgement"]
---

A **poison message** is a message that can never be processed successfully — it's malformed, references missing data, or triggers a bug — so it fails every time. Left unchecked, a poison message either blocks the queue (if the consumer stops on error) or loops forever being redelivered, wasting resources and delaying everything behind it.

```text
consume → crash/fail → redeliver → crash/fail → redeliver → ...
                (nothing gets past it)
```

It's a normal occurrence in any queue: some message will eventually hit a bug or bad data. The design question isn't how to prevent all poison messages but how to **quarantine** them so the queue keeps flowing.

The classic mistakes:

- Retrying forever. A message that always fails will loop indefinitely, consuming worker time and never succeeding. Bound the retries (see [visibility timeout](/t/visibility-timeout)).
- No dead-letter queue. Without a place to send repeatedly-failing messages, they either loop or are dropped. A [dead-letter queue](/t/dead-letter-queue) isolates poison messages for inspection and manual replay.
- Stopping the whole consumer on error. One bad message shouldn't halt processing of the good ones behind it. Fail the message (nack/dead-letter) and continue.
- Silent drops. Discarding a poison message without a trace hides a real bug (and potentially data loss); route it somewhere visible.
- No alerting. A growing dead-letter queue or a rising failure rate is a signal — a bug, a schema mismatch, a dependency down. Alert on it rather than discovering it later.
- Assuming it's the message's fault. Often a poison message is actually an application bug triggered by an edge case; investigate the message to find and fix the root cause, and add a regression test.

**How to handle it:** bound retries, route repeatedly-failing messages to a dead-letter queue, keep the consumer processing good messages, alert on failures, and investigate the quarantined messages to fix the cause. It's a standard reliability concern in any production queue — designing for it is what keeps one bad message from stalling the system. See [dead-letter queue](/t/dead-letter-queue).
