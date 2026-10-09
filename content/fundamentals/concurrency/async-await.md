---
title: "async / await"
summary: "Syntax for writing asynchronous code that reads like synchronous code."
levels: { backend: junior, frontend: junior }
aliases: ["async await", "async functions", "async/await"]
prereqs: ["promise"]
related: ["promise", "promise-combinators", "event-loop", "try-catch", "blocking-vs-non-blocking"]
core: [backend, frontend]
---

`async` and `await` let you write code that waits for slow things (network, disk, timers)
in a straight line, instead of chaining callbacks.

```js
async function loadUser(id) {
  const res = await fetch(`/api/users/${id}`);   // pause here until the response arrives
  const user = await res.json();
  return user;                                   // the function returns a promise
}
```

Rules:

- `await` works inside an `async` function (and at the top level of ES modules).
- An `async` function always returns a [promise](/t/promise).
- While one function waits, the program can run other work. It is not blocking the whole app
  (see [blocking vs non-blocking](/t/blocking-vs-non-blocking)).

Python has the same shape with `asyncio`:

```python
import asyncio

async def load_user(user_id):
    await asyncio.sleep(0.1)          # stand-in for a network call
    return {"id": user_id}

asyncio.run(load_user(1))
```

## Errors use normal try/catch

```js
try {
  const user = await loadUser(7);
} catch (err) {
  showError(err);
}
```

## Common mistakes

**1. Forgetting `await`.** You get a promise (JavaScript) or a coroutine that never ran
(Python warns "coroutine ... was never awaited") instead of the value.

**2. Awaiting things one after another that are independent:**

```js
const a = await getA();       // waits...
const b = await getB();       // ...then starts this. Slow.

const [a, b] = await Promise.all([getA(), getB()]);   // both at once
```

**3. `await` in `forEach`.** `items.forEach(async (x) => await save(x))` doesn't wait for
anything. Use a `for...of` loop, or `Promise.all` with `map`.
