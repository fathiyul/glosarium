---
title: "Primitive Obsession"
summary: "Using raw strings and ints where a small domain type belongs."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["primitive obsession smell", "stringly typed"]
prereqs: ["data-type"]
related: ["data-type", "value-object", "god-object", "shotgun-surgery"]
---

Primitive obsession is the habit of representing domain ideas with basic types such as strings, integers and floats. An email address is a string, a price is a float, and an order status is a string that happens to be one of three words. The types don't stop nonsense from getting in, and the rules about each idea end up scattered across the code.

```python
# Primitives: any string and any number is accepted
def send_receipt(email: str, amount: float, currency: str): ...

send_receipt("not-an-email", -5, "dollars")   # runs without complaint
```

A small domain type makes the rules live in one place and the mistakes visible:

```python
from dataclasses import dataclass

@dataclass(frozen=True)
class Money:
    cents: int
    currency: str

    def __post_init__(self):
        if self.cents < 0:
            raise ValueError("amount must not be negative")
```

The trade-off is extra types. Each new class is a file, a name and a conversion point, and small projects can be buried in wrappers. Not every string needs a type: a free-text note or a log message is fine as a plain string.

The classic mistake is validating the same string in five places, each slightly differently, because nothing marks it as an email or a currency code. Introduce a type for ideas that have rules, that get passed around, or that are easy to mix up, such as two IDs of different kinds. Once the rules sit in one [value object](/t/value-object), [shotgun surgery](/t/shotgun-surgery) becomes much less likely when they change.
