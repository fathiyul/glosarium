---
title: "Functions as a Service (Lambda)"
summary: "Running code in response to events without servers."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["serverless functions", "lambda", "function as a service"]
prereqs: ["cloud-computing", "event-driven-architecture"]
related: ["event", "managed-queues", "autoscaling", "paas-platforms", "cloud-providers"]
---

**Functions as a service (FaaS)** runs your code in response to events, without you managing any server. You upload a function; the provider starts it when something happens, scales it with demand, and stops charging when it's idle. Examples include AWS Lambda, Google Cloud Functions and Azure Functions.

Typical **triggers**:

- an HTTP request through an [API gateway](/t/api-gateway);
- a message arriving on a [managed queue](/t/managed-queues) or topic;
- a file landing in [object storage](/t/object-storage);
- a schedule.

Because every invocation is isolated, FaaS scales from zero to thousands of concurrent runs without capacity planning. That's the appeal: no servers to patch, and you pay per run rather than per hour.

Frontend engineers meet FaaS for backend-for-frontend glue and webhooks; data engineers use it for event-driven [ETL](/t/etl) and small transforms; backend engineers for APIs and scheduled jobs that don't justify a service.

The classic mistakes:

- Treating it like a general server. Functions are meant to be short-lived. Long-running work, large in-memory state, or persistent connections fit badly; use a container or [compute instance](/t/compute-instance) for those.
- Ignoring cold starts. An idle function takes longer on its first call while the runtime spins up. For latency-sensitive paths, keep functions warm or accept the spike.
- Assuming exactly-once delivery. Event sources often retry, so a function can run more than once with the same event. Make handlers idempotent where it matters.

The trade-off is control. You can't tune the runtime, and heavy reliance on one provider's triggers and permissions makes moving harder. For steady, high-volume traffic, a container on [container orchestration](/t/container-orchestration) may be cheaper and simpler than millions of tiny runs.
