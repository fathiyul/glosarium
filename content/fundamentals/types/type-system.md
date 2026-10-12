---
title: "Type System"
summary: "The rules a language uses to assign and check types."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["type checking", "types in programming languages"]
prereqs: ["data-type"]
related: ["static-vs-dynamic-typing", "strong-vs-weak-typing", "type-inference", "generics", "structural-vs-nominal-typing"]
---

A type system is the set of rules a language uses to assign types to values and expressions, and to decide what operations are allowed on them. Its job is to catch nonsense (like multiplying a string by a date) and to describe what code expects.

Several choices shape how a type system feels:

| Question | Options |
|---|---|
| When are types checked? | before running, or at runtime ([static vs dynamic](/t/static-vs-dynamic-typing)) |
| How strict are conversions? | strict or lenient ([strong vs weak](/t/strong-vs-weak-typing)) |
| Must you write the types? | explicitly, or inferred ([type inference](/t/type-inference)) |
| Is compatibility by name or shape? | by declared name, or by structure ([structural vs nominal](/t/structural-vs-nominal-typing)) |
| Can types be parameterized? | yes, with [generics](/t/generics) |
| Can a value be one of several types? | with [unions](/t/union-type) and [discriminated unions](/t/discriminated-union) |
| Is `null` a normal value? | or tracked in the type ([nullable types](/t/nullable-type)) |

```ts
function area(r: number): number { return Math.PI * r * r; }
area("big");        // compile error: string isn't number
```

## What a type system gives you

- **Early error detection**, and fewer runtime surprises.
- **Documentation** in signatures.
- **Tooling**: autocomplete, refactoring.
- **Design pressure**: modeling the domain with types (an `OrderId` isn't a `UserId`) makes wrong states hard to write.

## Its limits

A type system proves only what it's designed to. It can't know that a string is a valid email, or that an API returned the right shape, so you still need validation and tests ([runtime validation](/t/runtime-validation)). Stronger systems can express more but are harder to learn.

When choosing a language or tool, ask what mistakes its type system can and can't catch.
