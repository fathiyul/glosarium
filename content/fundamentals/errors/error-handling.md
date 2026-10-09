---
title: "Error Handling"
summary: "Anticipating, detecting and responding to things going wrong."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["exception handling", "handling errors"]
prereqs: ["exception", "conditional"]
related: ["exception", "try-catch", "throw", "fail-fast", "graceful-degradation", "error-swallowing"]
---

Error handling is anticipating that things will go wrong (bad input, missing files, network failures, bugs) and deciding what the program does about each.

Some errors you can handle, some you can only report:

| Situation | Reasonable response |
|---|---|
| User typed an invalid value | tell them what's wrong, keep their input |
| A network call timed out | retry with backoff, then fail clearly ([retry with backoff](/t/retry-with-backoff)) |
| A file is missing | use a default, or stop with a clear message |
| A bug (a `None` where it shouldn't be) | fail loudly, log with details, fix the code |

```python
try:
    config = load_config(path)
except FileNotFoundError:
    config = default_config()           # a case you can recover from
```

## Principles

- **Handle errors where you know what to do.** Low-level code often can't decide, so it lets the error rise to code that can ([exceptions](/t/exception)).
- **Catch specific errors**, not everything ([try/catch](/t/try-catch)).
- **Don't ignore them.** Swallowing hides bugs ([swallowing errors](/t/error-swallowing)).
- **Fail fast** when something's wrong, instead of carrying bad data forward ([fail fast](/t/fail-fast)).
- **Clean up.** Close files and connections in `finally` or `with` blocks.
- **Give useful messages**: what failed, with which input, and what to do next. Don't leak secrets or internals to users.
- **Log the details** for developers, with the stack trace ([logging](/t/logging)).
- **Think about the unhappy path early.** What if the list is empty, the API returns 500, the disk is full?
- Make retries safe (idempotent), and degrade gracefully where possible ([graceful degradation](/t/graceful-degradation)).
