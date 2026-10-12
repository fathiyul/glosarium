---
title: "Higher-Order Function"
summary: "A function that takes or returns other functions."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["higher order function", "HOF", "functions that take functions"]
prereqs: ["first-class-function"]
related: ["first-class-function", "map-filter-reduce", "closure", "function-composition", "callback"]
---

A higher-order function is a function that takes another function as an argument, returns a function, or both. It's built on [first-class functions](/t/first-class-function).

```python
# takes a function
def retry(action, times=3):
    for attempt in range(times):
        try:
            return action()
        except Exception:
            if attempt == times - 1:
                raise

retry(lambda: fetch_user(42))

# returns a function
def multiplier(n):
    return lambda x: x * n

double = multiplier(2)
double(21)       # 42
```

You already use them: `map`, `filter`, `sorted(key=...)`, `array.forEach`, event listeners, and decorators and middleware.

```js
[3, 1, 2].sort((a, b) => a - b);
items.filter(isActive).map(toName);
```

## What they give you

- **Reusable patterns with a hole in them.** `retry`, `with_logging` and `timed` wrap any action, so the logic is written once.
- **Less repetition** than writing similar loops over and over ([map, filter, reduce](/t/map-filter-reduce)).
- **Customization** without subclassing: pass in the part that varies.

```python
def timed(func):
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        print(func.__name__, time.time() - start)
        return result
    return wrapper
```

## Cautions

- Deeply nested function-returning-function code is hard to read. Name the pieces.
- Stack traces from wrappers can be confusing, and wrapped functions may lose their name and docs unless you preserve them.
- A returned function may keep variables alive ([closures](/t/closure)).
- Don't use them just to look clever. A plain loop is sometimes clearer.
