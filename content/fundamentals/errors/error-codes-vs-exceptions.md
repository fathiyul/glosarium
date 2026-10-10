---
title: "Error Values vs Exceptions"
summary: "Returning errors as values vs throwing them."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["error codes", "error return values"]
prereqs: ["exception"]
related: ["result-type", "exception", "error-handling", "checked-vs-unchecked-exception"]
---

There are two common ways for a function to report failure. It can return an error value alongside its normal result, or it can throw an exception that unwinds the call stack until something catches it. Go, C and many system APIs favour the first. Python, Java and JavaScript favour the second.

A small example of the value style, using a tuple:

```python
def parse_int(text):
    try:
        return int(text), None
    except ValueError:
        return None, f"not a number: {text!r}"

value, err = parse_int("42x")
if err is not None:
    print(err)   # e.g. "not a number: '42x'"
```

The caller sees the failure at every call site, because the error is in the return value. Nothing happens unless the caller checks for it, and that's both the strength and the weakness: it's explicit, but the check is easy to forget.

Exceptions take the opposite trade-off. Code between the throw and the catch doesn't need to know about the failure, which keeps deep call chains short. The cost is that the signature doesn't say what can fail, so a caller can be surprised by an error it never planned for.

Choose by how often the caller should handle the failure. When it's routine and close to the caller, such as validating input, return a value. When it's unexpected, or many layers away from the code that can handle it, an exception fits better.

The classic mistake is mixing the two in one API, so some failures come back as values and others escape as exceptions. Callers then need both checks. Pick one style per layer, and document which failures a function can produce. For a typed version of the value style, see the [result type](/t/result-type).
