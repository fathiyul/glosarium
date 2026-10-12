---
title: "4xx Client Errors"
summary: "400, 404, 409, 422, 429: the client did something wrong."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["400", "404", "409", "422", "429", "client error status codes"]
prereqs: ["http-status-codes"]
related: ["http-401-vs-403", "http-5xx", "error-response-format", "http-429", "input-validation"]
---

Status codes in the 4xx range mean the client made a mistake: the request is wrong, unauthorized, or can't be satisfied. Retrying the same request won't help until something changes.

| Code | Name | Use when |
|---|---|---|
| **400** | Bad Request | the request is malformed or invalid (bad JSON, missing parameter) |
| **401** | Unauthorized | not authenticated: missing or invalid credentials |
| **403** | Forbidden | authenticated, but not allowed ([401 vs 403](/t/http-401-vs-403)) |
| **404** | Not Found | no such resource (also used to hide that one exists) |
| **405** | Method Not Allowed | the URL exists, but not for this method |
| **409** | Conflict | the request conflicts with the current state (duplicate, version mismatch) |
| **410** | Gone | existed, permanently removed |
| **413** | Content Too Large | the body exceeds the limit |
| **415** | Unsupported Media Type | wrong `Content-Type` |
| **422** | Unprocessable Content | well-formed, but fails validation (many APIs use this for field errors) |
| **429** | Too Many Requests | rate limited ([HTTP 429](/t/http-429)) |

```http
HTTP/1.1 422 Unprocessable Content
Content-Type: application/problem+json

{"title": "Invalid order", "errors": [{"field": "quantity", "message": "must be at least 1"}]}
```

## Choosing between similar codes

- **400 vs 422**: 400 for a request that can't be parsed or understood. 422 for one that's understood, but semantically invalid. Pick one convention for validation and stick to it.
- **404 vs 403**: if revealing that a resource exists is itself a leak, return 404.
- **409**: duplicates and concurrent edit conflicts, such as a unique constraint violation ([optimistic locking](/t/optimistic-locking)).

## For API authors

- Return a **helpful body** explaining what's wrong and how to fix it ([error response format](/t/error-response-format)).
- **Don't use 4xx for your own bugs**, which are 5xx.
- **Don't use 200 with an error body.**
- Treat the 4xx rate as a signal in monitoring: a spike can mean a client bug or an attack.

## For clients

Don't retry 4xx blindly, except 429 and some 409s (after waiting), and 401 once after refreshing a token ([retry with backoff](/t/retry-with-backoff)).
