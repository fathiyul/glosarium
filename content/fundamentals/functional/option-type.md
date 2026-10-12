---
title: "Option / Maybe Type"
summary: "A type that explicitly represents \"a value or nothing\"."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["Maybe", "Optional"]
prereqs: ["null"]
related: ["null", "result-type", "null-object-pattern", "optional-chaining"]
---

An option type represents a value that may or may not be present, and the type itself says so. Instead of returning a value that could be `null`, a function returns an `Option` that is either "some value" or "none". The caller has to unwrap it before using the value, so the missing case can't be forgotten silently.

Rust's `Option<T>` and Haskell's `Maybe` work this way. In Python, `Optional[T]` is a type hint that a checker enforces, but Python doesn't enforce it at runtime:

```python
from typing import Optional

def find_user(user_id: int) -> Optional[dict]:
    return users.get(user_id)   # returns None when there's no such user

user = find_user(42)
if user is not None:
    print(user["name"])
```

The type checker reports code that uses an `Optional` value without checking it, which is the main benefit: missing values show up in the signature.

The trade-offs are verbosity and friction. Every use needs an unwrap, default or check, and chaining several optional lookups adds ceremony. In languages without built-in support, wrapper types add allocation and indirection. Optional types are also not always the right answer: when a value is genuinely required, make it required, instead of wrapping everything.

The classic mistake is wrapping a value in an option and then unwrapping it with a crash-on-missing call, which recreates the null bug under a different name. Use the default or the missing path deliberately. For failures that need a reason, see the [result type](/t/result-type).
