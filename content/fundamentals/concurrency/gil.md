---
title: "Global Interpreter Lock (GIL)"
summary: "Python's lock that lets only one thread run bytecode at a time."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["GIL", "global interpreter lock"]
prereqs: ["process"]
related: ["process", "mutex", "coroutine", "blocking-vs-non-blocking"]
---

The Global Interpreter Lock (GIL) is a lock inside CPython, the standard Python interpreter. In the default build, only one thread at a time runs Python bytecode, so threads don't execute Python code in parallel on multiple cores. The GIL is released during many blocking operations, such as I/O and some C-extension work, so threads still help when most of the time is spent waiting.

```python
import threading, time

def wait_for_network():
    time.sleep(1)                # releases the GIL while waiting

threads = [threading.Thread(target=wait_for_network) for _ in range(4)]
start = time.perf_counter()
for t in threads: t.start()
for t in threads: t.join()
print(round(time.perf_counter() - start, 1))   # about 1.0: the waits overlap
```

For CPU-bound work, threads usually don't speed things up on the default build, because the GIL serializes the Python code. Use `multiprocessing`, which runs separate interpreters with their own GIL, or move the heavy loop into a library that releases the GIL.

Python 3.13 introduced an experimental free-threaded build that doesn't have the GIL, enabled at build time. The default build still has it, so check which interpreter you're running before you assume parallel threads.

The classic mistake is expecting a thread pool to make a CPU-heavy Python script faster on a multi-core machine. It often doesn't. Measure the workload, and choose threads for waiting and processes for computing. [Processes](/t/process) explain the other option.
