---
title: "Breakpoint"
summary: "A place where the debugger pauses execution."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["breakpoints", "debugger breakpoint", "set breakpoint"]
prereqs: ["debugger"]
related: ["debugger", "conditional-breakpoint", "step-over-into-out", "print-debugging", "browser-devtools"]
---

A breakpoint is a marker you place on a line of code, telling the debugger to pause the program just before running it. While paused, you can inspect the variables, the call stack and the state, and then continue step by step.

```python
def total(items):
    subtotal = sum(i.price for i in items)
    breakpoint()                 # Python: pause here (opens pdb)
    return subtotal * 1.2
```

```js
function total(items) {
  debugger;                      // JavaScript: pauses here when DevTools is open
}
```

In editors and browser DevTools, you usually click in the gutter next to a line number to set one, with no code change.

## What you can do when paused

- **See variable values** at that exact moment.
- **Look at the call stack**: how did execution get here?
- **Evaluate expressions** in the current context.
- **Step** through the next lines ([step over, into, out](/t/step-over-into-out)).
- **Continue** to the next breakpoint.

## Variants

- **[Conditional breakpoints](/t/conditional-breakpoint)** pause only when an expression is true (`user_id == 42`), which is great inside loops.
- **Logpoints** print a message without pausing or editing the code.
- **Exception breakpoints** pause when an error is thrown.

## Tips

- Put the breakpoint **just before** the suspected problem, not at the program's start.
- **Remove** `breakpoint()` and `debugger;` statements before committing.
- A breakpoint in code that never runs never pauses. Check that you've set it in the right file and version, and that source maps are loaded for built code ([source maps](/t/source-map)).
- Don't pause production processes casually. Pausing a server freezes requests.

See the [debugger](/t/debugger) for the bigger picture.
