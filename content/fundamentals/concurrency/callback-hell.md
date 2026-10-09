---
title: "Callback Hell"
summary: "Deeply nested callbacks that make async code unreadable."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["pyramid of doom", "callback pyramid"]
prereqs: ["callback"]
related: ["callback", "promise", "async-await", "promise-combinators", "error-handling"]
---

Callback hell is code with callbacks nested inside callbacks, where each step depends on the one before. It drifts to the right, becomes hard to read, and error handling gets repetitive.

```js
getUser(id, (err, user) => {
  if (err) return handle(err);
  getOrders(user.id, (err, orders) => {
    if (err) return handle(err);
    getItems(orders[0].id, (err, items) => {
      if (err) return handle(err);
      render(items, (err) => {
        if (err) return handle(err);
      });
    });
  });
});
```

Problems: deep nesting, the same error check repeated at every level, hard-to-follow order, and no easy way to run steps in parallel or stop early.

## The fix: promises and async/await

```js
try {
  const user = await getUser(id);
  const orders = await getOrders(user.id);
  const items = await getItems(orders[0].id);
  await render(items);
} catch (err) {
  handle(err);               // one place for all errors
}
```

The code reads top to bottom, with a single `try/catch` ([promises](/t/promise), [async/await](/t/async-await)).

## Other ways out

- **Name your functions** and keep them flat instead of nesting anonymous ones.
- **Split into small steps**, each its own function.
- **Use [promise combinators](/t/promise-combinators)** to run independent steps together: `await Promise.all([a(), b()])`.
- **Wrap old callback APIs** into promises (`util.promisify` in Node).

## Mistakes to avoid when converting

- Forgetting `await`, so a promise is used as if it were the value.
- `await` inside `forEach` doesn't wait. Use `for...of`.
- Awaiting independent calls one by one, when they could run in parallel.
