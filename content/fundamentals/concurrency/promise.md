---
title: "Promise / Future"
summary: "An object representing a value that will be available later."
levels: { backend: junior, frontend: junior }
aliases: ["Promises", "Future", "promise object", "Promise API"]
prereqs: ["callback", "function"]
related: ["async-await", "callback-hell", "promise-combinators", "event-loop", "cancellation"]
core: [backend, frontend]
---

A **promise** (called a **Future** in some languages) is an object standing in for a value
that isn't ready yet, such as the result of a network request.

A promise is always in one of three states:

| State | Meaning |
|---|---|
| **pending** | Still working |
| **fulfilled** | Finished, has a value |
| **rejected** | Failed, has an error |

Once it leaves *pending*, it never changes.

```js
fetch("/api/user")                    // returns a promise immediately
  .then((res) => res.json())          // runs when it's fulfilled
  .then((user) => console.log(user.name))
  .catch((err) => console.error(err)) // runs if any step rejects
```

Each `.then()` returns a *new* promise, so you can chain steps in order instead of nesting
callbacks inside callbacks (see [callback hell](/t/callback-hell)). Modern code usually
writes this with [async/await](/t/async-await), which is built on promises.

## Mistakes to avoid

- **Forgetting that it's a promise.** `const user = fetch(...)` gives you a promise, not the
  user. You need `.then` or `await`.
- **Not handling rejections.** A rejected promise nobody catches shows up as an "unhandled
  rejection" and can crash a Node process or fail silently in a browser. Always `.catch` or
  use `try/catch` with `await`.
- **Running things one by one that could run together.** Use
  [`Promise.all`](/t/promise-combinators) for independent requests.
- **Forgetting to return** inside `.then`, which passes `undefined` to the next step.

Other languages have the same idea under other names: Python's `asyncio.Future`, Java's
`CompletableFuture`.
