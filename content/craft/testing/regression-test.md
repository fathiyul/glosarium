---
title: "Regression Test"
summary: "A test ensuring a fixed bug doesn't come back."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["regression testing", "regression tests"]
prereqs: ["unit-test", "debugging"]
related: ["reproduce-bug", "unit-test", "test-coverage", "flaky-test"]
core: [backend, data-engineer]
---

A **regression** is something that used to work and now doesn't. A regression test is a test
that guards against that: when you fix a bug, you add a test that fails with the bug and
passes after the fix, so it can't quietly return.

## The workflow

1. Get the bug [reproducible](/t/reproduce-bug).
2. **Write a test that fails** because of the bug.
3. Fix the code until it passes.
4. Keep the test forever.

```python
# Bug #318: discount of 100% made the order total negative
def test_full_discount_gives_zero_total():
    order = Order(items=[Item(price=1000)], discount_percent=100)
    assert order.total() == 0
```

Seeing the test **fail first** matters. It proves the test actually detects the bug. A test
that never failed might not be testing anything.

## Why it's worth it

Fixed bugs tend to come back: someone refactors, merges an old branch, or touches the same
area. The test turns "we fixed that once" into "that can't happen again without us noticing".
It also documents the edge case that surprised you.

## Related meaning

"Regression testing" can also mean re-running the **whole test suite** after any change to
make sure nothing else broke. That's what your CI does on every push. So the tests you add
for each bug become part of that safety net.

Name the test after the behavior, and mention the ticket number in a comment for context.
A good regression test is small and specific, not a copy of the full scenario that revealed it.
