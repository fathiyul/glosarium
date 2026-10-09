---
title: "Floating-Point Number"
summary: "A binary approximation of real numbers, and why 0.1 + 0.2 != 0.3."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: [float, double, IEEE 754, floating point]
prereqs: [data-type]
related: [integer, money-precision, integer-overflow]
core: [backend]
---

Computers store most non-whole numbers as **floating-point** values: a binary
approximation of the real number. Many everyday decimals, like 0.1, have no exact binary
form, just as 1/3 has no exact decimal form. The stored value is the closest one that fits.

```python
>>> 0.1 + 0.2
0.30000000000000004
>>> 0.1 + 0.2 == 0.3
False
```

JavaScript prints the same result, because it uses the same standard (IEEE 754 doubles)
for *every* number. Many other languages do too, so this isn't a bug in one of them.

## What this means in practice

**Never compare floats with `==`.** Compare with a tolerance:

```python
import math
math.isclose(0.1 + 0.2, 0.3)   # True
```

**Never use floats for money.** Errors are tiny, but they pile up across many additions and
make totals off by a cent. Store money as an integer number of the smallest unit (cents), or
use an exact decimal type. See [money precision](/t/money-precision).

```python
from decimal import Decimal
Decimal("0.1") + Decimal("0.2") == Decimal("0.3")   # True
```

(Build decimals from *strings*. `Decimal(0.1)` copies the float's error.)

## Other things to know

- Whole numbers are exact in a double only up to 2^53. Beyond that, neighbouring integers
  collapse into the same value. In JavaScript this limit is `Number.MAX_SAFE_INTEGER`.
- Rounding for display is fine (`f"{x:.2f}"`). Rounding *stored* values is a decision to
  make on purpose.
- Special values exist: `NaN` ("not a number") and infinity. `NaN` is not equal to
  anything, including itself.

Rule of thumb: floats are for measurements and approximations (distance, temperature,
averages); [integers](/t/integer) or decimals are for things you count or charge for.
