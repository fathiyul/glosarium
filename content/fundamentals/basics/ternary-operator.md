---
title: "Ternary Operator"
summary: "A compact inline if/else expression."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["conditional operator", "inline if", "ternary expression"]
prereqs: ["conditional", "expression-vs-statement"]
related: ["conditional", "expression-vs-statement", "short-circuit-evaluation", "operator", "readability"]
---

The ternary operator is a compact inline if/else that produces a value. It takes three parts: a condition, a result if true, and a result if false.

```js
const label = age >= 18 ? "adult" : "minor";
```

```python
label = "adult" if age >= 18 else "minor"
```

Because it's an [expression](/t/expression-vs-statement), you can use it anywhere a value goes: assignments, arguments, template strings, JSX.

```js
<p>{items.length ? `${items.length} items` : "Empty"}</p>
```

## When it helps

Choosing between two simple values, with no side effects.

## When it hurts

Nesting makes it unreadable:

```js
const x = a ? b ? 1 : 2 : c ? 3 : 4;      // don't
```

Use `if/else`, an early return or a lookup table when there are more than two outcomes, or when the branches do actions rather than produce values ([conditionals](/t/conditional), [switch](/t/switch-statement)).

## Gotchas

- Both branches should return **compatible types**, or the result type becomes a union.
- It evaluates **only the chosen branch**, so it's safe for guards (`user ? user.name : "guest"`).
- For a default when a value is missing, `??` (JavaScript) or `or` (Python) is shorter, but mind the [truthy rules](/t/truthy-falsy).
- Python's order is unusual: value-if-true comes first, then the condition.

Rule of thumb: if you have to read it twice, write it as an `if`.
