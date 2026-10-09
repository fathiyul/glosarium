---
title: "Magic Number"
summary: "An unexplained literal in code that should be a named constant."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["magic string", "hard-coded value", "hardcoded constant"]
prereqs: ["constant"]
related: ["constant", "naming", "readability", "app-configuration", "code-smell"]
---

A magic number is an unexplained literal value in code. The reader can't tell what it means or why it has that value.

```python
if user.age >= 18 and attempts < 5:
    price = base * 1.2 + 4.99
```

What's `1.2`? What's `4.99`? Why `5`? Give them names:

```python
LEGAL_AGE = 18
MAX_LOGIN_ATTEMPTS = 5
VAT_MULTIPLIER = 1.2
SHIPPING_FEE = 4.99

if user.age >= LEGAL_AGE and attempts < MAX_LOGIN_ATTEMPTS:
    price = base * VAT_MULTIPLIER + SHIPPING_FEE
```

## Why it matters

- **Meaning**: the name documents the intent.
- **One place to change**: when the VAT rate moves, you edit one line instead of hunting for `1.2`.
- **Fewer bugs**: the same `86400` typed in five places will eventually be typed wrongly in one.

## Not everything is magic

`0`, `1`, `-1` and `2` in obvious contexts (`items[0]`, `n % 2 == 0`) don't need names. Name a value when its meaning isn't obvious from the code, or when it might change.

Magic **strings** count too: `if status == "A3"` should be a named constant or an enum.

## Where to put them

A [constant](/t/constant) near the code that uses it. Values that differ between environments, or that operations staff need to change, belong in [configuration](/t/app-configuration) instead.
