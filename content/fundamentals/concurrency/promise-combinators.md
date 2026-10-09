---
title: "Promise.all, race and allSettled"
summary: "Waiting on many promises at once with different failure behavior."
levels: { frontend: junior }
aliases: ["Promise.all", "Promise.race", "Promise.allSettled", "Promise.any"]
prereqs: ["promise", "async-await"]
related: ["promise", "async-await", "callback-hell", "event-loop", "cancellation"]
---

Promise combinators are built-in functions that take several promises and give back one, so you can wait on many at once. They differ in what they do when some succeed and some fail.

| Combinator | Resolves when | Fails when |
|---|---|---|
| `Promise.all` | all succeed, giving an array of results in order | the first one fails (the rest are ignored) |
| `Promise.allSettled` | all have finished, success or not, with a status for each | never |
| `Promise.race` | the first one settles, with its result or error | the first settles with an error |
| `Promise.any` | the first one succeeds | all fail |

```js
// Run independent requests together
const [user, orders] = await Promise.all([getUser(id), getOrders(id)]);

// Collect every outcome, even failures
const results = await Promise.allSettled(urls.map(fetchJson));
const ok = results.filter(r => r.status === "fulfilled").map(r => r.value);

// A timeout via race
await Promise.race([fetchData(), timeout(5000)]);

// Use the first mirror that answers
const data = await Promise.any([fetch(a), fetch(b)]);
```

## Choosing

- **All must succeed** (loading a page's data): `all`.
- **Best effort, report each result** (checking many services): `allSettled`.
- **First answer wins**: `any`. **First settled, including failure** (timeouts): `race`.

## Gotchas

- `all` rejects as soon as one fails, but the others **keep running**, because promises can't be cancelled ([cancellation](/t/cancellation)).
- **Starting them together matters.** `await a(); await b();` runs one after the other. Create the promises first, then combine.
- **Too many at once** can overwhelm a server. Limit concurrency for large lists.
- Results from `all` and `allSettled` come in the input order, not the finishing order.
- Always handle rejections, or they surface as unhandled errors.
