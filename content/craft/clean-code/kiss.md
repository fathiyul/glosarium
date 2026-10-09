---
title: "KISS (Keep It Simple)"
summary: "Prefer the simplest solution that works."
levels: { backend: junior, frontend: junior }
aliases: ["Keep It Simple", "Keep It Simple Stupid", "keep it simple"]
prereqs: ["clean-code"]
related: ["yagni", "premature-abstraction", "dry", "readability", "principle-of-least-astonishment"]
core: [backend, frontend]
---

**KISS** ("Keep It Simple, Stupid") means: of the solutions that work, pick the simplest one.
Simple code has fewer places for bugs to hide, is quicker to understand and is cheaper to change.

```python
# Clever
def is_even(n):
    return not (n & 1) if isinstance(n, int) else (_ for _ in ()).throw(TypeError)

# Simple
def is_even(n):
    return n % 2 == 0
```

## What simple means

Simple is **not the same as easy** or short. A one-line regex that nobody can read is easy to
write but not simple. A clear ten-line loop may be simpler than a dense chain of tricks.

Simple means:

- few moving parts and little hidden behavior,
- one obvious way to follow what happens,
- no machinery you don't need.

## How it shows up

- Use a plain function before inventing a class hierarchy.
- Use the language's standard features before adding a library, and a library before
  building your own.
- Don't add configuration, plugin systems or layers "in case". See [YAGNI](/t/yagni).
- Pick boring, proven technology unless there's a real reason not to.
- Prefer a small copy-paste now over a premature abstraction (see
  [premature abstraction](/t/premature-abstraction)).

## Watch out

Simplicity is a trade-off, not an absolute rule. Some problems really are complex, such as
money, time zones or permissions, and a too-simple solution that mishandles them isn't KISS,
it's wrong. The aim is no *unnecessary* complexity.

Test: can a teammate who has never seen this code explain what it does after reading it once?
If not, simplify. See [readability](/t/readability).
