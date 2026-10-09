---
title: "Custom Exception"
summary: "A domain-specific error type carrying meaningful context."
levels: { backend: junior, frontend: mid-level, data-engineer: junior }
aliases: ["custom error", "user-defined exception", "domain exception"]
prereqs: ["exception", "class"]
related: ["exception", "error-handling", "throw", "try-catch", "error-codes-vs-exceptions"]
---

A custom exception is an error type you define yourself, with a name and data that fit your problem, instead of using a generic `Exception` everywhere.

```python
class InsufficientFunds(Exception):
    def __init__(self, balance, requested):
        self.balance = balance
        self.requested = requested
        super().__init__(f"balance {balance} is less than {requested}")

def withdraw(account, amount):
    if amount > account.balance:
        raise InsufficientFunds(account.balance, amount)
    account.balance -= amount
```

```js
class InsufficientFunds extends Error {
  constructor(balance, requested) {
    super(`balance ${balance} is less than ${requested}`);
    this.name = "InsufficientFunds";
    this.balance = balance;
  }
}
```

## Why define one

Callers can react to **specific** problems:

```python
try:
    withdraw(acct, 500)
except InsufficientFunds as e:
    show_message(f"You only have {e.balance}")
except PaymentError:
    retry_later()
```

Catching a generic `Exception` can't tell these apart. A named type also reads as documentation.

## Guidelines

- **Name them for what went wrong** (`OrderNotFound`, `InvalidCoupon`), ending in `Error` or `Exception` according to your language's convention.
- **Inherit from a sensible base**, and give your library one base class (`MyAppError`) so users can catch all of yours at once.
- **Carry context**: IDs, values, a message a human can use, but never secrets.
- **Don't create one for everything.** If nobody will handle it differently, a standard exception such as `ValueError` is fine.
- **Keep the original cause**: `raise NewError(...) from original`, so the stack trace shows both.
- For web APIs, map them to status codes and a consistent error format at the boundary ([error response format](/t/error-response-format)).
