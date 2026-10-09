---
title: "this in JavaScript"
summary: "How this is determined by the way a function is called."
levels: { frontend: junior }
aliases: ["this keyword", "this in JavaScript", "bind call apply"]
prereqs: ["function", "javascript"]
related: ["javascript", "event-handling", "hoisting", "arrow-function"]
---

In JavaScript, `this` is not fixed by where a function is written. It's decided by how the function is called.

| How it's called | `this` is |
|---|---|
| `obj.method()` | `obj` |
| `fn()` (plain call) | `undefined` in strict mode and modules (the global object otherwise) |
| `new Fn()` | the new object |
| `fn.call(x)`, `fn.apply(x)`, `fn.bind(x)` | `x` |
| event listener with a normal function | the element |
| **arrow function** | whatever `this` was where it was **defined** |

## The classic bug: losing `this`

```js
const counter = {
  count: 0,
  inc() { this.count++; },
};

counter.inc();                // works: this = counter

const f = counter.inc;
f();                          // TypeError or wrong target: this is no longer counter

button.addEventListener("click", counter.inc);    // also broken: this is the button
```

## Fixes

```js
button.addEventListener("click", () => counter.inc());       // wrap in an arrow function
button.addEventListener("click", counter.inc.bind(counter)); // permanently bind

class Timer {
  seconds = 0;
  tick = () => { this.seconds++; };      // arrow property keeps this
}
```

## Arrow functions

They don't have their own `this`. They use the surrounding one, which is why they work well for callbacks inside methods:

```js
class Cart {
  total() {
    return this.items.reduce((sum, i) => sum + i.price, 0);   // `this` is still the cart
  }
}
```

But don't use arrows as object methods that need their own `this`.

## Advice

- **Avoid `this` where you can**: plain functions and closures don't have this problem.
- **Know the call site**: ask "what is to the left of the dot?"
- **Use classes with arrow properties** or `bind` when passing methods as callbacks (older React class components needed this).
- TypeScript can warn about it with `noImplicitThis`. See [hoisting](/t/hoisting) for another scope quirk.
