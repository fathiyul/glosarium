---
title: "Coroutine"
summary: "A function that can pause and resume; the basis of async/await."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["coroutines", "async function"]
prereqs: ["generator"]
related: ["generator", "blocking-vs-non-blocking", "cancellation", "async-await"]
---

A coroutine is a function that can pause in the middle, hand control back to a scheduler, and resume later from the same point. `async` functions in Python, JavaScript and many other languages are coroutines. A generator is a simple kind of coroutine that pauses only on `yield`.

```python
import asyncio

async def fetch_user(user_id):
    await asyncio.sleep(0.1)     # pause here while waiting; control goes back to the loop
    return {"id": user_id}

async def main():
    users = await asyncio.gather(fetch_user(1), fetch_user(2))
    print(users)                 # e.g. [{'id': 1}, {'id': 2}]

asyncio.run(main())
```

While one coroutine is paused on `await`, the event loop runs the others. Only one coroutine runs at a time on the loop, so the switching happens at `await` points rather than at any moment the scheduler chooses.

The trade-off is cooperative scheduling. A coroutine that never reaches an `await`, such as a long calculation or a blocking call, holds the loop and stops every other task. Coroutines are cheap to create compared with threads, which suits high numbers of waiting tasks, but they don't use multiple CPU cores by themselves.

The classic mistake is calling a blocking function inside a coroutine, such as `time.sleep` instead of `asyncio.sleep`. Nothing errors. The whole program just becomes slow in a way that's hard to trace. Use the async version of each library call, or run blocking work in a thread. For stopping a coroutine early, see [cancellation](/t/cancellation), and for the broader model, [blocking vs non-blocking I/O](/t/blocking-vs-non-blocking).
