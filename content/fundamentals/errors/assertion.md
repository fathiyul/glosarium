---
title: "Assertion"
summary: "A check that crashes when an assumption turns out to be false."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["assert", "assert statement", "sanity check"]
prereqs: ["boolean", "exception"]
related: ["exception", "fail-fast", "defensive-programming", "error-handling", "unit-test"]
---

An assertion is a check that a condition is true, which stops the program with an error if it isn't. It states an assumption that you're certain should hold.

```python
def average(numbers):
    assert len(numbers) > 0, "average() needs at least one number"
    return sum(numbers) / len(numbers)

assert isinstance(user_id, int)
```

If the condition is false, Python raises `AssertionError` with your message. Java has `assert`, JavaScript has `console.assert` and Node's `assert` module, and test frameworks have many assertion helpers.

## What they're for

- **Catching programmer mistakes early**: "this can't happen, unless my code is wrong".
- **Documenting assumptions** in code, such as `assert x >= 0` after a calculation.
- **Tests**: `assert result == expected` is the heart of automated tests ([unit tests](/t/unit-test)).

## What they're not for

- **Checking user input or external data.** That can legitimately be wrong, and must be handled with proper validation and errors ([input validation](/t/input-validation)).
- **Anything with a needed side effect.** `assert save(order)` disappears if assertions are turned off.

Python skips assertions when run with `-O`, and Java disables them by default. So a program must not rely on them for correctness or security.

## Good practice

- **Make messages explain** what was expected and what was found.
- Use them for invariants: after a sort the list is ordered, a total is never negative.
- Remember the idea of failing fast: stop as soon as something is wrong, instead of letting a bad value travel ([fail fast](/t/fail-fast)).
- In production code, prefer raising a clear exception for conditions that must always be checked.
