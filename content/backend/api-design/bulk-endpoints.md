---
title: "Bulk Operations"
summary: "Endpoints that act on many items in one request."
levels: { backend: senior, frontend: senior , data-analyst: mid-level }
aliases: ["bulk operations", "batch api", "bulk endpoints"]
prereqs: ["api-contract", "pagination"]
related: ["rate-limiting", "idempotence", "unbounded-result-sets"]
---

A **bulk endpoint** handles many items in a single request — create 500 users, update a batch of records, delete a selection. It exists because per-item requests are expensive: every call pays network latency, and a loop of thousands of requests is slow, chatty and hammers [rate limits](/t/rate-limiting).

```text
POST /users/bulk   { "users": [ ...500 items... ] }
```

The design questions are the hard part:

- All-or-nothing or partial? Some operations should be transactional (all succeed or none); others should report **partial success** per item, so one bad row doesn't fail the batch.
- How big? Cap the batch size. An uncapped bulk endpoint is an [unbounded result set](/t/unbounded-result-sets) in reverse — a huge write that can lock tables or exhaust memory.
- What's returned? For partial success you must return per-item results (which succeeded, which failed and why), not just a single status.

The classic mistakes:

- No size limit. A client can send a million items, and one request takes down the database. Enforce a maximum and reject larger batches.
- Ambiguous success semantics. Returning `200` for a batch where half failed is misleading. Use a clear contract: all-or-nothing with a rollback, or `207`-style per-item results.
- No idempotency. Retrying a bulk create after a timeout can duplicate everything. Support an [idempotency key](/t/idempotency-key) on bulk requests.
- Holding the request open too long. A batch big enough to take minutes should be asynchronous (see [long-running operations](/t/long-running-operations)), returning an operation id.
- Ignoring partial failure handling in clients. If the API supports partial success, clients must look at each result; documenting this is part of the [contract](/t/api-contract).
- Using bulk to avoid fixing a bad pattern. Sometimes the real fix is a proper async job or a better data model, not a bigger request.

**How to design one:** bound the size, decide and document all-or-nothing vs partial, return per-item results, make retries idempotent, and move genuinely large work to an async operation. Bulk is a tool for reducing chatty round trips — not a license to make one request do unbounded work.
