---
title: "Boolean"
summary: "A true/false value."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["bool", "boolean value", "true false", "Boolean type"]
prereqs: ["data-type"]
related: ["conditional", "truthy-falsy", "short-circuit-evaluation", "flag-argument"]
---

A **boolean** is a value that's either **true** or **false**, named after the mathematician George Boole. It's the result of a question ("is the user an admin?") and what [conditions](/t/conditional) act on.

```python
is_admin = True
age = 20
can_vote = age >= 18         # True: comparisons produce booleans
```

## Operators

| Operator | Python | JavaScript | Meaning |
|---|---|---|---|
| AND | `and` | `&&` | both are true |
| OR | `or` | `\|\|` | at least one is true |
| NOT | `not` | `!` | flips the value |

```python
if age >= 18 and has_id:
    allow()
```

`and`/`or` stop early once the answer is known ([short-circuit evaluation](/t/short-circuit-evaluation)).

## Habits

- **Name booleans as questions**: `is_active`, `has_paid`, `can_edit` ([naming](/t/naming)).
- **Don't compare to `True`**: write `if is_active:`, not `if is_active == True:`.
- **Return the condition directly** instead of `if x: return True else: return False`: `return x > 0`.
- **Beware of truthiness.** Many languages let non-booleans act like true or false (an empty string, `0`), and the rules differ ([truthy and falsy](/t/truthy-falsy)).
- **Strings aren't booleans**: `"false"` is truthy in most languages.
- A boolean column in a database can also be `NULL`, a third state ([NULL in SQL](/t/null-in-sql)).

Too many boolean flags often hide a better model, such as one status field.
