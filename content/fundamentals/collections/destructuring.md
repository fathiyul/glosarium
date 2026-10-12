---
title: "Destructuring"
summary: "Unpacking values from arrays or objects into variables."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["destructuring assignment", "unpacking", "tuple unpacking"]
prereqs: ["variable", "array"]
related: ["spread-operator", "default-parameter", "tuple", "undefined"]
core: [frontend]
---

Destructuring pulls pieces out of a collection and puts them into named variables in one
step, instead of indexing by hand.

```js
// Arrays: by position
const [first, second] = ["a", "b", "c"];   // first = "a", second = "b"

// Objects: by property name
const user = { id: 7, name: "Ana", role: "admin" };
const { name, role } = user;               // name = "Ana", role = "admin"
```

## Useful forms

```js
const { name: userName } = user;           // rename: userName = "Ana"
const { plan = "free" } = user;            // default if missing
const [head, ...tail] = [1, 2, 3, 4];      // rest: head = 1, tail = [2, 3, 4]
const { address: { city } } = order;       // nested
[a, b] = [b, a];                           // swap two variables
```

It's most common in function parameters, where it shows exactly which fields a function uses:

```js
function Greeting({ name, role = "guest" }) {
  return `Hi ${name} (${role})`;
}
```

## Gotchas

- **Defaults only apply to `undefined`.** `{ plan = "free" }` keeps a `null` plan.
- **Destructuring `null` or `undefined` throws a TypeError.** `const { id } = undefined`
  crashes. Give a fallback: `const { id } = maybeUser ?? {}`.
- **It's a shallow unpacking.** Nested objects are still shared references, not copies.

## In Python

Python has the same idea for sequences, usually called *unpacking*:

```python
x, y = (3, 4)
first, *rest = [1, 2, 3, 4]       # first = 1, rest = [2, 3, 4]
for key, value in data.items(): ...
```

Python doesn't unpack dictionaries by key name the way JavaScript does with objects.
