---
title: "Closure"
summary: "A function that remembers variables from the place it was defined."
levels: { backend: mid-level, frontend: junior, data-engineer: mid-level }
aliases: ["closures", "lexical closure"]
prereqs: ["function", "scope", "first-class-function"]
related: ["higher-order-function", "arrow-function", "memoization", "scope", "callback"]
core: [frontend]
---

A **closure** is a function that keeps access to the variables from the place where it was
*created*, even after that place has finished running.

```js
function makeCounter() {
  let count = 0;
  return () => ++count;      // remembers `count`
}

const next = makeCounter();
next(); // 1
next(); // 2
```

`makeCounter` has returned, yet `count` is still alive because the inner function holds on
to it. Each call to `makeCounter()` makes a separate `count`, so counters don't interfere.

## Where you meet them

You use closures constantly without naming them: event handlers that read variables from
the surrounding function, callbacks passed to `setTimeout` or `fetch`, React hooks, and
functions that return configured functions (`makeValidator(minLength)`).

```js
function makeValidator(min) {
  return (text) => text.length >= min;   // `min` captured
}
const isValidName = makeValidator(3);
```

## The classic bug: loops

```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);   // prints 3, 3, 3
}
```

With `var`, there is one `i` shared by all three callbacks, and the loop has finished before
they run. With `let`, each iteration gets its own `i` and it prints 0, 1, 2. Python has the
same trap with lambdas created in a loop: they look up the variable when *called*.

## Another trap: stale values

A closure captures the *variable*, but a framework may call your function again with new
values. In React, an effect or callback can keep seeing an old value of state if its
dependencies are wrong. When something "doesn't update", ask which closure is holding the
old value.
