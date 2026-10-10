---
title: "WSGI and ASGI"
summary: "Python's standard interfaces between web servers and applications, synchronous and async."
levels: { backend: mid-level }
aliases: ["WSGI", "ASGI", "python web interface"]
prereqs: ["application-server", "request-lifecycle"]
related: ["request-lifecycle", "worker-process-model", "request-handler"]
---

**WSGI** and **ASGI** are the standard interfaces between a Python web server and a Python application. They exist so any server can run any framework, and any framework can run behind any server, without each pairing being custom-wired. The server speaks the interface; the application implements it.

- WSGI (Web Server Gateway Interface) is the older, synchronous standard. The application is a callable that receives a request and returns a response. It maps naturally to one worker handling one request at a time.
- ASGI (Asynchronous Server Gateway Interface) is the asynchronous, more general successor. It supports `async` handlers and, crucially, long-lived connections like WebSockets, plus background work — things WSGI's request/response shape doesn't cover.

```text
WSGI: def app(environ, start_response): ...        # sync, request/response
ASGI: async def app(scope, receive, send): ...     # async, supports websockets
```

In practice you choose the interface your framework uses and a compatible server (e.g. a WSGI server for a sync framework, an ASGI server for an async one). The distinction matters because it determines your concurrency model: WSGI is one request per worker at a time (so you scale with workers/processes), while ASGI can handle many concurrent connections in one worker via async.

The classic mistakes:

- Blocking inside ASGI. Calling a synchronous, blocking function in an async handler stalls the event loop and every connection on it. Use async libraries, or push blocking work to a thread/worker.
- Running ASGI for a blocking app. If your framework/DB drivers are synchronous, ASGI's async advantage doesn't materialise, and async complexity buys little. Match the interface to the code.
- Confusing the interface with the server. WSGI/ASGI are *specs*, not servers. Don't say "run it with WSGI"; say which server and which interface.
- Forgetting WSGI can't do WebSockets. Long-lived connections need ASGI or another mechanism; a WSGI app can't hold one open in its request/response model.

WSGI/ASGI are the Python-specific answer to "how does the server talk to the app". They're an instance of the general [application server](/t/application-server) idea, and the choice shapes how your app handles concurrency — see [worker and process models](/t/worker-process-model).
