---
title: "Global Variable"
summary: "A variable visible everywhere, and why it makes code hard to reason about."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["global state", "global scope", "globals"]
prereqs: ["variable", "scope"]
related: ["scope", "shadowing", "constant", "thread-safety", "dependency-injection"]
---

A global variable is declared outside any function, so every part of the program can read it, and often change it.

```python
counter = 0

def increment():
    global counter       # needed in Python to assign to a global
    counter += 1
```

## Why they cause trouble

Anything can change a global, so to understand one function you have to know everything else that might touch it.

- **Hidden inputs.** `price()` gives different answers depending on a global `discount` set elsewhere.
- **Hard to test.** Tests leak state into each other. One test sets `counter`, and the next one starts with a surprise value.
- **Order dependence.** The code works only if things run in a certain order.
- **Concurrency bugs.** Two threads or requests updating the same global is a [race condition](/t/race-condition). In a web server, a module-level variable is shared by every request.

## Better options

- **Pass values in** as arguments and return results.
- **Group state in an object** that's created and passed where needed ([dependency injection](/t/dependency-injection)).
- **Use constants** for fixed values (`MAX_RETRIES = 3`). Globals that never change are fine ([constants](/t/constant)).
- **Put configuration in one place** and read it from there ([configuration](/t/app-configuration)).

## Name clashes

A local variable with the same name as a global hides it inside the function ([shadowing](/t/shadowing)). In JavaScript, a forgotten `let` can create an accidental global, which is why `"use strict"` and modules exist.
