---
title: "Long-Running Operations"
summary: "Returning 202 Accepted and a status URL for slow work."
levels: { backend: senior, frontend: senior }
aliases: ["long-running operations", "async api operations", "202 accepted"]
prereqs: ["api-contract", "job-queue"]
related: ["webhooks", "idempotency-key", "worker", "bulk-endpoints"]
---

A **long-running operation** is work that takes too long to finish inside a single request — a report generation, a bulk import, a data export. Holding the HTTP connection open for minutes is fragile: proxies time out, clients give up, and the work may be lost. The standard pattern is to accept the request, return immediately, and let the client find out later.

```text
POST /reports        → 202 Accepted  { "operationId": "op_123", "status": "pending" }
GET  /operations/op_123 → { "status": "running" | "succeeded" | "failed", "result": ... }
```

The flow: the endpoint validates the request, enqueues a [job](/t/job-queue), and returns `202 Accepted` with an operation id and a status URL. A [worker](/t/worker) does the work; the client polls the status endpoint or receives a [webhook](/t/webhooks) when it completes. Optionally, the endpoint can be made idempotent with an [idempotency key](/t/idempotency-key) so a retry doesn't start a duplicate job.

The classic mistakes:

- Holding the request open. A synchronous endpoint that runs for minutes gets killed by timeouts or the user navigating away, and the work is half-done. Return early and work asynchronously.
- No way to check progress. A `202` with no status endpoint leaves the client in the dark. Always provide one (or a webhook).
- Losing the operation on restart. If the job only lives in memory, a restart drops it. Persist the job state (queue + status record).
- No idempotency. Retrying the start request can launch duplicate jobs (double emails, double imports). Accept an idempotency key.
- Unbounded result. The result of the operation might be huge; don't return it all inline — store it and hand back a download link.
- Polling too aggressively. Clients hammering the status endpoint create load. Recommend sensible intervals or push via webhook.

**How to design it:** accept → validate → enqueue → `202` + status URL → do work → expose result. Make the start idempotent, persist state, and prefer push (webhook) or a modest poll. It turns "the request must finish now" into "the work will finish, and here's how you'll know" — robust under timeouts and restarts. See the [API contract](/t/api-contract).
