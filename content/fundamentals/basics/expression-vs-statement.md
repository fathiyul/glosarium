---
title: "Expression vs Statement"
summary: "An expression produces a value; a statement performs an action."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["expressions and statements", "statement vs expression", "expression", "statement"]
prereqs: ["operator", "variable"]
related: ["ternary-operator", "conditional", "function", "return-value", "operator-precedence"]
---

- An **expression** **produces a value**: `2 + 3`, `price * quantity`, `len(items)`, `user.name`.
- A **statement** **performs an action**: assigning a variable, running a loop, returning, importing.

```python
x = 2 + 3          # statement: assignment; "2 + 3" is the expression inside
print(x * 2)       # statement; "x * 2" is an expression

if x > 3:          # statement
    ...
```

A simple test: **can you put it where a value is expected**, such as inside parentheses, as a function argument or on the right of `=`?

```python
foo(2 + 3)         # fine: an expression
foo(x = 3)         # a statement can't go here (in Python)
```

## Where languages differ

- In **JavaScript and Python**, `if` is a **statement**. To choose a value, use the [ternary](/t/ternary-operator) expression: `a if cond else b` (Python) or `cond ? a : b` (JavaScript).
- In **Rust, Ruby and many functional languages**, `if` and `match` are **expressions** that return values, so `let x = if cond { 1 } else { 2 };` works.
- A **function call** is an expression. Its **definition** is a statement (but a `lambda` or arrow function is an expression).

```js
const label = isAdmin ? "Admin" : "User";    // choose a value: expression
```

## Why it matters

- **Syntax errors**: "invalid syntax" often means a statement was placed where an expression was expected.
- **Arrow functions and lambdas** can only contain expressions (in Python's `lambda`).
- **Templates and JSX** (`{ ... }`) accept only expressions, so you use ternaries and `.map()`, not `if` and `for`.
- **Readable code**: prefer expressions for computing values, statements for actions.

An expression can also have a **side effect** (`i++`, a function call that writes a file), so "produces a value" is not the same as "pure".
