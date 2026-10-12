---
title: "Idempotence"
summary: "Doing something twice has the same effect as doing it once."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["idempotent", "idempotency"]
prereqs: ["function"]
related: ["idempotency-key", "retry-with-backoff", "http-methods", "pure-function"]
also: [api-design, messaging, distributed-systems]
---

An operation is idempotent if doing it more than once has the same effect as doing it once. The word has two common senses, and they're related but not the same.

In mathematics and in code, a function is idempotent when applying it again to its own output changes nothing. `abs` is one: `abs(abs(-3))` equals `abs(-3)`. So is taking the maximum of a value with itself, since `max(x, x)` is just `x`, or a function that normalizes a string by trimming and lowercasing it.

In HTTP and APIs, the meaning is about side effects. RFC 9110 defines `PUT` and `DELETE` as idempotent methods: sending the same request twice leaves the server in the same state as sending it once. `POST` is not, because each request may create another resource.

```python
# Idempotent: setting a value ends in the same state however many times it runs
def set_price(product, price):
    product.price = price

# Not idempotent: each call adds another charge
def charge(account, amount):
    account.balance -= amount
```

Idempotence matters most when a request may be retried, because the network failed or a timeout hid the answer. A retry of an idempotent operation is safe. A retry of a non-idempotent one can charge a customer twice. For those, an [idempotency key](/t/idempotency-key) lets the server recognize a repeated request and return the first result.

The classic mistake is assuming a method is idempotent because its name suggests it. `set_price` is safe to retry, but `apply_discount`, which reduces the price further each time, is not. Check the effect on the data, not the name, and if you can't make an operation idempotent, make its retries deliberate, as covered in [retry with backoff](/t/retry-with-backoff).
