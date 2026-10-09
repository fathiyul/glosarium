---
title: "Routing"
summary: "Mapping URLs and methods to handler code."
levels: { backend: junior }
aliases: ["routing", "routes", "URL routing", "request routing", "route handlers"]
prereqs: ["http-methods", "url"]
related: ["request-handler", "endpoint", "web-framework", "request-lifecycle", "path-vs-query-parameters", "middleware-pattern"]
core: [backend]
---

**Routing** is how a backend decides which code handles a request: it matches the **HTTP method and URL path** to a
handler function.

```python
# Flask
@app.get("/orders")
def list_orders(): ...

@app.post("/orders")
def create_order(): ...

@app.get("/orders/<int:order_id>")        # path parameter
def get_order(order_id): ...
```

```js
// Express
app.get("/orders/:id", (req, res) => {
  res.json(findOrder(req.params.id));
});
```

When `GET /orders/917` arrives, the router finds the matching route, extracts `order_id = 917` and calls
the handler ([request handler](/t/request-handler)).

## What a router does

- Matches **method + path pattern**, including parameters like `:id` or `<int:order_id>`.
- Responds **404 Not Found** if no path matches, and **405 Method Not Allowed** if the path exists but not for that method.
- Passes request details to the handler: params, query string, headers, body.
- Often lets you **group routes** under a prefix (`/api/v1`) and attach shared behavior
  ([middleware](/t/middleware-pattern)) such as authentication.

## Practical tips

- **Match order can matter.** In some frameworks the first matching route wins, so put specific ones
  (`/orders/export`) before general ones (`/orders/<id>`).
- **Keep handlers thin.** Parse input, call a service, return the response. Don't put business logic in the route
  ([service layer](/t/service-layer)).
- **Use consistent, resource-style URLs** ([endpoints](/t/endpoint), [REST](/t/rest)).
- **Validate path and query parameters**, and convert types ([input validation](/t/input-validation)).
- Version public APIs with a prefix or header ([API versioning](/t/api-versioning)).

Routing is part of the [request lifecycle](/t/request-lifecycle). Every web framework has one, with different syntax and
the same job.
