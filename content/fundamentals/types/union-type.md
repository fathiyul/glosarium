---
title: "Union Type"
summary: "A value that can be one of several types."
levels: { backend: mid-level, frontend: junior, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["union", "sum type", "string | number"]
prereqs: ["type-annotation", "type-alias"]
related: ["discriminated-union", "type-narrowing", "nullable-type", "intersection-type", "enum"]
---

A union type says a value can be one of several types. You write it with a pipe.

```ts
type Id = string | number;
let id: Id = "abc";
id = 42;                    // also fine

type Status = "pending" | "paid" | "shipped";    // a union of literal values
let s: Status = "paid";
s = "refunded";                                  // error: not in the union
```

```python
def show(x: int | str) -> str:        # Python 3.10+
    ...
```

A very common union is "a value or nothing": `string | null` ([nullable types](/t/nullable-type)).

## Using a union

Before you use a value, you must work out which member it is. The compiler narrows the type as you check ([type narrowing](/t/type-narrowing)):

```ts
function format(x: string | number) {
  if (typeof x === "string") return x.toUpperCase();   // x is string here
  return x.toFixed(2);                                 // x is number here
}
```

Calling a method that only one member has is an error until you narrow.

## Where unions shine

- **Fixed sets of strings**, as a lighter alternative to an enum ([enums](/t/enum)).
- **Functions that accept several kinds of input.**
- **Results that vary**: `{ ok: true, value } | { ok: false, error }`. Adding a tag field makes this a [discriminated union](/t/discriminated-union).
- **Optional values.**

## Cautions

- **Don't let unions grow without limit.** A function accepting ten different shapes is doing too much.
- **Unions exist only at compile time** in TypeScript. At runtime you still have to check ([runtime validation](/t/runtime-validation)).
- Prefer a tagged union over guessing the shape from which fields exist.
