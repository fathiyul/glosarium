---
title: "Middleware"
summary: "A pipeline of functions wrapped around request handling."
levels: { backend: junior, frontend: mid-level }
aliases: ["middleware", "request pipeline", "Express middleware"]
prereqs: ["function", "http"]
related: ["decorator-pattern", "chain-of-responsibility", "request-lifecycle", "web-framework", "higher-order-function"]
---

Middleware is a pipeline of functions wrapped around request handling. Each function receives the request, can do something before or after the real handler, and then passes control to the next one.

```js
// Express
app.use((req, res, next) => {          // runs for every request
  console.log(req.method, req.url);
  next();                              // hand over to the next step
});

app.use(requireLogin);                 // may stop the chain with a 401
app.get("/orders", listOrders);        // the actual handler
```

```
request ─► logging ─► auth ─► parse body ─► handler ─► response
               └──────────── each step can act before and after ────────┘
```

## What it's used for

Cross-cutting concerns that apply to many routes, so they don't need to be repeated in each handler:

- Logging and request IDs.
- Authentication and authorization.
- Parsing JSON bodies and cookies.
- CORS headers and compression.
- Rate limiting.
- Error handling and response formatting.

## How it works

Each middleware is a function that either:

- calls `next()` to continue down the chain,
- or **ends the request** itself (sending a 401, or a cached response).

Order matters. Auth must run before handlers that need it, and error handlers usually go last.

```python
# Python (ASGI-style, simplified)
async def timing(request, call_next):
    start = time.time()
    response = await call_next(request)
    response.headers["X-Time"] = str(time.time() - start)
    return response
```

## Cautions

- **Forgetting `next()`** leaves the request hanging.
- **Order bugs**: a body parser placed after the route never sees the body.
- **Too much work in middleware** slows every request.
- **Hidden behavior**: when something odd happens to a request, check the middleware stack ([request lifecycle](/t/request-lifecycle)).

The idea is related to the [decorator](/t/decorator-pattern) and [chain of responsibility](/t/chain-of-responsibility) patterns.
