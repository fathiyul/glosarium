---
title: "Singleton"
summary: "Ensuring a class has exactly one instance; often an anti-pattern."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["singleton pattern", "singletons"]
prereqs: ["design-pattern"]
related: ["anti-pattern", "dependency-injection", "global-variable", "gang-of-four"]
---

The singleton pattern ensures that a class has exactly one instance and gives access to it from anywhere. A configuration object, a connection pool or a logger is often made a singleton so that all the code shares one copy.

In Python, a module already behaves like a singleton, because it's loaded once:

```python
# config.py
settings = {"timeout": 10}

# elsewhere
from config import settings
settings["timeout"]     # the same dictionary, shared by everyone who imports it
```

The trade-off is that a singleton is global state. Any code can reach it and change it, so the behaviour of one part depends on what another part did earlier. That makes tests order-dependent, and it hides which parts of the program depend on the instance.

The classic mistake is using a singleton for convenience, so that a class doesn't have to receive its collaborator as a parameter. The result is code that's hard to test, since each test must reset the shared instance. Pass the instance in through [dependency injection](/t/dependency-injection) instead. Keep a single instance when it truly must be one, such as a process-wide resource, and make the creation point explicit. That's why many developers classify singleton overuse as an [anti-pattern](/t/anti-pattern).
