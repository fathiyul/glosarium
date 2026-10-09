---
title: "Conditional (if/else)"
summary: "Running different code depending on a condition."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["if else", "if statement", "conditional statement", "branching", "if/else"]
prereqs: ["boolean"]
related: ["control-flow", "switch-statement", "ternary-operator", "guard-clause", "short-circuit-evaluation"]
---

A **conditional** runs different code depending on whether a condition is true. It's how programs make decisions.

```python
if age >= 18:
    print("adult")
elif age >= 13:
    print("teen")
else:
    print("child")
```

```js
if (age >= 18) { ... } else if (age >= 13) { ... } else { ... }
```

The conditions are checked **top to bottom**, and only the **first branch whose condition is true** runs.

## Things to know

- **Conditions are [booleans](/t/boolean)**, or values the language treats as true or false ([truthy and falsy](/t/truthy-falsy)).
- **Order matters**: put the most specific condition first. `if age >= 13` before `if age >= 18` would catch adults too.
- **`=` vs `==`**: `=` assigns, `==` compares (and in JavaScript, prefer `===`, see [== vs ===](/t/equality-js)).
- **Combine conditions** with `and`/`or` (`&&`/`||`), and use parentheses when mixing them.
- **Avoid deep nesting.** Use early returns ([guard clauses](/t/guard-clause)).
- **Cover the `else`**: what happens when none match? Unhandled cases cause bugs.

## Alternatives

| For | Use |
|---|---|
| Choosing between many fixed values | a [switch statement](/t/switch-statement) or a dictionary lookup |
| A simple value choice | a [ternary operator](/t/ternary-operator): `x = a if cond else b` |
| Replacing repeated `if` chains on type | polymorphism or a lookup table |

A function full of nested conditions is a sign to split it up. See [control flow](/t/control-flow).
