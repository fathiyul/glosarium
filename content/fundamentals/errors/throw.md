---
title: "Throwing / Raising"
summary: "Signalling an error explicitly."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["raise", "throwing exceptions", "raising exceptions"]
prereqs: ["exception"]
related: ["exception", "try-catch", "custom-exception", "error-handling", "guard-clause"]
---

Throwing (or raising) an exception is how code signals that something is wrong. Execution stops at that line, and the exception travels up to the nearest handler.

```python
def withdraw(balance, amount):
    if amount <= 0:
        raise ValueError("amount must be positive")
    if amount > balance:
        raise InsufficientFunds(balance, amount)
    return balance - amount
```

```js
function withdraw(balance, amount) {
  if (amount <= 0) throw new Error("amount must be positive");
  return balance - amount;
}
```

Python and Ruby use `raise`. Java, JavaScript, C# and C++ use `throw`.

## When to throw

- A function can't do its job because inputs or the state are invalid.
- A needed resource isn't available.
- A rule has been broken, and returning a "fake" value would hide the problem.

Check at the top and throw early ([guard clauses](/t/guard-clause)). Don't return `None` or `-1` for "error" unless callers are meant to check.

## Good habits

- **Throw specific types** with clear messages: what was wrong, with which value ([custom exceptions](/t/custom-exception)).
- **Throw objects**, not strings (in JavaScript, `throw new Error(...)`, not `throw "oops"`, which has no stack trace).
- **Don't use exceptions for ordinary control flow**, like ending a loop.
- **Preserve the cause** when you rethrow a different exception (`raise X from e`).
- **Don't throw from places that can't handle it**, like destructors or cleanup code.
- **Document** what a function can throw.

Someone has to catch it, or the program stops ([try / catch](/t/try-catch)).
