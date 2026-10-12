---
title: "HTTP Status Codes"
summary: "Three-digit codes grouped 1xx\u20135xx describing the result."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-analyst: junior , data-scientist: mid-level }
aliases: ["status codes", "HTTP response codes", "HTTP errors", "404", "500"]
prereqs: ["http"]
related: ["http-2xx", "http-3xx", "http-4xx", "http-5xx", "http-401-vs-403", "endpoint"]
core: [backend, frontend]
---

Every HTTP response starts with a three-digit **status code** saying how the request went. The first digit gives the
family:

| Range | Meaning | Whose fault |
|---|---|---|
| **1xx** | Informational | Rarely seen directly |
| **2xx** | Success | |
| **3xx** | Redirection: go elsewhere | |
| **4xx** | Client error: your request was wrong | The caller |
| **5xx** | Server error: the server failed | The server |

## The ones to know

| Code | Name | When |
|---|---|---|
| 200 | OK | Normal success |
| 201 | Created | A resource was created (`POST`) |
| 204 | No Content | Success with nothing to return (often `DELETE`) |
| 301 / 302 | Moved Permanently / Found | Redirects; the `Location` header gives the new URL |
| 304 | Not Modified | Use your cached copy |
| 400 | Bad Request | Malformed or invalid input |
| 401 | Unauthorized | Not authenticated ([401 vs 403](/t/http-401-vs-403)) |
| 403 | Forbidden | Authenticated, but not allowed |
| 404 | Not Found | No such resource |
| 409 | Conflict | Clashes with current state, such as a duplicate |
| 422 | Unprocessable Content | Well-formed but fails validation (used by many APIs) |
| 429 | Too Many Requests | Rate-limited |
| 500 | Internal Server Error | A bug or crash on the server |
| 502 / 503 / 504 | Bad Gateway / Service Unavailable / Gateway Timeout | A server behind a proxy failed, is overloaded, or is too slow |

## Why it matters

- **Clients decide what to do from the code**: retry a 503, redirect to login on a 401, show a
  message on a 400, but not retry a 400.
- **Use the right code in your API.** Returning `200` with `{"error": "..."}` hides failures
  from monitoring, caches and client libraries.
- **A 4xx vs 5xx split guides debugging**: 4xx, look at the request; 5xx, look at server logs.

See [4xx](/t/http-4xx) and [5xx](/t/http-5xx) for more detail.
