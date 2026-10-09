---
title: "Programming Paradigms"
summary: "Styles of programming: imperative, object-oriented, functional, declarative."
levels: { backend: junior, frontend: junior }
aliases: ["programming paradigms", "paradigm", "imperative", "object-oriented", "functional"]
prereqs: ["function", "class"]
related: ["oop", "functional-programming", "declarative-vs-imperative", "structured-programming"]
---

A programming paradigm is a style, or way of thinking, about how to structure a program. Most languages support several, and real code mixes them.

| Paradigm | Core idea | Examples |
|---|---|---|
| **Imperative / procedural** | a sequence of commands that change state, organized into procedures | C, shell scripts, much everyday Python |
| **Object-oriented** | objects bundle data and behavior, and communicate by calling methods ([OOP](/t/oop)) | Java, C#, Python, Ruby |
| **Functional** | build programs from functions that avoid shared mutable state ([functional programming](/t/functional-programming)) | Haskell, Elixir, and parts of JavaScript and Python |
| **Declarative** | describe the result you want, and let the system work out how ([declarative vs imperative](/t/declarative-vs-imperative)) | SQL, HTML, configuration files |
| **Event-driven / reactive** | the flow is controlled by events and callbacks | UI code, Node.js servers |
| **Logic** | state facts and rules, and let an engine search for answers | Prolog |

```python
# The same task in two styles
total = 0
for n in nums:                    # imperative
    if n % 2 == 0:
        total += n

total = sum(n for n in nums if n % 2 == 0)     # functional/declarative flavor
```

## Why learn about them

- **They give you more tools.** Some problems fit objects, some fit data transformation, some fit rules.
- **You can read more code.** Frameworks lean on a style: React is functional and declarative, Java frameworks are object-oriented.
- **Languages differ in what they encourage**, and understanding the paradigm explains the language's idioms.

## Don't be dogmatic

No paradigm is best. Modern languages are multi-paradigm, and good engineers choose the style that suits each part: a pure functional core, objects at the boundaries, declarative queries for data. Learn the ideas, and let the problem decide.
