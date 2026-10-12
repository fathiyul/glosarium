---
title: "Type Coercion"
summary: "Implicit conversion by the language, like \"5\" + 1 in JavaScript."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["implicit conversion", "automatic type conversion"]
prereqs: ["data-type"]
related: ["type-conversion", "equality-js", "truthy-falsy", "static-vs-dynamic-typing", "strong-vs-weak-typing"]
---

Type coercion is the language converting a value from one type to another for you, implicitly, so that an operation can go ahead. It's the opposite of explicit [type conversion](/t/type-conversion), where you call `int()` or `Number()` yourself.

JavaScript is famous for it:

```js
"5" + 1       // "51"    number turned into a string
"5" - 1       // 4       string turned into a number
"5" * "2"     // 10
true + 1      // 2
[] + {}       // "[object Object]"
null == 0     // false, but null >= 0 is true
```

The same `+` does different things depending on the types, and the rules are hard to remember.

## Languages differ

- **JavaScript, PHP, SQL (some dialects)**: lots of implicit coercion.
- **Python, Go, Rust, Java (mostly)**: refuse most mixes, and raise a `TypeError` instead:

```python
"5" + 1       # TypeError: can only concatenate str to str
```

Python does coerce some numbers: `1 + 2.5` is `3.5`, and `True + 1` is `2`.

## Why it bites

- Form and URL values arrive as strings, and arithmetic silently does the wrong thing.
- Loose equality `==` converts types first, so `0 == ""` is true ([== vs ===](/t/equality-js)).
- Conditions treat many values as true or false ([truthy and falsy](/t/truthy-falsy)).
- Database comparisons between a string column and a number can skip indexes.

## Defenses

- **Convert explicitly** at the boundary (`int(value)`, `Number(value)`) and validate the result.
- **Use strict equality** (`===`).
- **Use a typed language or TypeScript** to catch mixes early ([static vs dynamic typing](/t/static-vs-dynamic-typing)).
- When a result looks absurd (`"11"` instead of `2`), suspect coercion.
