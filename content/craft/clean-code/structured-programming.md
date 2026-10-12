---
title: "Structured Programming"
summary: "Building programs from sequence, selection and loops instead of goto."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["structured code", "goto considered harmful"]
prereqs: ["control-flow"]
related: ["control-flow", "conditional", "loop", "function", "spaghetti-code"]
---

Structured programming is the idea that programs should be built from three basic structures, instead of arbitrary jumps:

1. **Sequence**: statements run one after another.
2. **Selection**: choose a path (`if`, `else`, `switch`) ([conditionals](/t/conditional)).
3. **Iteration**: repeat (`for`, `while`) ([loops](/t/loop)).

plus **functions** to name and reuse blocks. The point is that each piece has one entry and one exit, so you can understand it in isolation.

## The problem it fixed

Early languages used `goto` to jump to any labeled line. Programs became tangled paths that could only be understood by tracing every jump, called [spaghetti code](/t/spaghetti-code). In 1968, Edsger Dijkstra wrote the letter "Go To Statement Considered Harmful" arguing for structured control flow instead.

```
10 IF X > 5 GOTO 50
20 PRINT "small"
30 GOTO 70
50 PRINT "big"
70 ...
```

becomes:

```python
if x > 5:
    print("big")
else:
    print("small")
```

## Today

Every mainstream language is structured, and `goto` is rare. You still meet its relatives:

- **Early `return`, `break` and `continue`** are limited, controlled jumps. They're fine when they make code clearer ([guard clauses](/t/guard-clause)).
- **Exceptions** jump out of nested code, which needs discipline ([exceptions](/t/exception)).
- **Callbacks and async code** can scatter control flow across places ([callback hell](/t/callback-hell)).

## The lasting lesson

Make the path through the code easy to follow: small functions, limited nesting ([deep nesting](/t/nesting-depth)), and clear structure. Complex, jumpy control flow is where bugs hide.
