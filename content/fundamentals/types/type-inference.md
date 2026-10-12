---
title: "Type Inference"
summary: "The compiler working out types without annotations."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["type inference", "inferred types"]
prereqs: ["variable"]
related: ["structural-vs-nominal-typing", "type-guard", "duck-typing"]
---

Type inference is the compiler working out a value's type from how it's used or assigned, so you don't have to write it down. Most statically typed languages do some of this, and newer type checkers for Python and JavaScript-like languages do too.

```typescript
const prices = [12, 3.5, 8];                                    // inferred: number[]
const total = prices.reduce((sum, p) => sum + p, 0);            // inferred: number

let label = "order";   // inferred: string
label = 42;            // error: Type 'number' is not assignable to type 'string'
```

Inference keeps code short and still checks it. You annotate the parts other code depends on, such as function parameters and exported types, and let the compiler handle local variables.

The trade-off is that inferred types can be wider or stranger than you expected, and the error message may point at a use site far from the cause. An empty array `[]` infers as a type you may not want, and a function's return type can change silently when its body changes. Explicit annotations at module boundaries make those changes visible in review.

The classic mistake is relying on inference for public function signatures. A small edit inside the function can change the type that callers depend on, and the break shows up in other files. Annotate the return type of exported functions, and let inference handle the rest. [Structural typing](/t/structural-vs-nominal-typing) decides what the inferred shapes mean.
