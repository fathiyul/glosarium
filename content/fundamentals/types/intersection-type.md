---
title: "Intersection Type"
summary: "A type combining all the members of several types."
levels: { frontend: mid-level , data-scientist: junior }
aliases: ["intersection", "type intersection"]
prereqs: ["interface"]
related: ["structural-vs-nominal-typing", "type-guard", "interface"]
---

An intersection type combines several types into one, so a value must satisfy all of them at once. In TypeScript you write it with `&`:

```typescript
type Named = { name: string };
type Aged = { age: number };
type Person = Named & Aged;

const ada: Person = { name: "Ada", age: 36 };   // must have both name and age
// const bad: Person = { name: "Ada" };          // error: age is missing
```

A `Person` has every property of `Named` and every property of `Aged`. This is a convenient way to build a type from smaller pieces, especially when a function takes an argument that combines several capabilities.

The trade-off is readability and conflicts. When two members share a name with incompatible types, the result can become `never`, a type no value can have, and the error may appear far from the declaration. Long chains of intersections are also hard to read in editor hover text. An [interface](/t/interface) that extends another gives a similar result with a clearer error message when the types disagree.

The classic mistake is treating an intersection as a union, or assuming it's a dictionary merge at runtime. The `&` only exists in the type system. The actual value is just one object, and nothing is combined when the code runs. Also, a [type guard](/t/type-guard) can narrow a value to an intersection, but it only checks what you tell it to check.
