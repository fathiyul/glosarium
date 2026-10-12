---
title: "Tail Recursion"
summary: "Recursion where the call is the last action, which some languages turn into a loop."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["tail call", "tail call optimization", "TCO"]
prereqs: ["recursion"]
related: ["recursion", "stack-overflow", "loop", "functional-programming"]
---

A call is in tail position when it's the last thing a function does, with nothing left to do with its result. When that's true, the language can reuse the current stack frame for the next call instead of adding a new one. Languages that do this are said to have tail call optimization (TCO), and a tail-recursive function can then run in constant stack space.

```python
def sum_to(n, acc=0):
    if n == 0:
        return acc
    return sum_to(n - 1, acc + n)   # tail call: nothing happens after it returns

sum_to(100)    # 5050
sum_to(5000)   # RecursionError: maximum recursion depth exceeded
```

The Python version looks tail-recursive, but CPython does not eliminate tail calls, so every call still adds a frame. The default limit is 1000 (`sys.getrecursionlimit()`), which is why the call at depth 5000 fails. Scheme requires proper tail calls, so tail recursion is the normal way to loop there. JavaScript's specification includes tail calls, but many engines have not implemented them, so don't rely on them in JavaScript. Some compilers optimize tail calls depending on settings, which again means checking your own toolchain.

The trade-off is clarity versus safety. A tail-recursive function can read well, but without TCO the same code breaks on large inputs. In a language without it, write a loop:

```python
def sum_to(n):
    total = 0
    for i in range(1, n + 1):
        total += i
    return total
```

The classic mistake is writing deep recursion in a language that doesn't optimize it and testing only on small inputs. Ask first whether the language guarantees the optimization, and if it doesn't, use a loop. See [functional programming](/t/functional-programming) for where tail recursion is most common.
