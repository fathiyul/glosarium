---
title: "Strong vs Weak Typing"
summary: "How willingly a language converts between types implicitly."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["strongly typed", "weakly typed", "strong typing", "weak typing"]
prereqs: ["static-vs-dynamic-typing", "type-coercion"]
related: ["type-coercion", "static-vs-dynamic-typing", "type-conversion", "type-system", "equality-js"]
---

Strong versus weak typing describes how willing a language is to convert between types implicitly. The terms are informal, and people use them differently, but the usual idea is:

- **Stronger typing**: mixing incompatible types is an error. You convert explicitly.
- **Weaker typing**: the language quietly converts types to make an operation work.

```python
"5" + 1        # TypeError: Python won't guess
"5" + str(1)   # "51"   you decide
```

```js
"5" + 1        // "51"   JavaScript converted 1 to a string
"5" - 1        // 4      and here it converted "5" to a number
```

By this measure, Python is strongly (and dynamically) typed, and JavaScript is weakly (and dynamically) typed. C is statically but fairly weakly typed (it lets you reinterpret memory). Java and Rust are static and strong.

## It's separate from static vs dynamic

| | Static | Dynamic |
|---|---|---|
| **Strong** | Java, Rust, Go | Python, Ruby |
| **Weak** | C | JavaScript, PHP |

[Static vs dynamic](/t/static-vs-dynamic-typing) is about **when** types are checked. Strong vs weak is about **how strict** the rules are.

## Why it matters

Weak typing hides mistakes: `"10" > "9"` is false in JavaScript string comparison, `[] + {}` produces text, and `null == 0` behaves oddly ([type coercion](/t/type-coercion), [== vs ===](/t/equality-js)). Strong typing makes surprises into loud errors, sooner.

## Practical advice

- In weakly typed languages, **convert explicitly** at the boundaries and use strict comparison.
- Use a type checker or TypeScript to add guard rails.
- Don't rely on the terms in arguments. Say exactly what you mean: "implicit conversion" or "checked at compile time".
