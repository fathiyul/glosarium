---
title: "Default Parameter"
summary: "A parameter value used when the caller omits it."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["default argument", "default parameters", "default value", "optional parameter"]
prereqs: ["function", "parameter-vs-argument"]
related: ["parameter-vs-argument", "variadic-function", "flag-argument", "undefined", "mutable-vs-immutable"]
---

A **default parameter** gives an argument a **fallback value** that's used when the caller doesn't supply one.

```python
def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"

greet("Ana")              # "Hello, Ana!"
greet("Ana", "Hi")        # "Hi, Ana!"
```

```js
function greet(name, greeting = "Hello") { ... }
```

Defaults make a function easy to call in the common case, and still customizable.

## Rules

- **Parameters with defaults usually go last** (in Python it's required: a non-default can't follow a default).
- Use **keyword arguments** to skip over some: `connect(host, timeout=5)`.

## The famous Python trap: mutable defaults

The default value is created **once**, when the function is defined, not on each call:

```python
def add_item(item, items=[]):     # BUG: one shared list
    items.append(item)
    return items

add_item(1)   # [1]
add_item(2)   # [1, 2]   surprise!

def add_item(item, items=None):   # fix
    if items is None:
        items = []
    items.append(item)
    return items
```

Never use a list, dictionary or set as a default. Use `None` and create it inside ([mutable vs immutable](/t/mutable-vs-immutable)).

## In JavaScript

Defaults apply when the argument is `undefined` (missing), **not** for `null` ([undefined](/t/undefined)):

```js
function f(x = 5) { return x; }
f();           // 5
f(undefined);  // 5
f(null);       // null
```

## Habits

- Pick **safe, obvious defaults**, such as 30 seconds or `False`.
- Don't use many defaults in one signature. Group them into an options object.
- Beware of boolean defaults that flip behavior ([flag arguments](/t/flag-argument)).
