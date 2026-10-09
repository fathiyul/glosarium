---
title: "Syntax vs Semantics"
summary: "What code looks like vs what it means."
levels: { backend: junior, frontend: junior }
aliases: ["syntax", "semantics", "syntax error vs logic error"]
prereqs: ["expression-vs-statement"]
related: ["reading-error-messages", "debugging", "type-system", "compiled-vs-interpreted"]
---

Syntax is the form of code: the rules about how it must be written. Semantics is its meaning: what it actually does when it runs.

```python
x = 5 +            # syntax error: the statement is incomplete

def average(a, b):
    return a + b / 2        # valid syntax, but the meaning is wrong: operator precedence
```

The second line is perfectly legal, and does the wrong thing: it computes `a + (b / 2)`, not `(a + b) / 2`.

## Two kinds of mistakes

| | Syntax error | Semantic (logic) error |
|---|---|---|
| What's wrong | the code breaks the language's grammar | the code is valid but doesn't do what you intended |
| Who finds it | the compiler or interpreter, immediately | you, by testing and debugging |
| Message | "SyntaxError: unexpected token" | none: wrong output, or a runtime error later |
| Examples | missing bracket or colon, unclosed string | off-by-one, wrong operator, wrong variable |

```python
for i in range(10)          # SyntaxError: expected ':'
    print(i)

if user.age > 18:           # valid, but should it be >= 18? A semantic question
```

## In between: type and runtime errors

- **Type errors** (adding a string and a number) are detected by a compiler or type checker before running in some languages, and at run time in others ([type systems](/t/type-system)).
- **Runtime errors** (dividing by zero, a missing key) occur while running ([exceptions](/t/exception)).

## What to do

- **Syntax errors**: read the message and look at the line, and often the line **before** it, since a missing bracket is reported where the parser gets confused ([reading error messages](/t/reading-error-messages)). Editors with highlighting and formatters catch most of them.
- **Semantic errors**: need tests, careful reading and debugging ([debugging](/t/debugging)).

Learning syntax is the easy part. The hard part, and the real skill, is getting the meaning right.
