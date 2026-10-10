---
title: "Sparse Fieldsets"
summary: "Letting clients choose which fields they receive."
levels: { backend: senior, frontend: senior }
aliases: ["sparse fieldsets", "field selection", "partial responses"]
prereqs: ["api-contract", "pagination"]
related: ["content-negotiation", "backward-compatibility", "etag"]
---

**Sparse fieldsets** let a client ask for only the fields it needs, e.g. `GET /users/42?fields=id,name`. The server returns that subset instead of the full object. It reduces **payload** size and can cut the work of building fields the client will discard — useful for mobile clients over slow networks or lists where only a few attributes are shown.

```text
GET /users?fields=id,name        → [{ "id": 1, "name": "..." }]
GET /orders/42?fields=id,total   → { "id": 42, "total": 19.99 }
```

It's one of a family of query-shaping features — along with [pagination](/t/pagination), filtering and sorting — that let clients tailor responses to their needs without new endpoints.

The classic mistakes:

- Letting clients request anything. Some fields are expensive (a computed value, a joined table) or sensitive (internal IDs, emails). Define an allow-list of selectable fields; don't expose everything.
- Breaking the contract. If a client requests a field you later rename or remove, it breaks — and if the field is mandatory-by-default, so does everyone else. Treat the field set and defaults as part of the [contract](/t/api-contract) (see [backward compatibility](/t/backward-compatibility)).
- A different response shape per request. If `fields=` changes whether nested objects appear, clients face unpredictable shapes. Keep the structure stable; only include/exclude declared fields.
- Ignoring the performance need on the server. If you fetch the whole row anyway, you've shrunk the response but not the work. Skip expensive fields at the query level when excluded.
- Overlapping with [content negotiation](/t/content-negotiation). Fieldsets pick *which* fields; content negotiation picks representation and format. Different axes, sometimes confused.
- No default. Every request should have a sensible default field set when none is specified, so clients work without opting in.

**When to use it:** for APIs serving varied clients — especially mobile — where full objects are wasteful. It's a targeted optimisation, not a default for every endpoint; adding it everywhere complicates the API for little gain. Keep it allow-listed, documented, and stable, and pair it with good caching headers (see [ETag](/t/etag)).
