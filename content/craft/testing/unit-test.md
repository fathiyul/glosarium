---
title: "Unit Test"
summary: "A fast test of one small piece of code in isolation."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["unit testing", "unit tests"]
prereqs: ["function"]
related: ["test-runner", "arrange-act-assert", "mock", "integration-test", "tdd", "testing-pyramid"]
core: [backend, frontend, data-engineer]
---

A unit test checks one small piece of code (usually a function or a class) **in isolation**,
runs in milliseconds and doesn't touch the network, disk or a real database.

```python
def test_apply_discount():
    assert apply_discount(price=200, percent=25) == 150
```

## Anatomy: arrange, act, assert

```python
def test_cannot_withdraw_more_than_balance():
    account = Account(balance=50)                    # arrange: set up

    with pytest.raises(InsufficientFunds):
        account.withdraw(80)                         # act and assert on the outcome

    assert account.balance == 50                     # nothing changed
```

(See [arrange-act-assert](/t/arrange-act-assert).)

## What makes a good one

- **Fast and independent.** Tests don't depend on order or on each other.
- **Deterministic.** Same input, same result every time. No real clock, randomness or
  network ([flaky tests](/t/flaky-test) destroy trust).
- **Tests behavior, not implementation**, so refactoring doesn't break it.
- **One idea per test**, with a name that says what failed: `test_expired_coupon_is_rejected`.
- **Covers edge cases**: empty input, zero, negative numbers, `None`, boundaries (see
  [off-by-one errors](/t/off-by-one-error)).

## What they can't do

They won't tell you your pieces work *together*. For that, see
[integration tests](/t/integration-test). Mix many unit tests with fewer larger ones, following
the [testing pyramid](/t/testing-pyramid).

When a dependency is slow or unpredictable, replace it with a [mock](/t/mock) or fake, but
sparingly. Run unit tests constantly; they're your fastest safety net.
