---
title: "try / catch / finally"
summary: "Catching exceptions and running cleanup code regardless."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["try except", "try catch finally", "try/except", "catch block"]
prereqs: ["exception"]
related: ["exception", "throw", "error-handling", "error-swallowing", "custom-exception"]
---

`try` / `catch` (called `try` / `except` in Python) runs code that might fail, and handles the exception if it does. `finally` runs cleanup code either way.

```python
try:
    data = json.loads(text)                  # may raise
except json.JSONDecodeError as e:
    print("bad JSON:", e)
    data = {}
else:
    print("parsed fine")                     # runs only if no exception
finally:
    print("always runs")                     # cleanup
```

```js
try {
  const data = JSON.parse(text);
} catch (err) {
  console.error("bad JSON", err);
} finally {
  hideSpinner();
}
```

## How it flows

1. The `try` block runs.
2. If something throws, the rest of that block is skipped, and the matching `catch` runs.
3. `finally` runs in every case, even after a `return` or an uncaught exception.

## Rules of thumb

- **Keep the `try` block small**: only the line that can fail. A big block can catch errors from unrelated lines.
- **Catch specific exceptions**, not everything. `except Exception` and `catch (e)` hide bugs.
- **Don't swallow** the exception ([swallowing errors](/t/error-swallowing)).
- **Use `finally` or a context manager for cleanup**:

```python
with open(path) as f:       # closes the file even if an error occurs
    data = f.read()
```

- **Async code**: in JavaScript, `await` inside `try` catches rejected promises. A forgotten `await` means the error escapes ([async/await](/t/async-await)).
- **Re-throw** (`raise`, `throw e`) if you can't actually handle it.

`try/catch` for expected conditions you can recover from is fine. Using it to check whether things are valid, over and over, is slow and unclear. See [exceptions](/t/exception).
