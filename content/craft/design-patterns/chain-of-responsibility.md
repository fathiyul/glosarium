---
title: "Chain of Responsibility"
summary: "Passing a request along handlers until one deals with it; how middleware works."
levels: { backend: mid-level, frontend: mid-level }
aliases: ["chain of responsibility pattern", "handler chain"]
prereqs: ["design-pattern"]
related: ["decorator-pattern", "command-pattern", "request-lifecycle", "middleware-pattern"]
---

The chain of responsibility pattern passes a request along a chain of handlers. Each handler either deals with the request or passes it to the next one. The sender doesn't need to know which handler will act, and handlers can be added, removed or reordered without changing the sender.

```python
class Handler:
    def __init__(self, next_handler=None):
        self.next = next_handler

    def handle(self, request):
        if self.next:
            return self.next.handle(request)
        return "unhandled"

class AuthCheck(Handler):
    def handle(self, request):
        if not request.get("user"):
            return "401: not logged in"
        return super().handle(request)

class RateLimit(Handler):
    def handle(self, request):
        if request.get("calls", 0) > 100:
            return "429: too many requests"
        return super().handle(request)

class Business(Handler):
    def handle(self, request):
        return "200: ok"

chain = AuthCheck(RateLimit(Business()))
chain.handle({"user": "ada", "calls": 3})   # "200: ok"
```

Web frameworks use this idea for middleware: each layer can stop a request, such as an authentication check, or pass it along. The order of the chain is the order of the checks.

The trade-off is that the request's path is spread across handlers, so it's harder to see which one will respond. A misordered chain, such as a rate limit placed after an expensive step, can cost real work. A request that falls off the end without a clear answer is also easy to miss.

The classic mistake is letting every handler pass the request on by default, so nothing responds and the chain ends in a silent failure. Make the end of the chain explicit, and keep the order documented. The [request lifecycle](/t/request-lifecycle) shows where middleware sits in a real server, and the [middleware pattern](/t/middleware-pattern) covers the framework version.
