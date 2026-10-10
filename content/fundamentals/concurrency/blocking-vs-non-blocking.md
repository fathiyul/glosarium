---
title: "Blocking vs Non-blocking I/O"
summary: "Whether waiting for I/O stops the thread."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["blocking I/O", "non-blocking I/O", "async I/O"]
prereqs: ["process"]
related: ["coroutine", "cancellation", "process", "webhooks-vs-polling"]
---

Blocking I/O means a call such as a network read or a file read doesn't return until the data is ready, and the thread waits the whole time. Non-blocking I/O returns right away, and the program is told later, or polls, when the result is ready. Non-blocking designs let one thread wait on many operations at once.

In Python's asyncio, the difference shows up in how you wait:

```python
import asyncio

async def fetch(name, delay):
    await asyncio.sleep(delay)   # yields control; other tasks run meanwhile
    return name

async def main():
    results = await asyncio.gather(fetch("a", 1), fetch("b", 1))
    print(results)               # ['a', 'b'] after about one second, not two

asyncio.run(main())
```

The trap is a blocking call inside `async def`. `time.sleep(1)` in that function stops the whole event loop, so every other task waits too. Use the async version of the call, or move the blocking work to a thread.

The trade-off is complexity against throughput. Non-blocking code handles many slow connections with few threads, which suits servers making many network calls. It's harder to write and debug, and it gains little for CPU-heavy work, because computing still occupies the processor.

The classic mistake is switching to async for a service that's mostly waiting on a single database call, then leaving blocking calls in the hot path. You get the complexity without the benefit. Measure where the time goes first. [Coroutines](/t/coroutine) are the building block for most non-blocking code, and [cancellation](/t/cancellation) matters once tasks run concurrently.
