---
title: "Path vs Query Parameters"
summary: "/users/42 vs /users?id=42, and when to use each."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["path parameters", "query parameters", "query string vs path", "URL parameters"]
prereqs: ["url"]
related: ["query-string", "url-encoding", "endpoint", "rest", "restful-resource-naming"]
core: [backend, frontend]
---

Both pass information in the URL, but they mean different things:

```
https://api.example.com/users/42/orders?status=paid&sort=-date&page=2
                        └─────┬─────┘ └──────────────┬─────────────┘
                         path parameters            query parameters
```

| | Path parameter | Query parameter |
|---|---|---|
| Where | In the path: `/users/42` | After `?`: `?status=paid` |
| Means | **Which** resource | **How** to filter, sort or shape it |
| Required? | Yes, it's part of the address | Usually optional |
| Example | `/users/42`, `/orders/917` | `?page=2`, `?q=kettle`, `?sort=price` |

## Rule of thumb

- **Identify** a specific thing with the path: `GET /users/42`.
- **Narrow, search or page through a collection** with the query: `GET /users?role=admin&page=2`.

If removing the parameter would point to a *different resource*, it belongs in the path. If it
would only change what you see of the same list, it's a query parameter.

## Things to remember

- **Everything arrives as a string.** `?page=2` gives `"2"`; convert and validate it.
- **Encode special characters** (spaces, `&`, `#`, non-ASCII) with [URL encoding](/t/url-encoding).
  Use your language's URL or query builder, not string concatenation.
- **Repeated or list values** have no single standard (`?tag=a&tag=b` vs `?tag=a,b`). Check
  what your framework expects.
- **Never put secrets in URLs.** Query strings end up in logs, browser history and referrer
  headers. Use a header or body.
- **Validate them.** Treat both as untrusted input.

```python
# Flask-style
@app.get("/users/<int:user_id>")      # path parameter
def get_user(user_id): ...

page = int(request.args.get("page", 1))   # query parameter with a default
```

Good URLs are covered in [resource naming](/t/restful-resource-naming).
