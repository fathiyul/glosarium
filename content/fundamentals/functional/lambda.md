---
title: "Lambda / Anonymous Function"
summary: "A function without a name, defined inline."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["anonymous function", "lambda expression"]
prereqs: ["function", "first-class-function"]
related: ["arrow-function", "first-class-function", "higher-order-function", "closure"]
---

A lambda is a function without a name, written inline where you need it. It's handy for short throwaway functions passed to other functions.

```python
double = lambda x: x * 2
double(4)                                      # 8

sorted(users, key=lambda u: u["age"])          # the usual use
list(map(lambda n: n + 1, [1, 2, 3]))
```

```js
users.sort((a, b) => a.age - b.age);           // JavaScript: an arrow function
```

```java
list.removeIf(x -> x < 0);                     // Java lambda
```

Python's `lambda` is limited to a single expression, with no statements. For anything longer, write a normal `def`.

## When to use one

- A short function used once, as an argument: `key=`, `filter`, callbacks.
- When naming it would add nothing.

## When not to

- **Long or complicated logic.** A named function is easier to read, test and debug.
- **Assigning a lambda to a name** (`f = lambda x: ...`). Just use `def f(x): ...`, which also gives better stack traces.
- **Lambdas created in a loop** can capture the variable instead of its value, a classic surprise ([closures](/t/closure)):

```python
fs = [lambda: i for i in range(3)]
[f() for f in fs]      # [2, 2, 2], not [0, 1, 2]
```

Lambdas are [first-class functions](/t/first-class-function) written compactly. In JavaScript, the [arrow function](/t/arrow-function) plays the same role.
