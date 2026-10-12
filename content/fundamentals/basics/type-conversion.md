---
title: "Type Conversion"
summary: "Turning a value of one type into another, explicitly or implicitly."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["type casting", "casting", "type cast"]
prereqs: ["data-type"]
related: ["type-coercion", "string", "integer", "floating-point", "runtime-validation"]
---

Type conversion means turning a value of one type into another, such as the string `"42"` into the number `42`. When you ask for it yourself, it's **explicit** (also called casting). When the language does it for you, it's [coercion](/t/type-coercion).

```python
int("42")        # 42
float("3.5")     # 3.5
str(42)          # "42"
bool("")         # False
list("abc")      # ["a", "b", "c"]
int("abc")       # ValueError
```

```js
Number("42");    // 42
Number("abc");   // NaN
String(42);      // "42"
parseInt("42px", 10);   // 42  (stops at the first non-digit)
```

## When you need it

Almost all outside data arrives as text: form fields, query parameters, CSV cells, environment variables, JSON values you didn't control. Convert it at the **edge** of your program, and validate that it worked.

## What can go wrong

- **Invalid input.** `int("abc")` raises an error, `Number("abc")` quietly gives `NaN`. Decide how to handle bad data ([runtime validation](/t/runtime-validation)).
- **Losing information.** `int(3.9)` is `3` (truncated, not rounded). A big number may not fit the target type.
- **Surprising truthiness.** `bool("false")` is `True`, since the string isn't empty.
- **Floats and money.** Converting `0.1 + 0.2` to a decimal doesn't undo the error ([floating point](/t/floating-point)).
- **Dates and times** need parsers, not casts ([ISO 8601](/t/iso-8601)).
- **Locale formats.** `"1,234.50"` and `"1.234,50"` need different handling.

## Habits

- Convert once, near the input, then keep the right types inside.
- Prefer functions that fail loudly over ones that guess.
- Catch the specific error you expect, not every exception.
