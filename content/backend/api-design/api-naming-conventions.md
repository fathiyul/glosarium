---
title: "API Naming Conventions"
summary: "Consistent casing, plurals and verbs across endpoints."
levels: { backend: junior, frontend: junior }
prereqs: ["http-methods"]
related: ["api-design", "http-methods", "breaking-change", "url"]
---

Naming conventions make an API predictable. Once a developer learns one endpoint, they can guess the others. The exact rules matter less than applying one set of rules everywhere.

Most teams follow a few habits:

- **Use nouns for resources and let HTTP methods carry the action.** `POST /orders` creates an order, and `GET /orders/42` reads one.
- **Use plural nouns for collections**, so `/orders` rather than `/order`.
- **Use one casing style** for path segments and JSON field names, such as `snake_case` or `camelCase`.

```
Hard to predict:          Consistent:
GET  /getUser/42          GET    /users/42
POST /orders/create       POST   /orders
GET  /order_list          GET    /orders
{"user_name": ...,        {"user_name": ...,
 "userId": ...}            "user_id": ...}
```

The classic mistake is mixing styles inside one API, such as `/getUser` next to `/orders`, or `user_name` next to `userId`. Clients then need a lookup table to use it. If your project already has a convention, follow it, even where you'd have picked differently. Changing names later is a [breaking change](/t/breaking-change), so decide before the API is used by others. See [API design](/t/api-design) for the wider picture.
