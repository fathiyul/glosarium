---
title: "Result / Either Type"
summary: "A type that represents success or failure without exceptions."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["Result", "Either"]
prereqs: ["option-type"]
related: ["option-type", "checked-vs-unchecked-exception", "error-handling"]
---

A result type represents an operation that either succeeds with a value or fails with an error. The function returns one of two wrapped cases, `Ok` or `Err`, instead of raising an exception. Rust's `Result<T, E>` is the best-known version, and Haskell calls the same idea `Either`.

A small Python version uses two dataclasses:

```python
from dataclasses import dataclass

@dataclass
class Ok:
    value: int

@dataclass
class Err:
    error: str

def parse_port(s):
    if s.isdigit() and 0 < int(s) < 65536:
        return Ok(int(s))
    return Err(f"bad port: {s}")

parse_port("8080")    # Ok(value=8080)
parse_port("99999")   # Err(error='bad port: 99999')
```

The caller has to handle both cases to get the value. The failure is part of the return type, so it's visible without reading the implementation.

The trade-offs are verbosity and a different style of control flow. Every caller must check the result, and chaining several fallible steps needs helper code. Exceptions are less work when a failure is rare or unexpected, because they skip the intermediate steps. Result types suit expected outcomes, such as validation, where the caller needs to act on the failure.

The classic mistake is wrapping every error in a result, including bugs that should crash loudly. Use results for failures the caller can reasonably recover from, and let programming errors raise. For the cases where a value can simply be missing, see the [option type](/t/option-type).
