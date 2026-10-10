---
title: "Monad"
summary: "A pattern for chaining computations that carry context, like Option or Promise."
levels: { backend: senior, frontend: senior, data-engineer: senior }
aliases: ["monad", "flatMap", "bind"]
prereqs: ["higher-order-function", "option-type"]
related: ["result-type", "promise", "function-composition", "lazy-evaluation"]
---

A **Monad** is a design pattern for chaining computations where each step also carries some **context**: the value might be absent, might fail, might arrive later, or might be a list. It's not a type you use directly; it's a shape that `Option`, `Result`, `Promise` and lists all share. Once you recognise the shape, a lot of unfamiliar functional code becomes readable.

The shape has two operations:

- a way to wrap a plain value into the context (`unit`/`return`/`of`), and
- a way to chain a next step that itself returns a wrapped value (`bind`/`flatMap`/`andThen`).

That second part is the key. `map` applies a function to a wrapped value; `flatMap` applies a function that *returns another wrapped value*, and then flattens so you don't end up with `Option<Option<T>>`.

```text
map:     Some(2).map(x => x + 1)          → Some(3)
flatMap: Some(2).flatMap(x => Some(x+1))  → Some(3)   (not Some(Some(3)))
```

The payoff is that you write the happy path and the context is handled by the plumbing. Chaining several `Option`s short-circuits to `None` if any is empty; chaining `Promise`s sequences asynchronous work; chaining lists produces combinations. You never write the nested `if (x == null)` checks.

The classic mistakes:

- Explaining it with category theory. The famous joke — "a monad is a monoid in the category of endofunctors" — is true and useless for daily work. Learn the two operations and which types provide them.
- Confusing `map` and `flatMap`. Using `map` where the function already returns a wrapped value gives you nested wrappers; `flatMap` is what collapses them.
- Reinventing it. Most languages already ship monads: `Option`/`Optional`, `Result`, `Promise`/`Future`. You rarely need to build one.

See [option types](/t/option-type) and [result types](/t/result-type) for the two most common cases, and how they compose with [function composition](/t/function-composition).
