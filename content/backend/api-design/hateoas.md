---
title: "HATEOAS"
summary: "Responses that include links to the possible next actions."
levels: { backend: senior, frontend: senior }
aliases: ["HATEOAS", "hypermedia as the engine of application state", "hypermedia api"]
prereqs: ["rest", "api-contract"]
related: ["pagination", "api-first", "backward-compatibility"]
---

**HATEOAS** (Hypermedia as the Engine of Application State) is the REST constraint that responses include **hypermedia** links telling the client what it can do next. Instead of hard-coding URLs, a client follows the links the server provides — like a web page with its links.

```json
{
  "id": 42, "status": "pending",
  "_links": {
    "self":    { "href": "/orders/42" },
    "cancel":  { "href": "/orders/42/cancel", "method": "POST" },
    "invoice": { "href": "/orders/42/invoice" }
  }
}
```

The appeal is decoupling: the client follows links rather than constructing URLs, so the server can change URL structure without breaking clients, and can advertise available actions based on state (a pending order has a `cancel` link; a shipped one doesn't).

The classic mistakes:

- Treating it as the only "real" REST. In practice, most APIs are pragmatic REST without full HATEOAS, and that's fine. Insisting on pure HATEOAS for an internal API adds ceremony clients rarely use.
- Links that nobody follows. If every client hard-codes URLs anyway, the links are documentation, not a mechanism. Be honest about whether they're used.
- Inconsistent link structure. Hypermedia only helps if the format is predictable. Document the link schema as part of the [contract](/t/api-contract).
- Embedding actions that need a body. A link is fine for a simple action; complex operations with payloads get awkward as a link, and are often better as explicit endpoints.
- Confusing it with pagination. Pagination links (`next`, `prev`) are a small, very useful instance of hypermedia; full HATEOAS is a bigger commitment than those.
- Forgetting clients still version-check. Links don't remove the need for [compatibility](/t/backward-compatibility) discipline; they reduce URL coupling, not schema coupling.

**When to use it:** selectively. Pagination links and state-dependent action links are widely useful and cheap. Full HATEOAS — where the client is entirely driven by hypermedia — suits long-lived public APIs with many independent clients and a willingness to invest. For most APIs, pragmatic REST with a clear [contract](/t/api-contract) is simpler and just as maintainable.
