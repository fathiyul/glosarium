---
title: "Algebraic Data Types"
summary: "Composing types from \"and\" (products) and \"or\" (sums)."
levels: { backend: senior, frontend: senior, data-engineer: senior }
aliases: ["algebraic data types", "ADT", "sum and product types"]
prereqs: ["type-system", "enum"]
related: ["union-type", "discriminated-union", "option-type", "result-type", "pattern-matching"]
---

**Algebraic data types** are types built by combining other types in two ways:

- **Products** — "and": a value holds *all* of several fields. A struct, a tuple, a record. `Point = (Int, Int)` has an x *and* a y.
- **Sums** — "or": a value holds *exactly one* of several alternatives. An enum, a tagged union. `Shape = Circle | Square` is a Circle *or* a Square.

That's the whole idea, and it's why they're called algebraic: you compose small types into bigger ones with two operations, the way you'd build arithmetic expressions.

The power shows in types like option and result:

```text
Option<T> = None | Some(T)
Result<T, E> = Ok(T) | Err(E)
```

A value of `Option<T>` is either absent or present — and crucially, *nothing else*. There's no way to have a "value with a flag saying maybe", so illegal states can't be represented.

The classic mistakes:

- Boolean flags instead of sums. Modelling "loading / loaded / failed" with `isLoading` and `hasError` booleans lets you write impossible combinations (`isLoading` and `hasError` at once). A sum type makes the states mutually exclusive.
- Null instead of a sum. Using `null` to mean "absent" lets it leak anywhere; `Option<T>` makes handling absence mandatory (see [option types](/t/option-type)).
- Not matching exhaustively. Sums work best with [pattern matching](/t/pattern-matching), where the compiler can require you to handle every alternative. Ignoring a case is a common bug when the language doesn't enforce it.
- Worshiping them. Sometimes a simple boolean is genuinely fine. Reach for sums when the set of states is more than two or the combinations are error-prone.

They're the reason modern type systems (Rust enums, TypeScript [discriminated unions](/t/discriminated-union), Haskell data types) let you model a domain so precisely that whole classes of bugs become unrepresentable. See [union types](/t/union-type) for the "or" half in more detail.
