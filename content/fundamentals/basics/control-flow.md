---
title: "Control Flow"
summary: "The order in which statements execute: branches, loops, returns."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["flow of control", "program flow", "execution order", "flow control"]
prereqs: ["conditional", "loop"]
related: ["conditional", "loop", "return-value", "function", "iteration", "switch-statement"]
---

**Control flow** is the **order in which a program's statements run**. By default, lines run top to bottom. Control flow structures change that order.

| Structure | What it does | Examples |
|---|---|---|
| **Sequence** | One statement after another | the default |
| **Branching** | Choose a path | [`if/else`](/t/conditional), [`switch`](/t/switch-statement), [ternary](/t/ternary-operator) |
| **Loops** | Repeat | [`for`, `while`](/t/loop) |
| **Jumps** | Leave early or skip | `return`, `break`, `continue` |
| **Function calls** | Go into another function, then come back | [functions](/t/function) |
| **Exceptions** | Jump out when something goes wrong | `try/except`, `throw` |

```python
def first_negative(numbers):
    for n in numbers:          # loop
        if n < 0:              # branch
            return n           # jump out early
    return None                # reached only if no negative was found
```

## Reading code by following the flow

When debugging, ask: **which path did execution take?** Add a print or use a [debugger](/t/debugger) to step through, and see which branches ran and which loops repeated.

## Habits

- **Keep it simple.** Deep nesting and many exits are hard to follow. Use [guard clauses](/t/guard-clause) to handle special cases early.
- **Make every branch intentional**: what if none of the conditions match?
- **Avoid hidden flow**: exceptions and callbacks make the path less visible, so document them.
- **Watch loops for exits**: an infinite loop is a flow with no way out.

Asynchronous code adds another kind of flow, where work continues later ([async/await](/t/async-await)).
