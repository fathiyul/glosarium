---
title: "Request Context"
summary: "Per-request data like the current user, request ID and deadline, passed through the code."
levels: { backend: mid-level }
aliases: ["request context", "request-scoped context", "context object"]
prereqs: ["request-handler", "request-lifecycle"]
related: ["correlation-id", "logging", "structured-logging", "dependency-injection"]
---

A **request context** is a small bag of data that follows a single request through every layer of the application: who's making it, the [correlation ID](/t/correlation-id), the tenant, the authenticated user, a deadline. Instead of threading the user ID, trace ID and locale through every function signature, you carry one context object and read from it where needed.

```text
HTTP request → context { user, tenant, traceId, deadline }
  → service layer reads context.tenant
  → logger logs context.traceId automatically
```

It's usually request-scoped: created when the request arrives, passed (or made implicitly available) to handlers, services and data access, and discarded when the response is sent. The trace ID in particular lets every log line and downstream call be tied back to the original request.

The classic mistakes:

- **Global mutable state instead of a scoped context**. A module-level "current user" shared across requests leaks between concurrent requests — a serious bug. Scope the context to the request (thread-local, async-local, or explicit parameter).
- Hiding dependencies in the context. The context is for *ambient request data* (who, where, trace), not for smuggling services around and defeating [dependency injection](/t/dependency-injection). If a class needs a database, pass a database.
- Forgetting to propagate it. When you make a background job or a call to another service, the context doesn't follow automatically. Propagate the trace ID and relevant identity explicitly, or logs and traces break across the boundary (see [context propagation](/t/context-propagation)).
- Stale or missing deadlines. A context is a good place for a request deadline; without one, a slow dependency can hold the request open indefinitely.
- Leaking it into the response. Context often contains internal identifiers; don't serialize it blindly.

A request context is plumbing that keeps cross-cutting concerns — identity, tenancy, tracing, deadlines — consistent without polluting every function. Kept scoped and minimal, it makes logging and tracing coherent; abused as a global, it becomes a hidden-state hazard.
