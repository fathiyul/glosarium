---
title: "Test-Driven Development"
summary: "Writing a failing test first, then the code to pass it, then refactoring."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["test-driven development", "test first", "red green refactor", "TDD"]
prereqs: ["unit-test", "refactoring"]
related: ["red-green-refactor", "unit-test", "arrange-act-assert", "bdd", "refactoring", "test-double"]
core: [backend]
---

**Test-driven development** (TDD) is a way of working: **write a failing test first, then write just enough code to make it pass, then clean up**, in tiny repeated cycles.

The cycle ([red-green-refactor](/t/red-green-refactor)):

1. **Red**: write a small test for behavior that doesn't exist yet. Run it and watch it **fail** (that proves it can detect the absence).
2. **Green**: write the simplest code that makes it pass.
3. **Refactor**: improve the structure while keeping all tests green.

```python
# 1. Red
def test_apply_percentage_discount():
    assert apply_discount(price=200, percent=25) == 150      # NameError: no such function

# 2. Green
def apply_discount(price, percent):
    return price - price * percent / 100

# 3. Refactor: rename, simplify, then write the next test:
def test_discount_cannot_exceed_100_percent():
    with pytest.raises(ValueError):
        apply_discount(price=200, percent=120)
```

## What people like about it

- **Design pressure**: writing the test first makes you think about how code will be *used*, which tends to produce simpler, more testable interfaces.
- **A safety net** that grows with the code, giving confidence to refactor.
- **Focus**: one small behavior at a time.
- **Fewer untested code paths**: every behavior began with a test.

## Honest limits

- It takes practice, and can feel slow at first.
- It fits best where behavior is clear: logic, algorithms, APIs. It's awkward for exploratory work, UI layout and unclear requirements, where you don't yet know what to assert.
- **Tests can lock in a bad design** if you write them against internals. Test behavior, not implementation.
- It doesn't replace higher-level tests ([testing pyramid](/t/testing-pyramid)).
- It's a tool, not a requirement for being a good engineer. Many good teams write tests right after the code, as long as tests do get written.

## Mistakes

- Writing many tests before any code.
- Never seeing the test fail, so it may not test anything.
- Skipping the refactor step.
- Over-mocking ([test doubles](/t/test-double)).

Even if you don't do TDD all the time, it's very useful when fixing bugs: write the failing test that reproduces it first ([regression tests](/t/regression-test)).
