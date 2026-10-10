---
title: "Defensive Programming"
summary: "Writing code that guards against invalid inputs and states."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["guard clauses", "input validation"]
prereqs: ["conditional"]
related: ["checked-vs-unchecked-exception", "error-boundary", "result-type"]
---

Defensive programming means writing code that expects bad input or unexpected state and handles it on purpose, rather than failing in a confusing way later. The usual tools are guard clauses, input validation and assertions for conditions that should never happen.

```python
def apply_discount(price, percent):
    if price < 0:
        raise ValueError("price must not be negative")
    if not 0 <= percent <= 100:
        raise ValueError("percent must be between 0 and 100")
    return price * (1 - percent / 100)
```

The guards stop a bad value at the point it enters, and the error message names the problem. Without them, a negative price might produce a plausible-looking wrong total that nobody notices.

The trade-offs are about where to put the checks. Validating everywhere adds repetition and can hide the real logic, and it can make functions harder to test. Checks that silently return a default, or catch and swallow errors, hide bugs instead of exposing them. Python's `assert` statements are for internal invariants, and they're removed when Python runs with optimization flags, so they can't guard external input.

The classic mistake is defending against everything and returning fallback values, so a broken state keeps running. Validate at the boundaries where data enters, such as user input, API requests and files. Inside your own code, trust values that were already checked, and let the internal invariants fail loudly. For failures a caller should handle, return an explicit [result](/t/result-type) rather than a default.
