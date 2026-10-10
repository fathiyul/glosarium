---
title: "Serverless Functions"
summary: "Running code per request without managing servers."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
also: [cloud]
aliases: ["serverless functions", "functions as a service", "lambda functions"]
prereqs: ["backend", "faas"]
related: ["third-party-integration", "api-gateway", "worker-process-model", "faas"]
---

**Serverless functions** are backend code that runs in short-lived, provider-managed invocations rather than a server you keep running. You deploy a function; the platform starts it on demand when a trigger fires (an HTTP request, a queue message, a schedule), scales it out automatically, and stops billing when idle. It's the backend face of [functions as a service](/t/faas).

The model changes how you write code:

- Stateless by default. A function instance can be reclaimed any time; state belongs in a database, cache or object store, not in memory.
- Event-driven. Each function handles one trigger. Request/response, queue message, file upload, timer — the platform delivers the event.
- Fast startup matters. Cold starts (spinning up a fresh instance) add latency; keeping functions small and warm helps.

The classic mistakes:

- Treating an instance as a server. Assuming memory or local disk persists between invocations leads to lost state. It doesn't (see [ephemeral filesystem](/t/ephemeral-filesystem)).
- Holding connections carelessly. Each instance may open its own database connection; a burst of instances can exhaust the database. Use a pooler or a managed connection layer.
- Ignoring cold starts. A latency-sensitive path can see spikes when instances spin up. Keep the work small, or keep instances warm.
- Long-running work. Functions are meant to be short. Big jobs, streaming and steady high throughput are usually cheaper and simpler on a container or [compute instance](/t/compute-instance).
- No idempotency. Event sources often retry, so a function can run twice for the same event. Make handlers [idempotent](/t/idempotence).

**When to use it:** spiky, event-driven work, glue between services, webhooks and small APIs — where paying per invocation and scaling to zero fits better than running a server. For steady load or long jobs, a container is often the better tool. See [worker and process models](/t/worker-process-model) for the contrast.
