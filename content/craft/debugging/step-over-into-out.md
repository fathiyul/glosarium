---
title: "Step Over, Into, Out"
summary: "Moving through code one line or one call at a time."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["step over", "step into", "step out", "stepping through code"]
prereqs: ["debugger", "breakpoint"]
related: ["debugger", "breakpoint", "stack-trace", "debugging"]
---

When a debugger is paused at a line, three stepping commands decide how to move forward.

| Command | Does | Use it when |
|---|---|---|
| **Step over** | Runs the current line completely, including any function it calls, then pauses on the next line | you trust the called function and want to stay at this level |
| **Step into** | If the line calls a function, goes inside it and pauses on its first line | you suspect the problem is inside that call |
| **Step out** | Runs the rest of the current function and pauses back at the caller | you've seen enough of this function |

There's usually also **Continue** (run until the next [breakpoint](/t/breakpoint)) and **Run to cursor**.

```python
def checkout(cart):
    order = create_order(cart)     # step over: just runs it
    total = compute_total(order)   # step into: go inside compute_total to see how it works
    return total
```

A typical session: pause at the start of the suspicious area, step over lines while watching the variables, and when a result looks wrong, step into the function that produced it. When you realize you're deep in a library or irrelevant code, step out.

## Tips

- **Watch the call stack panel**, to know where you are. Click frames to inspect the callers' variables.
- **Skip library code.** Many debuggers have "just my code" or skip-files options, so "step into" doesn't wander into framework internals.
- **Don't step through everything.** Put the breakpoint close to the problem, or use a [conditional breakpoint](/t/conditional-breakpoint).
- **Asynchronous code** steps differently. Stepping over an `await` may jump elsewhere.
- Keyboard shortcuts (often F10, F11 and Shift+F11) save lots of time.

See the [debugger](/t/debugger) and [debugging](/t/debugging).
