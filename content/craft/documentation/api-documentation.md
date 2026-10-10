---
title: "API Documentation"
summary: "Reference docs for an API's endpoints, parameters and errors."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["API reference", "endpoint documentation"]
prereqs: ["http-methods"]
related: ["api-design", "http-status-codes", "error-response-format", "breaking-change"]
---

API documentation is the reference for an API: its endpoints, what each one does, the parameters and their types, the responses it returns, and the errors it can raise. Developers use it to call the API correctly without reading the server code.

A useful entry for one endpoint states the method and path, each parameter with its type and whether it's required, the success response, and the common errors:

```
GET /orders/{id}
  id        integer, required, path
  Returns:  200 with the order object
  Errors:   404 if the order doesn't exist
            401 if the request has no valid credentials
```

Including examples of a real request and response is often the most useful part, because readers copy them.

The trade-off is maintenance. Documentation written by hand drifts from the code, and a reference that is wrong is worse than none. Generating it from the API's schema keeps it accurate, but the generated text still needs human wording for the parts that matter, such as what an error means.

The classic mistake is documenting the happy path and leaving out errors, pagination and limits. Those are the details that cause support questions. Document the error format, the status codes that can appear, and any change that would break a client, as covered in [breaking changes](/t/breaking-change).
