---
title: "Factory Method"
summary: "Letting subclasses or functions decide which class to instantiate."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["factory pattern", "factory function"]
prereqs: ["design-pattern"]
related: ["abstract-factory", "builder-pattern", "dependency-inversion-principle", "strategy-pattern"]
---

The factory method pattern puts the choice of which class to create in one place, so the code that uses the object doesn't need to name the concrete class. A function or a method takes a description, such as a kind or a configuration value, and returns an object that matches the same interface.

```python
from typing import Protocol

class Notifier(Protocol):
    def send(self, message: str) -> None: ...

class EmailNotifier:
    def send(self, message): print(f"email: {message}")

class SmsNotifier:
    def send(self, message): print(f"sms: {message}")

def make_notifier(kind: str) -> Notifier:
    if kind == "email":
        return EmailNotifier()
    if kind == "sms":
        return SmsNotifier()
    raise ValueError(f"unknown notifier: {kind}")

make_notifier("sms").send("order shipped")   # sms: order shipped
```

Callers receive a `Notifier` and never mention `SmsNotifier`. Adding a new channel means adding one class and one branch in the factory.

The trade-off is that the factory becomes the one place that knows every concrete class, so it grows as the set of types grows. A long `if` chain in a factory is the same growing switch that [polymorphism](/t/replace-conditional-with-polymorphism) avoids. Also, the factory adds a layer when the choice is obvious and never changes.

The classic mistake is using a factory where a direct constructor call is clearer, or hiding a choice that callers should see. Use a factory when the choice depends on configuration or input, and when callers should not care which type they get. Pair it with [dependency inversion](/t/dependency-inversion-principle), so the factory is the only place that imports the concrete classes.
