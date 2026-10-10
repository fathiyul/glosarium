---
title: "Garbage Collection"
summary: "Automatic reclamation of memory that's no longer reachable."
levels: { backend: mid-level, frontend: mid-level }
aliases: ["GC", "garbage collector"]
prereqs: ["stack-vs-heap"]
related: ["memory-leak", "virtual-machine-runtime", "pointer", "stack-vs-heap"]
---

Garbage collection is the runtime's automatic reclaiming of heap memory that the program can no longer reach. You allocate objects, and when nothing refers to them any more, the collector frees their memory. You don't call `free` yourself, which removes a whole class of bugs such as use-after-free.

CPython, the standard Python interpreter, mostly uses reference counting: an object is freed when its count drops to zero. It also has a cycle collector for objects that refer to each other. The `gc` module exposes it:

```python
import gc

class Node:
    def __init__(self):
        self.other = None

a, b = Node(), Node()
a.other, b.other = b, a   # a and b now refer to each other
del a, b                  # the cycle is unreachable, but the counts never reach zero

print(gc.collect() >= 2)  # True: the cycle collector found and freed the pair
```

Many other runtimes use a tracing collector, which starts from known roots and marks everything reachable. The details differ a lot from runtime to runtime, so check the documentation for the one you use.

The trade-off is that collection happens when the runtime decides, not when your code finishes with an object. Pauses can occur during work, and the exact moment an object is freed isn't predictable. Garbage collection also doesn't release resources such as files, sockets and locks, which need explicit handling.

The classic mistake is relying on destructors or finalizers to close files or release connections. They may run late, or not at all at program exit. Use `with` blocks, `try`/`finally`, or an explicit `close`. A related problem is holding on to objects you no longer need, which keeps them reachable. That's a [memory leak](/t/memory-leak), and the collector can't fix it.
