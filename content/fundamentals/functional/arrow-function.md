---
title: "Arrow Function"
summary: "JavaScript's concise function syntax with lexical this."
levels: { frontend: junior }
aliases: ["arrow functions", "fat arrow", "lambda expression"]
prereqs: ["function", "this-self"]
related: ["first-class-function", "higher-order-function", "lambda", "closure", "this-binding"]
---

An arrow function is JavaScript's shorter syntax for writing functions, with one important behavior difference.

```js
// regular function
function double(n) { return n * 2; }

// arrow function
const double = (n) => n * 2;           // implicit return for a single expression
const add = (a, b) => a + b;
const greet = name => `Hi ${name}`;    // parentheses optional with one parameter
const make = () => ({ id: 1 });        // wrap an object literal in parentheses
const run = (x) => {                   // braces need an explicit return
  const y = x * 2;
  return y;
};
```

They're common in callbacks:

```js
users.filter(u => u.active).map(u => u.name);
button.addEventListener("click", () => save());
```

## The difference: `this`

A regular function gets its own `this`, depending on how it's called. An arrow function has none: it uses the `this` of the surrounding code ([this and self](/t/this-self)).

```js
class Timer {
  start() {
    setInterval(() => this.tick(), 1000);   // this is the Timer
  }
}
```

With a regular `function() {...}` there, `this` would be wrong, which is the problem arrow functions were designed to fix.

## When not to use them

- **Object methods** that need their own `this`: `const o = { n: 1, get() { return this.n; } }` works, but `get: () => this.n` doesn't.
- **Constructors**: arrows can't be used with `new`.
- **Functions needing `arguments`**: use rest parameters instead.
- Very long arrow bodies are easier to read with a name.

Python's `lambda` is similar for tiny one-expression functions ([lambda](/t/lambda)).
