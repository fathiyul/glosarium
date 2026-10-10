---
title: "Workflow Engine"
summary: "Durable orchestration of long multi-step processes, like Temporal."
levels: { backend: senior, data-engineer: senior }
aliases: ["workflow engine", "workflow orchestration", "durable workflow"]
prereqs: ["saga-pattern", "message-broker"]
related: ["saga-pattern", "job-queue", "idempotence", "distributed-transaction"]
---

A **workflow engine** runs long-running, multi-step processes — "onboard a customer", "process a refund", "fulfil an order" — as an explicit, **durable state machine**. Each step can call a service, wait for an event, or branch, and the engine persists where the process is, retries failed steps, enforces timeouts, and resumes after a crash.

```text
[start] → charge card → reserve stock → (wait for shipment event)
        → send confirmation → [done]
       any step fails → compensate earlier steps
```

It brings structure to workflows that would otherwise be spread across queues, timers and ad-hoc database flags. The engine handles the hard parts: durability (the workflow survives restarts), retries with backoff, timeouts, and visibility into in-flight instances.

It's closely related to the [saga](/t/saga-pattern) pattern (workflows with compensating actions) and often used to implement one. Examples include orchestration services and "durable execution" libraries.

The classic mistakes:

- Putting business logic in the wrong place. The engine orchestrates; the actual work should live in services or activities it calls. Mixing heavy logic into workflow definitions makes them hard to test and change.
- Non-idempotent steps. Workflow steps get retried; each must be safe to run more than once (see [idempotence](/t/idempotence)). The engine retries, so your steps must tolerate it.
- Ignoring determinism requirements. Some engines require the workflow *definition* to be deterministic (it replays history); calling `now()` or random directly in the definition breaks replay. Use the engine's facilities for time/randomness.
- Forgetting compensation. A failure midway needs to undo prior steps (refund, release stock); without compensations you leave inconsistent state (see [saga](/t/saga-pattern)).
- Unbounded/long waits. A workflow that can wait indefinitely for an external event needs timeouts, or instances pile up forever.
- Operational blind spots. In-flight workflows, stuck instances and failures need monitoring and a way to retry or cancel manually.
- Reaching for it too soon. A simple two-step process may not need a workflow engine; a [job queue](/t/job-queue) or a database flag suffices. The engine earns its place with genuinely multi-step, long-lived, fault-prone processes.

**When to use it:** for complex, long-running, multi-service processes where durability, retries, timeouts and compensation are essential — clearly better than hand-rolling state across queues and flags. For short, simple asynchronous work, a job queue is lighter. It's the orchestration layer that makes [sagas](/t/saga-pattern) and multi-step [distributed transactions](/t/distributed-transaction) manageable in practice.
