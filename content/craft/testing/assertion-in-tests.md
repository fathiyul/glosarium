---
title: "Test Assertion"
summary: "The check that decides whether a test passes."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["test assertion", "assert in tests", "expect"]
prereqs: ["unit-test"]
related: ["arrange-act-assert", "unit-test", "assertion", "test-case-suite", "mock"]
---

An assertion is the check inside a test that decides whether it passes. If the check is false, the test fails, and the framework reports what was expected and what was found.

```python
assert total == 120
assert "error" not in response.json()
with pytest.raises(ValueError):
    parse_age("abc")
```

```js
expect(total).toBe(120);
expect(users).toHaveLength(3);
expect(() => parse("abc")).toThrow();
```

A test with no assertion can only fail by crashing, so it usually proves nothing.

## What makes a good assertion

- **Specific**: check the exact value that matters, not just that something exists. `assert result` passes for almost anything.
- **Meaningful message**: modern frameworks show a diff of expected vs actual. Add a message when it won't be obvious.
- **About behavior**, not implementation details.
- **Few per test**, all about one behavior. A test with twenty unrelated assertions stops at the first failure and hides the rest.

```python
# Weak
assert order

# Strong
assert order.status == "paid"
assert order.total_cents == 12000
```

## Comparing things

- **Floats**: don't use equality. Use a tolerance (`pytest.approx(0.3)`, `toBeCloseTo`) ([floating point](/t/floating-point)).
- **Collections where order doesn't matter**: compare as sets, or sort first.
- **Exceptions**: assert the specific type and message.
- **Dates and random values**: freeze time and seeds ([flaky tests](/t/flaky-test)).

## Habits

- **Make the test fail first** to see that the assertion works ([TDD](/t/tdd)).
- **Don't assert on everything** returned. Check what the test is about.
- Don't confuse these with production [assertions](/t/assertion) in application code.

Tests follow [arrange, act, assert](/t/arrange-act-assert).
