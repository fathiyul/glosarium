---
title: "Currying"
summary: "Turning a multi-argument function into a chain of single-argument ones."
levels: { backend: senior, frontend: mid-level, data-engineer: senior , data-scientist: senior }
aliases: ["curried function"]
prereqs: ["higher-order-function"]
related: ["partial-application", "function-composition", "closure"]
---

Currying turns a function that takes several arguments into a chain of functions that each take one argument. Calling the first function with one argument returns a function that expects the next, and so on until all arguments are supplied.

```javascript
const add = (a, b) => a + b;           // normal two-argument function
const curriedAdd = a => b => a + b;    // curried version

curriedAdd(2)(3);                      // 5
const addTwo = curriedAdd(2);          // a reusable one-argument function
[1, 2, 3].map(addTwo);                 // [3, 4, 5]
```

Currying is useful when you want to create specialized functions from general ones, such as a `log(level)(message)` function you partly apply at startup. It fits naturally with [function composition](/t/function-composition), because each curried step takes one value and returns one value.

The trade-off is readability and performance. A chain of nested calls is harder to read at a glance, error messages and stack traces become less clear, and in some languages each step allocates a new function. Many languages don't curry by default, so teammates may be surprised by it. A plain function with an options object is often clearer.

The classic mistake is currying every function out of habit. Most functions don't need it. Curry when the first arguments are configuration that stays fixed while the later ones vary, and be aware that [partial application](/t/partial-application) often gives you the same benefit with clearer code.
