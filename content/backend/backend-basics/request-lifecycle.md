---
title: "Request Lifecycle"
summary: "What happens between a request arriving and a response leaving."
levels: { backend: junior }
prereqs: ["http-request"]
related: ["request-handler", "middleware-pattern", "mvc", "scheduled-jobs", "background-job"]
---

A request goes through several steps between reaching your server and the response leaving it. The exact order depends on the framework, but it usually looks like this:

1. The web server accepts the connection and parses the HTTP request.
2. Middleware runs: logging, authentication, parsing the body and similar checks.
3. The router matches the method and path to a handler.
4. The handler runs. It validates input, applies [business logic](/t/business-logic), queries the database or calls other services.
5. The response is built and sent back to the client.

```
request -> web server -> middleware -> router -> handler -> database
                                                   |
response <-----------------------------------------+
```

Knowing the steps tells you where to look when something is slow or wrong. Timing or logging each step shows whether the time goes to the database, an external call or your own code.

The classic mistake is doing slow work inline, such as sending an email or calling a third-party API, so the user waits for it. Move that work into a background job or a queue, as covered in [background jobs](/t/background-job) and [message queues](/t/message-queue), and respond as soon as the essential work is done. The [request handler](/t/request-handler) is the step where most of your own code runs.
