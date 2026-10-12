---
title: "Resource Naming"
summary: "Plural nouns, nested paths and consistent URL design."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["REST URL design", "resource naming", "API URL conventions"]
prereqs: ["rest", "endpoint"]
related: ["rest", "api-design", "path-vs-query-parameters", "http-methods", "endpoint"]
---

In a REST-style API, URLs name resources (things), and HTTP methods say what to do with them. Consistent naming makes an API guessable.

## The conventions

- **Use nouns, not verbs.** The method is the verb.
- **Use plural names for collections.**
- **Nest to show relationships**, but not too deep.
- **Use lowercase, with hyphens** for multi-word names.

```
GET    /orders                  list orders
POST   /orders                  create an order
GET    /orders/917              get one order
PATCH  /orders/917              update it
DELETE /orders/917              delete it
GET    /orders/917/items        the items of an order
GET    /users/42/orders         a user's orders
```

Compare with action-style URLs, which don't scale:

```
POST /createOrder       POST /deleteOrder?id=917       GET /getOrdersByUser
```

## Details that matter

- **Identify resources by ID in the path**, and filter with the [query string](/t/query-string): `GET /orders?status=paid&sort=-created_at` ([path vs query parameters](/t/path-vs-query-parameters)).
- **Limit nesting** to one or two levels. `/users/42/orders/917` is fine, and `/a/1/b/2/c/3/d/4` is a smell. Expose deep resources at the top level (`/items/55`).
- **Be consistent**: the same casing, plural style and ID format everywhere.
- **Actions that aren't CRUD**: model them as a resource or a sub-resource, such as `POST /orders/917/cancellation`, or `POST /orders/917/actions/cancel` when that's clearer. Pick a convention.
- **No file extensions or verbs** in paths.
- **Don't leak internals** like table names.
- **Version** at the start if you use URL versions: `/v1/orders` ([API versioning](/t/api-versioning)).
- **Trailing slashes**: choose one style, and redirect or reject the other.
- **IDs**: opaque strings or UUIDs avoid exposing counts ([primary keys](/t/primary-key)).

Good names make an API feel obvious, and make documentation shorter ([API design](/t/api-design), [REST](/t/rest)).
