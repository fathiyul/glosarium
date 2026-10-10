---
title: "Type Guard"
summary: "A check that tells the type checker a value's specific type."
levels: { frontend: mid-level }
aliases: ["user-defined type guard", "narrowing"]
prereqs: ["intersection-type"]
related: ["intersection-type", "type-inference", "structural-vs-nominal-typing"]
---

A type guard is a function that checks a value at runtime and tells the type checker what type it has. In TypeScript, the return type `x is Something` does this. Inside an `if` that uses the guard, the compiler narrows the value to that type.

```typescript
function isString(value: unknown): value is string {
  return typeof value === "string";
}

function shout(value: unknown): string {
  if (isString(value)) {
    return value.toUpperCase();   // value is string here
  }
  return "not text";
}

shout("hello");   // "HELLO"
shout(42);        // "not text"
```

Without the guard, the compiler wouldn't know `value` has a `toUpperCase` method, and the code wouldn't compile. The guard does the runtime check and records the result for the compiler.

The trade-off is trust. The compiler accepts whatever the guard says, so a guard that checks too little, or the wrong thing, produces unsafe code that looks type-checked. The guard's body is ordinary code, and TypeScript doesn't verify that it matches the claim in the return type.

The classic mistake is writing a guard that only checks part of the shape, such as `typeof value === "object"`, and then claiming `value is User`. Any object passes, and later code fails on a missing field. Check the properties the rest of the code relies on, or validate with a schema library so the check and the type come from one definition. For combining guarded types, see [intersection types](/t/intersection-type).
