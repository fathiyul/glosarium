---
title: "Error Response Format"
summary: "A consistent shape for API errors, like RFC 9457 Problem Details."
levels: { backend: mid-level, frontend: mid-level }
aliases: ["API error format", "Problem Details", "RFC 9457", "RFC 7807", "application/problem+json", "error payload"]
prereqs: ["http-status-codes", "request-response-body"]
related: ["api-design", "input-validation", "http-status-codes", "rest", "api-contract", "api-versioning"]
core: [backend]
---

When an API call fails, clients need to know **what went wrong and what to do about it**, in a form code can parse. A **consistent error format** across all endpoints lets every client handle errors with one piece of code, instead of guessing at ad hoc messages.

A standard exists: **Problem Details for HTTP APIs** (RFC 9457, which replaced RFC 7807), served as `application/problem+json`:

```http
HTTP/1.1 422 Unprocessable Content
Content-Type: application/problem+json

{
  "type": "https://api.example.com/problems/validation-error",
  "title": "Your request has invalid fields",
  "status": 422,
  "detail": "2 fields failed validation.",
  "instance": "/orders",
  "errors": [
    { "field": "quantity", "message": "must be at least 1" },
    { "field": "email", "message": "is not a valid email address" }
  ],
  "request_id": "req_8f3a2c"
}
```

The standard members:

| Member | Meaning |
|---|---|
| `type` | A URI identifying the kind of problem (a stable, documentable identifier) |
| `title` | A short, human-readable summary of the type |
| `status` | The HTTP status code |
| `detail` | An explanation of this specific occurrence |
| `instance` | A URI for this occurrence (optional) |

You can add **extension members** (`errors`, `request_id`, `retry_after`). Even if you don't adopt the standard exactly, copying its shape is a good idea.

## Principles

- **Use the right HTTP status code** and don't return `200` with an error body ([status codes](/t/http-status-codes)). The status is for machines, the body for details.
- **Give a stable, machine-readable error code or type** that clients can switch on. Don't make them parse the English message.
- **Make messages human-friendly**, and safe to show or log, and consider that the frontend may display them.
- **For validation errors, report every problem at once**, with the field name for each ([input validation](/t/input-validation)).
- **Include a request or trace ID** so support can find the logs.
- **Never leak internals**: no stack traces, SQL, file paths or secrets. Log those on the server instead.
- **Keep the shape identical for all errors**, including 404s, auth errors and unexpected 500s from the framework. Check that proxies and gateways don't return HTML pages that break clients.
- **Document your error types** as part of the contract ([API contract](/t/api-contract)), and treat them as part of the API: changing them can break clients ([API versioning](/t/api-versioning)).
- Think about whether error messages reveal too much, such as whether an account exists ([account enumeration](/t/account-enumeration)).
