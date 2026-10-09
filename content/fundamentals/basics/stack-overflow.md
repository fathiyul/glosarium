---
title: "Stack Overflow"
summary: "Crashing when the call stack runs out of space, usually from runaway recursion."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["stack overflow error", "call stack overflow", "RecursionError", "maximum call stack size exceeded"]
prereqs: ["recursion", "function"]
related: ["recursion", "base-case", "tail-recursion", "stack-vs-heap", "stack-trace"]
---

A stack overflow happens when the call stack runs out of space. Each function call adds a frame to the stack (its arguments and local variables), and frames are removed when the function returns. Too many nested calls, and the stack fills up.

```python
def forever(n):
    return forever(n + 1)      # no base case

forever(0)
# RecursionError: maximum recursion depth exceeded
```

```js
// RangeError: Maximum call stack size exceeded
```

In languages like C, Java and Go, you may see a crash or a `StackOverflowError`.

## Usual causes

- **Recursion with no base case**, or one that's never reached ([base case](/t/base-case)).
- **Recursion that is correct but too deep**: a recursive walk over a list of 100,000 items.
- **Accidental mutual recursion**: `a()` calls `b()` which calls `a()`. Common with getters or `toString` calling each other, or an event handler that triggers itself.
- Very large local variables in each frame.

## Fixing it

1. **Find the loop.** The [stack trace](/t/stack-trace) repeats the same few functions many times.
2. **Check the base case** and that each call gets closer to it.
3. **Switch to a [loop](/t/loop)** with your own stack or queue for deep structures.
4. Make sure that the language can optimize [tail calls](/t/tail-recursion) before relying on it. Most mainstream ones don't.
5. As a last resort, raise the limit. That only postpones the problem.

Don't confuse it with the Q&A site of the same name. This is the error.
