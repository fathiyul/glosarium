---
title: "var, let and const"
summary: "JavaScript's three ways to declare variables, and how they're scoped."
levels: { backend: junior, frontend: junior }
aliases: ["var let const", "let vs const", "variable declarations in JavaScript", "hoisting variables", "const vs let"]
prereqs: ["variable", "scope"]
related: ["hoisting", "closure", "block-scope", "ecmascript", "truthy-falsy"]
core: [frontend]
---

JavaScript has three ways to declare a variable. Their differences are about **scope** and
**reassignment**.

| | Scope | Reassign? | Redeclare? | Hoisting |
|---|---|---|---|---|
| `var` | **Function** | Yes | Yes | Hoisted, initialized as `undefined` |
| `let` | **Block** `{ }` | Yes | No | Hoisted, but unusable before the declaration |
| `const` | **Block** `{ }` | **No** | No | Same as `let` |

```js
if (true) {
  var a = 1;
  let b = 2;
  const c = 3;
}
console.log(a);   // 1       var leaks out of the block
console.log(b);   // ReferenceError: b is not defined
```

## Why `var` causes bugs

`var` ignores blocks, and its declaration is hoisted to the top of its function ([hoisting](/t/hoisting)):

```js
console.log(x);   // undefined (not an error!)
var x = 5;
```

It also gives the famous loop bug, where every callback shares one variable:

```js
for (var i = 0; i < 3; i++) setTimeout(() => console.log(i));   // 3, 3, 3
for (let i = 0; i < 3; i++) setTimeout(() => console.log(i));   // 0, 1, 2
```

`let` creates a fresh `i` for each iteration (see [closures](/t/closure)).

## What to use

1. **Default to `const`.** Most variables never change.
2. **Use `let`** when you really reassign (counters, accumulators).
3. **Don't use `var`** in new code.

## `const` doesn't mean frozen

It prevents *reassigning the variable*, but the value can still change if it's an object:

```js
const user = { name: "Ana" };
user.name = "Bo";     // allowed
user = {};            // TypeError
```

(See [mutable vs immutable](/t/mutable-vs-immutable).)

Accessing a `let` or `const` before its line throws a ReferenceError, an area known as the *temporal dead zone*.
That's useful: it flags use-before-define bugs instead of silently giving `undefined`.
