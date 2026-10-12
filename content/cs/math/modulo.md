---
title: "Modulo"
summary: "The remainder after division; used for wraparound and hashing."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["modulus", "remainder", "mod", "%"]
prereqs: ["integer", "operator"]
related: ["integer", "hash-table", "off-by-one-error", "binary-number", "bitwise-operation"]
---

The modulo operation gives the remainder after division. In most languages it's written `%`.

```python
7 % 3       # 1   (7 = 2×3 + 1)
10 % 5      # 0   (divides evenly)
5 % 10      # 5   (smaller than the divisor: unchanged)
```

## Uses

**Even or odd, and divisibility:**

```python
n % 2 == 0          # even
n % 15 == 0         # divisible by 15 (FizzBuzz)
```

**Wrapping around** (cycling through a fixed range):

```python
index = (index + 1) % len(items)       # 0, 1, 2, 0, 1, 2 ...
hour = (hour + 5) % 24                 # clock arithmetic
day_of_week = (today + 10) % 7
```

**Picking a bucket**, such as for hashing or sharding:

```python
shard = hash(user_id) % 8
```

**Pagination, batching and "every nth item"**: `if i % 100 == 0: log_progress()`.

**Extracting digits**: `n % 10` is the last digit, `n // 10` removes it.

## Gotchas

- **Negative numbers differ between languages.** In Python, `-7 % 3` is `2` (the result takes the divisor's sign). In JavaScript, C and Java, it's `-1`. If you need a non-negative result, check your language, or use `((n % m) + m) % m`.
- **Division by zero**: `x % 0` is an error.
- **Floats**: `%` works on floating-point numbers, but with the usual rounding surprises ([floating point](/t/floating-point)).
- **Don't confuse** with percent or integer division (`//`).
- **Bias and clustering**: `hash % n` with a small or poorly chosen `n` can distribute unevenly.

Python's `divmod(a, b)` returns the quotient and remainder together.
