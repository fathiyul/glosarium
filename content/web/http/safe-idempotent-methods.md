---
title: "Safe and Idempotent Methods"
summary: "Which HTTP methods shouldn't change state, and which can be retried safely."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["safe methods", "idempotent methods", "http method semantics"]
prereqs: ["http", "rest"]
related: ["rest-constraints", "conditional-request", "idempotency-key"]
---

HTTP methods carry promises. **Safe** methods change nothing (GET, HEAD, OPTIONS) — clients, crawlers and prefetchers assume they can call them freely. **Idempotent** methods can be repeated with the same effect (GET, PUT, DELETE, plus safe ones): retrying is harmless because re-applying changes nothing further. POST promises neither, which is why retries and double-clicks are dangerous with it.

```text
GET /items      safe + idempotent   (read; repeat freely)
PUT /items/1    idempotent          (full replace; retry safe)
DELETE /items/1 idempotent          (repeat: still gone)
POST /orders    neither             (retry may create twice → use idempotency key)
```

These semantics drive real machinery: browsers prefetch safe methods, caches only store safe ones, and infrastructure retries idempotent ones. Mislabelled methods break all of it.

The classic mistakes:

- GETs with side effects. A `GET /delete?id=1` fires from crawlers, prefetchers and link previews — deleting things you never meant to. Side effects need POST/PUT/DELETE.
- POST for everything. A JSON-RPC-over-POST API forfeits caching, safe retries and semantic routing. Use the method that matches the operation.
- Assuming DELETE is "undo." Idempotent means repeat-safe, not reversible — deleting twice is fine, undeleting isn't promised.
- PUT vs PATCH confusion. PUT replaces the whole resource (idempotent by construction); PATCH applies a partial change (idempotent only if designed so). Choose deliberately.
- Retrying POST blindly. Timeouts on POST may have executed server-side; retry only with an [idempotency key](/t/idempotency-key).
- Ignoring it in API design. Clients and gateways rely on these contracts for caching, prefetch and retry policy. Honour them and the ecosystem works with you.

**Design with the promises:** reads as GET, full replacements as PUT, removals as DELETE, actions as POST — and make POST safe to retry with idempotency keys. The method is part of the contract, not decoration.
