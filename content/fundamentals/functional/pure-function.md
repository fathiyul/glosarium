---
title: "Pure Function"
summary: "Same input, same output, and no side effects."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["pure functions", "referentially transparent function"]
prereqs: ["function", "side-effect"]
related: ["side-effect", "referential-transparency", "immutability", "memoization", "functional-programming"]
---

A pure function has two properties:

1. **The same inputs always give the same output.**
2. **It has no side effects**: it doesn't change anything outside itself, or depend on anything that changes.

```python
def add_tax(price, rate):
    return price * (1 + rate)          # pure
```

Impure versions:

```python
total = 0
def add_to_total(n):
    global total
    total += n                          # changes outside state

def now_plus(days):
    return datetime.now() + timedelta(days=days)     # depends on the clock

def get_user(id):
    return db.query(id)                 # reads external state
```

Things that make a function impure: reading or writing globals, files, databases or the network, using the current time or random numbers, printing, and mutating its arguments.

## Why prefer them

- **Easy to test.** Give inputs, check the output, with no setup or mocks ([unit tests](/t/unit-test)).
- **Easy to reason about.** Nothing hidden to track.
- **Safe to call twice**, cache ([memoization](/t/memoization)), reorder or run in parallel.
- **Fewer bugs** from shared state ([race conditions](/t/race-condition)).

## Real programs need impurity

You can't avoid I/O, since that's what makes programs useful. The usual design is to keep a **pure core** of logic and push side effects to the edges: read data, call the pure functions, then write the results ([side effects](/t/side-effect), [functional programming](/t/functional-programming)).

```python
def decide_discount(order):            # pure: easy to test
    return 0.1 if order.total > 100 else 0

def checkout(order_id):                # impure shell
    order = repo.load(order_id)
    repo.save_discount(order_id, decide_discount(order))
```

Passing the time or a random seed in as an argument makes such functions pure again.
