---
title: "Debugger"
summary: "A tool to pause code, inspect variables and step through execution."
levels: { backend: junior, frontend: junior }
aliases: ["interactive debugger", "debug mode", "step debugger"]
prereqs: ["debugging"]
related: ["breakpoint", "conditional-breakpoint", "step-over-into-out", "print-debugging", "browser-devtools"]
core: [backend, frontend]
---

A **debugger** lets you pause a running program, look at the values of its variables and run
it one step at a time. Instead of guessing from output, you watch what actually happens.

## The core moves

1. Set a [**breakpoint**](/t/breakpoint) on a line you're curious about.
2. Run the program in debug mode. It stops just before that line.
3. **Inspect**: hover or look at the variables panel to see their current values.
4. **Step** through the code with [step over / into / out](/t/step-over-into-out):
   - *over*: run this line and stop at the next,
   - *into*: go inside the function being called,
   - *out*: finish the current function and return to the caller.
5. **Continue** to run until the next breakpoint.

Most tools also have a **call stack** view (how you got here), **watch expressions** and
[conditional breakpoints](/t/conditional-breakpoint) that stop only when something is true.

## Where to find one

- **Editors and IDEs**: VS Code, JetBrains IDEs and others have debuggers built in for most
  languages.
- **The browser**: the Sources panel in [DevTools](/t/browser-devtools).
- **Command line**: Python has `breakpoint()` (which opens `pdb`); Node can be started with
  `--inspect`.

```python
def total(items):
    breakpoint()          # pauses here in the debugger
    return sum(i.price for i in items)
```

## Debugger or print statements?

[Print debugging](/t/print-debugging) is quick and works anywhere. A debugger is better when
you don't yet know *which* value matters, since you can look at everything at that moment
without re-running. Learn both. Remove `breakpoint()` and `debugger;` before committing.
