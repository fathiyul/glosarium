---
title: "429 Too Many Requests"
summary: "The status returned when a client goes over a rate limit."
levels: { backend: junior, frontend: junior , data-analyst: mid-level }
aliases: ["Too Many Requests", "rate limit error"]
prereqs: ["http-status-codes"]
related: ["http-status-codes", "http-4xx", "jitter", "retry-with-backoff"]
---

A `429 Too Many Requests` response means the client has sent too many requests in a given period, and the server is refusing more until the window resets. It's how a [rate limit](/t/rate-limiting) shows up to the client.

```http
HTTP/1.1 429 Too Many Requests
Retry-After: 30
Content-Type: application/json

{"error": "rate_limited", "message": "Too many requests. Try again in 30 seconds."}
```

The `Retry-After` header tells the client how long to wait, in seconds or as a date. Include it when you can, because clients that know the wait time can pause instead of guessing.

On the frontend, handle a 429 by pausing and showing a helpful message, not by retrying straight away. A common pattern is [exponential backoff](/t/retry-with-backoff) with [jitter](/t/jitter), so many clients don't all retry at the same moment.

The classic mistake is retrying immediately in a tight loop. Each retry is another request, so the client keeps hitting the limit and makes the server's load worse. A 429 is a signal to slow down, not an error to hammer through. See [HTTP 4xx responses](/t/http-4xx) for how this status fits with the other client-error codes.
