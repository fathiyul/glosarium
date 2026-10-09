---
title: "Swallowing Errors"
summary: "Catching an error and ignoring it, which hides bugs."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["swallowed exception", "empty catch block", "silent failure", "except pass"]
prereqs: ["try-catch", "exception"]
related: ["try-catch", "error-handling", "logging", "fail-fast", "exception"]
---

Swallowing an error means catching it and doing nothing. The program carries on as if nothing happened, and the bug disappears from view.

```python
try:
    save_order(order)
except Exception:
    pass                    # the order wasn't saved, and nobody will ever know
```

```js
try { await charge(card); } catch (e) {}      // the user thinks they paid
```

## Why it's so harmful

- **Failures become invisible.** There's no log and no alert, so you hear about it from an angry customer.
- **Bad state continues.** Later code runs on data that was never saved or loaded.
- **Debugging is hard.** The symptom appears far from the cause.

## What to do instead

- **Handle it**, if you know a sensible recovery: retry, a default, a clear message to the user.
- **Log it with the stack trace**, if you must continue ([logging](/t/logging)).
- **Let it rise** if this code can't deal with it. You don't have to catch everything.
- **Re-raise** after cleanup or logging: `raise`.
- **Catch specifically.** `except FileNotFoundError` instead of `except Exception`, so you don't hide unrelated bugs.

```python
try:
    save_order(order)
except DatabaseTimeout:
    logger.warning("save timed out, retrying", exc_info=True)
    retry_later(order)
```

## Occasionally acceptable

Ignoring an error on purpose is fine when it truly doesn't matter (deleting a temp file that may already be gone), but say so in a comment, and catch only that one exception.

Bare `except:` and `catch (e) {}` in code review deserve a question: what happens when this fails? See [error handling](/t/error-handling).
