---
title: "Operator Precedence"
summary: "The rules for which operators bind first in an expression."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["order of operations", "operator priority", "precedence rules"]
prereqs: ["operator"]
related: ["operator", "expression-vs-statement", "boolean", "short-circuit-evaluation"]
---

Operator precedence decides which operators apply first in an expression without parentheses, like the school rule that multiplication comes before addition.

```python
2 + 3 * 4        # 14, not 20: * binds tighter than +
(2 + 3) * 4      # 20
```

## A rough order, highest first

1. Parentheses and calls
2. Exponent (`**`)
3. Unary `-`, `not`, `!`
4. `* / %`
5. `+ -`
6. Comparisons (`< == >=`)
7. `and` / `&&`
8. `or` / `||`
9. Assignment

The exact table differs between languages, so check yours.

## Where it bites

```python
if a or b and c:         # means: a or (b and c)
if not x == y:           # Python: not (x == y)
```

`and` binds tighter than `or`, so mixing them without brackets is a classic source of wrong conditions. In JavaScript, `&&` over `||` behaves the same way, and `??` can't be mixed with them without parentheses.

```js
const label = "Total: " + 2 + 3;     // "Total: 23", not "Total: 5"
```

Evaluation goes left to right for operators of equal precedence (mostly), so string concatenation happens before the second `+`.

## The practical rule

You don't need to memorize the table. **Add parentheses** whenever readers might have to think about it. `(a and b) or c` costs nothing and removes doubt. If an expression needs a precedence table to understand, split it into named steps ([readability](/t/readability)).
