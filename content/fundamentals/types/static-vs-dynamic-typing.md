---
title: "Static vs Dynamic Typing"
summary: "Types checked at compile time vs at runtime."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["static typing", "dynamic typing", "statically typed", "dynamically typed"]
prereqs: ["data-type", "variable"]
related: ["strong-vs-weak-typing", "type-system", "type-annotation", "typescript", "duck-typing"]
---

Languages differ in when they check types.

- **Static typing**: types are checked **before the program runs** (at compile time). Types belong to variables and expressions, and are usually written in the code. Java, Go, Rust, C#, TypeScript.
- **Dynamic typing**: types are checked **while the program runs**. A variable can hold any type, and the value carries its type. Python, JavaScript, Ruby, PHP.

```java
int count = "five";           // compile error: String isn't int, caught before running
```

```python
count = "five"
count + 1                     # TypeError, but only when this line executes
```

## Trade-offs

| | Static | Dynamic |
|---|---|---|
| Errors found | early, before running | at runtime, maybe in production |
| Editor help | strong autocomplete and refactoring | weaker |
| Writing code | more words, more upfront decisions | faster to start, less ceremony |
| Large codebases | types act as documentation and guard rails | harder to change safely without tests |
| Flexibility | stricter | very flexible |

Neither is "better". Quick scripts and exploration favor dynamic, and big long-lived systems often benefit from static.

## The middle ground

- **Type hints in Python** (`def f(x: int) -> str`) are checked by tools like mypy, not by the interpreter.
- **TypeScript** adds static types to JavaScript, and they vanish at runtime ([TypeScript](/t/typescript)).
- **Type inference** lets static languages skip many annotations.

Static typing is a different axis from [strong vs weak typing](/t/strong-vs-weak-typing), which is about implicit conversions.

Types don't replace tests, and they can't check data that arrives at runtime ([runtime validation](/t/runtime-validation)).
