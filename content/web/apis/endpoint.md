---
title: "Endpoint"
summary: "A specific URL and method an API exposes, like POST /orders."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["API endpoint", "route", "API route"]
prereqs: ["http-methods", "url"]
related: ["rest", "request-response-body", "http-status-codes", "path-vs-query-parameters", "api"]
core: [backend, frontend]
---

An **endpoint** is one specific address and method that an API exposes, such as
`POST /orders` or `GET /users/42`. It's a single thing a client can call.

```
GET    /orders          list orders
POST   /orders          create an order
GET    /orders/917      fetch order 917
PATCH  /orders/917      update it
DELETE /orders/917      delete it
```

Those are five endpoints, though the URL `/orders/917` appears three times. The URL plus the
[method](/t/http-methods) defines the endpoint.

Each endpoint has a contract:

- what **inputs** it accepts (path and query parameters, headers, a body),
- what it **returns** on success (status code and body),
- what **errors** it can produce, and
- who's **allowed** to call it.

```python
@app.post("/orders")                 # the endpoint: method + path
def create_order(payload: OrderIn):  # input
    order = save(payload)
    return order, 201                # output and status
```

## Good habits

- **Name by resource (nouns), let the method be the verb.** `POST /orders`, not `POST /createOrder`
  (see [REST](/t/rest)).
- **Keep behavior predictable**: the same input, same kind of output; consistent error shapes.
- **Check authorization on every endpoint**, not just authentication. Forgetting is how
  data leaks happen ([authentication vs authorization](/t/authentication-vs-authorization)).
- **Document and test it** ([API testing](/t/api-testing)).
- **Treat changes as breaking** if existing clients depend on them. Add fields rather than
  rename, and version when you must.

"Route" means the same thing from the server's code side (how a path maps to a handler), and
"endpoint" is the word clients and docs tend to use.
