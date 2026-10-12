---
title: "Synchronous vs Asynchronous APIs"
summary: "Returning the result in the response vs accepting work and reporting later."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["sync vs async api", "synchronous api", "asynchronous api"]
prereqs: ["http", "job-queue"]
related: ["long-running-operations", "webhooks", "polling"]
---

A **synchronous API** answers in the same request: ask, wait, receive. An **asynchronous API** splits the work: the request is *accepted* (`202`), the work happens later, and the result arrives via polling, webhook, or stream. The choice is about how long the work takes versus how long a request may reasonably live.

```text
sync:   POST /resize → (8s) → 200 + image
async:  POST /resize → 202 + job id → GET /jobs/42 → done → fetch result
```

Synchronous wins for fast operations — simpler for everyone, no state to track. But requests have lifetimes: client timeouts, proxy limits, server worker occupancy. Work past tens of seconds belongs async, and anything user-facing should stay sync only while it stays fast.

The classic mistakes:

- Slow work in sync endpoints. A 3-minute report in a request ties up client, proxy and server worker, then dies at the first timeout. Enqueue it.
- Async for trivial work. Job IDs, polling and webhooks for a 50ms lookup burden every client for no reason. Keep fast things sync.
- No way to learn the result. A bare `202` with no status endpoint or callback strands the client. Always provide the completion path.
- Polling with no guidance. Clients hammering a status endpoint need a suggested interval (or `Retry-After`); better, offer webhooks so they don't poll at all.
- Forgetting failure delivery. Async work can fail long after acceptance — the client must be able to discover *failure*, not just success.
- Inconsistent sync/async across endpoints. Similar operations behaving differently confuses integrators. Decide by duration and document the boundary.

**The boundary:** milliseconds to a few seconds — synchronous. Tens of seconds and up, or work needing retries and progress — asynchronous with a clear completion path. See [long-running operations](/t/long-running-operations) for the pattern.
