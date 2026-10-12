---
title: "Function Composition"
summary: "Combining functions so the output of one feeds the next."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["compose", "pipe"]
prereqs: ["higher-order-function"]
related: ["currying", "partial-application", "functional-programming", "map-filter-reduce"]
---

Function composition builds a new function by feeding the output of one function into another. `compose(f, g)` returns a function that computes `f(g(x))`. Chaining several functions this way lets you describe a transformation as a pipeline of small steps.

```javascript
const compose = (f, g) => x => f(g(x));

const double = x => x * 2;
const addOne = x => x + 1;

const doubleThenAdd = compose(addOne, double);
doubleThenAdd(5);   // 11: double(5) is 10, addOne(10) is 11
```

Note the order: `compose` applies the right-hand function first. A `pipe` helper does the reverse, which many people find easier to read left to right. The two are the same idea with the arguments flipped. Python has no built-in `compose`, but `functools.reduce` or a short helper does the same job.

The trade-offs are debuggability and clarity. When a long chain fails, the error can point at the whole pipeline rather than the step that caused it, and intermediate values are hidden. Composed functions are also harder to step through in a debugger. Two or three steps usually read well, while long chains often read better as a sequence of named variables.

The classic mistake is composing functions with different shapes, where one returns an array and the next expects a single value, or where one step is async and the others aren't. The types don't match, and the error appears far from its cause. Keep each step's input and output clear, and see [functional programming](/t/functional-programming) for the broader style.
