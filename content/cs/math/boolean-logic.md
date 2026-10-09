---
title: "Boolean Logic"
summary: "AND, OR, NOT and De Morgan's laws."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["boolean algebra", "De Morgan's laws", "logic operators"]
prereqs: ["boolean"]
related: ["boolean", "conditional", "short-circuit-evaluation", "bitwise-operation", "set-theory"]
---

Boolean logic is the algebra of true and false. Three operations build everything else.

| Operation | Symbol | True when |
|---|---|---|
| **AND** | `and`, `&&` | both are true |
| **OR** | `or`, `\|\|` | at least one is true |
| **NOT** | `not`, `!` | the input is false |

A truth table lists every case:

| A | B | A and B | A or B |
|---|---|---|---|
| F | F | F | F |
| F | T | F | T |
| T | F | F | T |
| T | T | T | T |

## Useful laws

**De Morgan's laws** let you push a NOT through a condition:

```
not (A and B)  ==  (not A) or (not B)
not (A or B)   ==  (not A) and (not B)
```

```python
# "not (is_member and has_coupon)" is the same as:
(not is_member) or (not has_coupon)
```

Other handy equivalences: `not not A == A`, `A and True == A`, `A or False == A`, and the distributive form `A and (B or C) == (A and B) or (A and C)`.

## In code

- **Simplify conditions.** `if not (x > 5 and y < 3)` can read better as `if x <= 5 or y >= 3`.
- **Avoid double negatives** (`if not is_disabled`). Name booleans positively.
- **Short-circuiting** stops evaluation early ([short-circuit evaluation](/t/short-circuit-evaluation)).
- **Precedence**: `and` binds tighter than `or`. Use parentheses ([operator precedence](/t/operator-precedence)).
- **Empty cases**: `all([])` is true, `any([])` is false.

## Beyond if statements

The same logic drives SQL `WHERE` clauses (with a third value, NULL, see [NULL in SQL](/t/null-in-sql)), search filters, access rules, feature flags, and digital circuits. [Bitwise operators](/t/bitwise-operation) apply it to each bit of a number.
