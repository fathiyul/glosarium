---
title: "Data Type"
summary: "The kind of value something is, which determines what operations are valid on it."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["data types", "type of a value", "types", "value type"]
prereqs: ["variable"]
related: ["primitive-type", "type-conversion", "type-coercion", "static-vs-dynamic-typing", "type-system"]
---

A **data type** says **what kind of value** something is, and so **what you can do with it**. You can add numbers, but not meaningfully "add" a boolean and a date.

| Type | Examples | Typical operations |
|---|---|---|
| **Integer** | `42`, `-7` | arithmetic ([integers](/t/integer)) |
| **Float** | `3.14` | arithmetic, approximate ([floating point](/t/floating-point)) |
| **String** | `"hello"` | concatenation, searching ([strings](/t/string)) |
| **Boolean** | `true`, `false` | logic ([boolean](/t/boolean)) |
| **List / array** | `[1, 2, 3]` | indexing, appending |
| **Dictionary / object** | `{"name": "Ana"}` | lookup by key |
| **Null / none** | `None`, `null` | "no value" ([null](/t/null)) |

```python
type(42)        # <class 'int'>
type("42")      # <class 'str'>
42 + 1          # 43
"42" + "1"      # "421"   (strings concatenate)
"42" + 1        # TypeError
```

The text `"42"` and the number `42` look alike and behave differently. Many bugs come from mixing them.

## Static vs dynamic typing

- **Statically typed** languages (Java, Go, TypeScript) check types **before** running, and you declare them.
- **Dynamically typed** languages (Python, JavaScript) check types **while running**, so a wrong type shows up as an error at that line ([static vs dynamic typing](/t/static-vs-dynamic-typing)).

## Converting

You can convert between types, sometimes explicitly (`int("42")`) and sometimes automatically, with surprises ([type conversion](/t/type-conversion), [type coercion](/t/type-coercion)).

## Habits

- **Know the type of each value**, especially data coming from outside (forms, JSON, CSV), which is often all strings.
- **Choose the right type**: money as integers or decimals, dates as dates, IDs as strings when you don't do arithmetic on them.
- When an error says "unsupported operand type", check the types first.
