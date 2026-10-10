---
title: "Context Propagation"
summary: "Carrying request IDs, deadlines and trace context across threads and services."
levels: { backend: senior, frontend: senior }
aliases: ["context propagation", "trace context propagation", "propagating context"]
prereqs: ["correlation-id", "distributed-tracing"]
related: ["request-context", "span", "observability", "logging"]
---

**Context propagation** is carrying request-scoped information — the trace ID, the current [span](/t/span), the authenticated user, a deadline — across every boundary a request crosses: from service to service, from synchronous code to a background job, from one async task to another. Without it, a request becomes a set of disconnected fragments, and you can't follow it or correlate its logs.

The hard part is that context doesn't travel on its own. When you make an HTTP call, publish a message or hand work to a queue, the receiving side starts fresh. You have to put the context *into* the request — typically trace headers on the outgoing call — and read it *out* on the other side.

```text
service A: span ctx in headers (trace-id, span-id) ──▶ service B
service B: reads headers, continues the same trace
async task: context captured when the task is created and restored when it runs
```

The classic mistakes:

- Not propagating trace headers. If the outgoing HTTP client doesn't forward the trace context, the downstream service starts a new trace, and the request's story breaks at that hop. Use instrumented clients that do it automatically.
- Losing context on async hops. A background task or a thread pool worker created inside a request doesn't inherit the context unless you capture it at creation and restore it when the work runs. This is where traces most often fragment.
- Leaking context between requests. With implicit context (async-local/thread-local), a task that outlives its request, or shared storage, can bleed one request's context into another. Scope it tightly and clear it.
- Propagating sensitive data. The trace context should be identifiers, not the user's token or personal data. Keep it minimal.
- Relying on a library without checking. Verify that traces actually stitch together end to end; a single uninstrumented hop breaks the chain.

**Why it matters:** [distributed tracing](/t/distributed-tracing) and coherent logging depend entirely on propagation. Every hop that drops the context is a blind spot in an incident. Make propagation automatic where you can (instrumented HTTP/queue clients), and handle async boundaries deliberately — it's the difference between one trace and unrelated fragments.
