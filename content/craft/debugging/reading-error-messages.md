---
title: "Reading Error Messages"
summary: "Actually reading the error: the first and most skipped debugging step."
levels: { backend: junior, frontend: junior }
aliases: ["error messages", "reading errors", "understanding errors"]
prereqs: ["stack-trace"]
related: ["stack-trace", "debugging", "exception", "minimal-reproducible-example", "print-debugging"]
core: [backend, frontend]
---

The most common debugging mistake is not reading the error carefully. Most error messages
tell you what went wrong and where. Skipping them to try random fixes wastes time.

## Read it in this order

1. **The error type and message.** `KeyError: 'price'`, `TypeError: x is not a function`.
   The type narrows down the *kind* of problem; the message names the specific value.
2. **The location.** File, line and column of the failing line, usually in the
   [stack trace](/t/stack-trace). Find the first line that is *your* code.
3. **The code at that line.** What values are involved? Which one could be `None`, missing,
   or the wrong type?
4. **The context.** What was the program doing? What input triggered it?

```
TypeError: Cannot read properties of undefined (reading 'name')
    at renderUser (profile.js:12:25)
```

Translation: on line 12, something called `.name` on a value that was `undefined`. So
the thing before `.name` is missing. Now you know exactly what to check.

## Common patterns

| Message says | Usually means |
|---|---|
| "is not defined" / `NameError` | A typo, or the variable isn't in scope or isn't imported |
| "undefined / None has no attribute" | A value you expected to exist doesn't |
| "unexpected token" / `SyntaxError` | A missing bracket, quote or comma, often *before* the reported line |
| "connection refused" / "timeout" | The other service isn't reachable or running |
| "permission denied" / 403 | Authentication or access problem |

## Habits

- **Read the whole message**, including the lines under it.
- **Don't fix the symptom.** Find out *why* the value is missing.
- **Search the exact message** (without your own names) if it's unfamiliar. Others have
  hit it.
- **Include the full error** when you ask for help, plus what you've tried.

If the message is unclear, see [debugging](/t/debugging) for the next steps.
