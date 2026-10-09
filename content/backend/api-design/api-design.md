---
title: "API Design"
summary: "Designing interfaces that are clear, consistent and hard to misuse."
levels: { backend: mid-level, frontend: mid-level }
aliases: ["designing APIs", "REST API design", "API design principles", "designing a web API"]
prereqs: ["rest", "endpoint", "http-methods"]
related: ["api-first", "api-contract", "restful-resource-naming", "error-response-format", "api-versioning", "backward-compatibility"]
core: [backend]
---

An API is a **product for other developers**, and a contract that's expensive to change once people depend on it. Good design makes the right usage obvious and the wrong usage hard.

## Core principles

- **Consistency over cleverness.** The same conventions everywhere: naming, casing, pagination, filtering, errors, dates. Someone who learns one endpoint can guess the rest ([principle of least astonishment](/t/principle-of-least-astonishment)).
- **Model resources, not actions.** `POST /orders`, not `POST /createOrder` ([REST](/t/rest), [resource naming](/t/restful-resource-naming)).
- **Use HTTP properly**: the right [methods](/t/http-methods) and [status codes](/t/http-status-codes). Safe methods shouldn't change data.
- **Don't leak your internals.** Design the API around what clients need, not around your database tables or class names.
- **Be explicit and predictable.** Return clear fields, stable types, and the same shape for success and for errors ([error format](/t/error-response-format)).
- **Plan for evolution** from day one ([versioning](/t/api-versioning), [backward compatibility](/t/backward-compatibility)). Prefer additive changes.
- **Make it hard to misuse**: validate input, use enums, require what's needed, and return clear errors.

## Practical conventions

| Concern | Common practice |
|---|---|
| Names | Plural nouns for collections (`/orders`, `/orders/917`), consistent casing |
| Lists | [Pagination](/t/pagination) always, plus [filtering and sorting](/t/filtering-sorting) |
| Dates and times | ISO 8601, in UTC ([dates and times](/t/date-time-handling)) |
| IDs | Opaque strings or UUIDs, not exposing sequential internals |
| Money | Integer minor units plus a currency code, not floats |
| Partial updates | `PATCH` with only changed fields |
| Retries | Support [idempotency keys](/t/idempotency-key) for unsafe operations |
| Protection | [Rate limits](/t/rate-limiting) and authentication on everything |

```
POST /orders
{ "items": [{ "sku": "KETTLE-1", "quantity": 2 }], "currency": "USD" }

201 Created
Location: /orders/917
{ "id": "ord_917", "status": "pending", "total": { "amount": 5998, "currency": "USD" } }
```

## Process

- **Design before building.** Write the contract first (an OpenAPI document), discuss it, and mock it, so consumers can give feedback before code exists ([API first](/t/api-first), [API contract](/t/api-contract)).
- **Think about the client's job.** What are they trying to accomplish, and how many calls does it take?
- **Document with examples**, including errors.
- **Review API changes** as carefully as database schema changes. You'll live with them.
- **Dogfood it.** Use your own API, and see where it's awkward.

Once clients depend on a field or behavior, it's effectively permanent ([Hyrum's law](/t/hyrums-law)). So take care when you add things.
