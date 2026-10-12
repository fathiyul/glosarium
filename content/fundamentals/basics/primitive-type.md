---
title: "Primitive Type"
summary: "A built-in basic type such as integer, float, boolean or character."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["primitive data type", "primitives", "built-in type", "scalar type"]
prereqs: ["data-type"]
related: ["data-type", "integer", "floating-point", "boolean", "string", "mutable-vs-immutable"]
---

A primitive type is one of the basic, built-in types that a language provides, from which everything else is built. They hold a single simple value, as opposed to a collection or an object.

| Primitive | Examples |
|---|---|
| Integer | `42` ([integers](/t/integer)) |
| Floating point | `3.14` ([floating point](/t/floating-point)) |
| Boolean | `true` ([boolean](/t/boolean)) |
| Character / string | `"a"`, `"hello"` ([strings](/t/string)) |
| Null / none | `null`, `None` ([null](/t/null)) |

Which types count as primitive depends on the language. JavaScript's are `string`, `number`, `bigint`, `boolean`, `undefined`, `null` and `symbol`. Java has `int`, `double`, `boolean`, `char` and a few more, with strings as objects. In Python, everything is technically an object, but people still call numbers, strings and booleans the basic types.

## What primitives have in common

- **They're compared by value.** `5 === 5` is true. Objects are compared by identity ([equality vs identity](/t/equality-vs-identity)).
- **They're immutable** in most languages. You can't change the number 5, only replace a variable's value ([mutable vs immutable](/t/mutable-vs-immutable)).
- **Copying one copies the value**, so changing the copy doesn't change the original.

```js
let a = 5;
let b = a;
b = 10;        // a is still 5
```

## Why it matters

Primitives behave differently from objects and arrays when you pass them around or compare them. Knowing which you have explains many surprises ([pass by value vs reference](/t/pass-by-value-vs-reference)).
