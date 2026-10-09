---
title: "2xx Success Codes"
summary: "200 OK, 201 Created, 204 No Content and friends."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["200 OK", "201 Created", "204 No Content", "success status codes"]
prereqs: ["http-status-codes"]
related: ["http-status-codes", "http-3xx", "http-4xx", "http-methods", "endpoint"]
---

Status codes in the 2xx range mean the request succeeded. The specific code says how.

| Code | Name | Typical use |
|---|---|---|
| **200** | OK | a normal success; the response body has the result (`GET`, `PUT`, `PATCH`) |
| **201** | Created | a new resource was made, usually by `POST`; include a `Location` header pointing at it |
| **202** | Accepted | the request was received, but processing happens later (a background job) |
| **204** | No Content | success with nothing to return, often for `DELETE` or `PUT` |
| 206 | Partial Content | part of a resource, for range requests (video, resumable downloads) |

```http
POST /orders HTTP/1.1
...
HTTP/1.1 201 Created
Location: /orders/917
Content-Type: application/json

{"id": 917, "status": "pending"}
```

```http
DELETE /orders/917
HTTP/1.1 204 No Content
```

## Choosing well

- **Use 201 for creation**, not 200, and return the new resource or its location.
- **Use 202 for asynchronous work**, and tell the client how to check progress (a status URL) ([long-running operations](/t/long-running-operations)).
- **Don't send a body with 204.** By definition there is none.
- **Don't return 200 with an error inside.** If it failed, use a 4xx or 5xx code ([status codes](/t/http-status-codes)).
- **Be consistent** across your API, so clients can rely on the codes.

## For API clients

Treat any 2xx as success, not just 200: check for the range (`res.ok` in `fetch`) ([fetch API](/t/fetch-api)). Then look at the specific code and body.

See also [redirects (3xx)](/t/http-3xx), [client errors (4xx)](/t/http-4xx) and [server errors (5xx)](/t/http-5xx).
