---
title: "Getters and Setters"
summary: "Methods controlling access to a field."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["getters and setters", "accessor", "mutator", "property accessors"]
prereqs: ["attribute", "access-modifier"]
related: ["encapsulation", "attribute", "access-modifier", "class", "mutable-vs-immutable"]
---

Getters and setters are methods that control reading and writing a field, so the class can validate, compute or log instead of exposing the raw field.

```java
class Account {
    private double balance;
    public double getBalance() { return balance; }
    public void setBalance(double b) {
        if (b < 0) throw new IllegalArgumentException("negative");
        this.balance = b;
    }
}
```

In Python and C#, **properties** give you the same control with attribute syntax:

```python
class Account:
    def __init__(self):
        self._balance = 0

    @property
    def balance(self):              # a getter: account.balance
        return self._balance

    @balance.setter
    def balance(self, value):       # a setter: account.balance = 10
        if value < 0:
            raise ValueError("negative")
        self._balance = value
```

Callers write `account.balance = 10` and the check still runs.

## Why they exist

- **Validation** on every write.
- **Computed values** that look like fields.
- **Freedom to change internals** later without changing the public interface.
- **Read-only fields**: provide a getter and no setter.

## When they're just noise

A getter and setter for every private field, with no logic, adds code and hides nothing. It's the same as a public field with extra steps. Use them where there's a rule to protect.

## Better than setters

Often a **meaningful method** captures a rule more clearly than a bare setter: `account.deposit(50)` instead of `account.setBalance(account.getBalance() + 50)`. Prefer immutable objects where you can, since fewer setters means fewer ways to break things ([encapsulation](/t/encapsulation)).
