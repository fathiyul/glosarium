---
title: "Hoisting"
summary: "Declarations behaving as if moved to the top of their scope."
levels: { frontend: junior }
aliases: ["variable hoisting", "function hoisting", "temporal dead zone"]
prereqs: ["variable", "javascript"]
related: ["scope", "var-let-const", "javascript"]
---

Hoisting is JavaScript's behavior of processing declarations before running the code, as if they were moved to the top of their scope. What's hoisted depends on how you declare it.

```js
console.log(a);     // undefined, not an error
var a = 5;

greet();            // "hi": works before its definition
function greet() { console.log("hi"); }
```

## What happens for each kind

| Declaration | Before its line runs |
|---|---|
| `var` | exists, with value `undefined` |
| function declaration | fully usable (name and body) |
| `let`, `const` | exists, but **can't be accessed**: a `ReferenceError`. This period is the *temporal dead zone* |
| `class` | same as `let`: can't be used before the declaration |
| function expression (`const f = () => {}`) | follows the variable's rules |

```js
console.log(b);     // ReferenceError: Cannot access 'b' before initialization
let b = 5;

hello();            // TypeError: hello is not a function (var is undefined at that point)
var hello = function () {};
```

Only the **declaration** is hoisted, not the assignment. That's why `var a` is `undefined`, not `5`.

## Classic mistakes

```js
for (var i = 0; i < 3; i++) setTimeout(() => console.log(i));   // 3 3 3: var is function-scoped, one shared i
for (let i = 0; i < 3; i++) setTimeout(() => console.log(i));   // 0 1 2
```

## Practical advice

- **Use `const` and `let`**, not `var`. The dead zone turns use-before-declaration into a loud error instead of a silent `undefined`.
- **Declare variables at the top** of the scope where you use them.
- **Function declarations may be called before they appear**, which some people use to put main code first. Use it knowingly.
- **Hoisting is per scope.** `let` and `const` are block-scoped, `var` is function-scoped ([scope](/t/scope)).
- Linters flag most hoisting surprises. See also [var, let and const](/t/var-let-const).
