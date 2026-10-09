---
title: "Exception"
summary: "An object signalling an error that unwinds the call stack until caught."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["exceptions", "runtime error"]
prereqs: ["function", "conditional"]
related: ["try-catch", "throw", "error-handling", "stack-trace", "custom-exception", "checked-vs-unchecked-exception"]
---

An exception is an object that signals an error. When code throws one, normal execution stops, and the exception travels up the call stack through the callers until something catches it. If nothing does, the program crashes with a [stack trace](/t/stack-trace).

```python
def read_age(text):
    return int(text)               # raises ValueError for "abc"

try:
    age = read_age(user_input)
except ValueError:
    print("Please enter a number")
```

Exceptions let the code that notices a problem (deep inside) be separate from the code that knows what to do about it (higher up), without passing error codes through every function.

## Common ones

| Python | Meaning |
|---|---|
| `ValueError` | right type, bad value |
| `TypeError` | wrong type |
| `KeyError` / `IndexError` | missing key or position |
| `FileNotFoundError`, `OSError` | file and system problems |
| `ZeroDivisionError` | divide by zero |

JavaScript has `TypeError`, `RangeError`, and others, all inheriting from `Error`.

## What an exception carries

A **type**, a **message**, and a **stack trace** showing where it happened. Reading them is the first debugging step ([reading error messages](/t/reading-error-messages)).

## Habits

- **Raise exceptions for exceptional problems**, not for normal control flow.
- **Catch only what you can handle.**
- **Don't catch and ignore** ([swallowing errors](/t/error-swallowing)).
- **Use specific types** so callers can respond differently ([custom exceptions](/t/custom-exception)).
- Some languages (Go, Rust) return errors as values instead ([error codes vs exceptions](/t/error-codes-vs-exceptions)).
- Use [`try/catch/finally`](/t/try-catch) and context managers to guarantee cleanup.
