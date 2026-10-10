---
title: "Memory Leak"
summary: "Memory that's never released, growing until the program slows or crashes."
levels: { backend: mid-level, frontend: mid-level }
aliases: ["leak", "memory growth"]
prereqs: ["garbage-collection"]
related: ["garbage-collection", "memoization", "pointer", "stack-vs-heap"]
---

A memory leak is memory the program no longer needs but can't release, usually because something still refers to it. In a garbage-collected language, the collector frees only what's unreachable. If an object stays reachable through a forgotten reference, it stays in memory, and the process grows over time.

```python
_cache = {}

def handle_request(request_id, payload):
    _cache[request_id] = payload   # never removed: grows with every request
    return process(payload)
```

Each request adds an entry, and nothing ever removes one. The process works fine in testing and slowly runs out of memory in production. Adding a size limit, an expiry time or removing the entry when the request finishes fixes it.

The trade-off is that caches and history are useful, so you can't simply avoid keeping data. The question is how long each piece of data should live. [Memoization](/t/memoization) and other caches need an upper bound on size or a time limit.

The classic mistakes are unbounded caches, event listeners that are added and never removed, and closures or timers that hold large objects after they're finished with. In a browser, a component that subscribes to something but doesn't unsubscribe on unmount is a common source. Watch memory over a longer run than your tests, and use a profiler to see which objects are growing. The [garbage collector](/t/garbage-collection) can't free anything the program still holds.
