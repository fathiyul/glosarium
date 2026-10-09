---
title: "Constant"
summary: "A name bound to a value that cannot be reassigned."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["constants", "const", "immutable binding", "named constant"]
prereqs: ["variable"]
related: ["magic-number", "var-let-const", "mutable-vs-immutable", "naming"]
---

A **constant** is a name bound to a value that **doesn't change** while the program runs.

```python
MAX_RETRIES = 3          # Python has no enforcement; ALL_CAPS is a convention
TAX_RATE = 0.2
```

```js
const MAX_RETRIES = 3;   // JavaScript: cannot be reassigned
```

```java
static final int MAX_RETRIES = 3;
```

## Why use them

Replace [magic numbers](/t/magic-number) and repeated strings with a **named** value:

```python
if attempts > 3:            # why 3?
if attempts > MAX_RETRIES:  # clear, and changeable in one place
```

- **Meaning**: the name explains the number.
- **One place to change**: update `TAX_RATE` once, not in forty places.
- **Safety**: where the language enforces it, accidental reassignment is an error.

## Caution: constant doesn't always mean immutable

In JavaScript, `const` stops **reassigning the variable**, but an object or array can still change inside:

```js
const config = { debug: false };
config.debug = true;        // allowed
```

See [var, let and const](/t/var-let-const) and [mutable vs immutable](/t/mutable-vs-immutable).

## Habits

- **Name them in `UPPER_SNAKE_CASE`** where that's the convention.
- **Group related constants**, or use an `enum` for fixed sets of options.
- **Put configuration that changes per environment** in [configuration](/t/app-configuration), not constants.
- **Don't over-extract**: `ONE = 1` adds nothing. Name values that carry meaning.
