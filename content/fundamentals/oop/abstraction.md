---
title: "Abstraction"
summary: "Exposing what something does while hiding how it does it."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["data abstraction", "abstract"]
prereqs: ["function", "class"]
related: ["encapsulation", "interface", "abstract-class", "separation-of-concerns", "program-to-interface"]
---

Abstraction is exposing what something does while hiding how it does it. You use a thing through a simple interface and don't need to know its internals.

Driving a car works this way. You use the steering wheel and pedals without knowing how the engine works.

```python
class EmailSender:
    def send(self, to, subject, body):
        ...                      # connects to SMTP, retries, formats headers

sender.send("a@x.com", "Hi", "...")     # the caller sees only this
```

Callers depend on `send(...)`. The sending code can change from SMTP to an API without touching them.

## Levels of abstraction

Every function, class and library is an abstraction. Good code is layered: high-level code says what happens (`place_order`), and lower layers handle details (`charge_card`, `write_to_db`).

```python
def checkout(cart):
    order = create_order(cart)
    charge(order)
    send_confirmation(order)
```

Each line is one idea at the same level, and each hides a lot of work.

## Why it helps

- **Less to think about.** You can reason about one layer at a time.
- **Easier change.** Replace the internals without breaking users.
- **Reuse and testing.** Swap a real service for a fake behind the same interface.

## Cautions

- **Leaky abstractions.** Details sometimes show through (a database abstraction that hides how slow a query is), so know what's underneath.
- **Too much abstraction.** Layers that only forward calls, or interfaces with one implementation "just in case", add noise ([premature abstraction](/t/premature-abstraction)).
- **Wrong abstraction** is worse than duplication. Wait until you see a pattern.

Related: [encapsulation](/t/encapsulation), [interfaces](/t/interface).
