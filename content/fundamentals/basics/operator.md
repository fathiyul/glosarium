---
title: "Operator"
summary: "A symbol that performs an operation on values, like +, == or &&."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["operators", "symbols in code"]
prereqs: ["expression-vs-statement"]
related: ["operator-precedence", "boolean", "short-circuit-evaluation", "ternary-operator", "type-coercion"]
---

An operator is a symbol (or keyword) that performs an operation on values, called operands. `+`, `==` and `&&` are all operators.

| Kind | Examples |
|---|---|
| Arithmetic | `+ - * / % **` |
| Comparison | `== != < > <= >=` |
| Logical | `and or not` (Python), `&& \|\| !` (JavaScript) |
| Assignment | `= += -= *=` |
| Membership | `in`, `not in` (Python) |
| Bitwise | `& \| ^ << >>` ([bitwise operations](/t/bitwise-operation)) |

```python
total = price * qty + shipping      # arithmetic and assignment
ok = age >= 18 and not banned       # comparison and logic
"a" in "cat"                        # True
```

A **unary** operator takes one operand (`-x`, `!flag`), a **binary** one takes two (`a + b`), and the ternary `cond ? a : b` takes three ([ternary operator](/t/ternary-operator)).

## Traps

- **`=` vs `==`.** One assigns, the other compares.
- **`+` means different things** for numbers (add) and strings (join), and mixing them can fail or coerce ([type coercion](/t/type-coercion)).
- **`/`** divides as floats in Python 3 and JavaScript, but as integers in some languages.
- **Chained comparison** works as math in Python (`1 < x < 10`), not in most others.
- **Order of evaluation** is set by [precedence](/t/operator-precedence). When unsure, use parentheses.
