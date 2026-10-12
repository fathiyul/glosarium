---
title: "Side Effect"
summary: "Anything a function does besides returning a value: I/O, mutation, logging."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["side effects", "observable effect"]
prereqs: ["function"]
related: ["pure-function", "referential-transparency", "immutability", "idempotence", "thread-safety"]
---

A side effect is anything a function does besides returning a value: changing something outside itself, or interacting with the world.

Typical ones:

- Modifying a global variable or an argument.
- Writing to a file, a database or the network.
- Printing or logging.
- Sending an email.
- Reading the clock or a random number (it depends on, rather than changes, the outside world).
- Throwing an exception.

```python
def add_item(cart, item):
    cart.append(item)             # side effect: mutates the caller's list

def add_item(cart, item):
    return cart + [item]          # no side effect: returns a new list
```

## They're not bad

Programs exist to have effects: save the order, send the message, update the screen. The goal is to **control** them, not eliminate them.

## Why they cause trouble

- **Surprise.** `total = compute_total(order)` that also sends an email is dangerous, because calling it twice sends two.
- **Hard to test.** You must set up and check the outside world.
- **Order dependence**: the result depends on what ran before.
- **Hard to retry or reorder.** A repeated side effect (charging a card) is harmful unless it's [idempotent](/t/idempotence).
- **Concurrency bugs** from shared mutable state ([race conditions](/t/race-condition)).

## Habits

- **Separate functions that compute from functions that act.** Name them to match (`calculate_total` vs `send_receipt`).
- **Keep a pure core, with effects at the edges** ([pure functions](/t/pure-function)).
- **Document unavoidable effects.**
- **Don't mutate arguments** unless that's the stated purpose (`list.sort()` is, `sorted()` isn't).
- **Make risky effects safe to repeat** with idempotency keys.
