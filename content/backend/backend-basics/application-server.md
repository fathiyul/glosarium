---
title: "Application Server"
summary: "The process that runs your code behind the web server, like Gunicorn, Puma or Tomcat."
levels: { backend: mid-level }
aliases: ["application server", "app server", "web application server"]
prereqs: ["web-server", "request-handler"]
related: ["request-lifecycle", "backend", "worker-process-model", "connection-pooling"]
---

An **application server** is the process that runs your application code in response to requests. It listens for HTTP (often behind a [web server](/t/web-server) that handles TLS and static files), passes each request into your code, and returns the response. Where a web server is about serving files efficiently, the application server is about executing dynamic logic — talking to the database, enforcing rules, rendering output.

```text
client → load balancer → web server (TLS, static) → application server (your code) → DB
```

Concretely, it's the thing you start to run a web app: a platform runtime (e.g. a WSGI/ASGI server, a Node process manager, a Java servlet container). It manages the request/response cycle, worker processes or threads, and often connection pools and background work.

The classic mistakes:

- Confusing it with the web server. They can be the same process, but their roles differ: one faces the network and serves static content, the other runs application logic. Splitting them (nginx in front of app workers) is a common, useful pattern.
- Running one worker. A single worker means one slow request blocks others and a crash takes the service down. Most servers run several worker processes to use multiple cores and survive failures.
- Blocking the workers. If every request waits on a slow downstream call, workers exhaust and requests queue. Configure timeouts and concurrency to match the workload (see [backpressure](/t/backpressure)).
- Ignoring the concurrency model. Threads, processes, and async/green threads behave differently under load. Know which your server uses and size it accordingly (see [worker and process models](/t/worker-process-model)).
- No graceful shutdown. On deploy or restart the server should drain in-flight requests before exiting (see [graceful shutdown](/t/graceful-shutdown)).

**How to think about it:** the application server is where your code meets the network. Its configuration — workers, timeouts, connection pools, memory — is often the difference between a service that handles load and one that falls over. It's a central character in the [request lifecycle](/t/request-lifecycle).
