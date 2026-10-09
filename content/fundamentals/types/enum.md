---
title: "Enum"
summary: "A type with a fixed set of named values."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["enumeration", "enumerated type", "enums"]
prereqs: ["data-type", "constant"]
related: ["constant", "magic-number", "discriminated-union", "switch-statement", "db-enums"]
---

An enum (enumeration) is a type with a fixed set of named values. It replaces loose strings and numbers with choices the program can check.

```python
from enum import Enum

class Status(Enum):
    PENDING = "pending"
    PAID = "paid"
    SHIPPED = "shipped"

order.status = Status.PAID
if order.status == Status.SHIPPED:
    ...
Status("paid")             # Status.PAID, from stored text
Status.PAID.value          # "paid"
```

```java
enum Status { PENDING, PAID, SHIPPED }
```

```ts
enum Status { Pending = "pending", Paid = "paid" }
type Status2 = "pending" | "paid";       // a string union is a common alternative
```

## Why not plain strings or numbers

- **No typos.** `Status.PAD` is an error. `"pad"` is a quiet bug.
- **Clear meaning.** `Status.PAID` beats `2` ([magic numbers](/t/magic-number)).
- **Autocomplete** lists valid options.
- **Exhaustiveness.** The compiler or linter can warn if a `switch` forgets a value ([switch](/t/switch-statement)).

## Practical points

- **Store a stable value, not a position.** If you save `1` for "PAID" and later insert a value in the middle, old data changes meaning. Give each value an explicit, permanent code.
- **Handle unknown values** coming from outside (an API sends a status you don't know), instead of crashing.
- **Adding values is easy. Removing or renaming them** can break stored data and other systems.
- **Databases** can store them as text with a check constraint, a lookup table, or a native enum type, each with trade-offs ([DB enums](/t/db-enums)).
- **Don't use an enum for values that change often** (a list of countries or products). That's data, not code.
- For values that carry different data per variant, see [discriminated unions](/t/discriminated-union).
