---
title: "Given / When / Then"
summary: "Describing tests as context, action and expected outcome."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["GWT", "arrange act assert"]
prereqs: ["unit-test"]
related: ["bdd", "acceptance-test", "red-green-refactor", "deterministic-tests"]
---

Given / When / Then is a way to structure a test in three parts: the starting context, the action, and the expected outcome. It's the same idea as the Arrange, Act, Assert pattern used in many unit tests, and it's the vocabulary used in [behavior-driven development](/t/bdd) scenarios.

```python
def test_discount_applies_over_threshold():
    # Given a cart above the threshold
    cart = Cart(items=[Item(price=120)])

    # When the discount is applied
    total = apply_discount(cart, threshold=100, percent=10)

    # Then the total is reduced
    assert total == 108
```

Each section has one job. The "given" part sets up only what the test needs, the "when" part does one thing, and the "then" part checks the result. A reader can see at a glance what's being claimed, without tracing through setup code.

The trade-off is structure against verbosity. Comments or blank lines separating the three parts help readers, but in a very small test they add noise. The pattern also tempts people to put several actions in the "when" section, which makes a failure hard to diagnose.

The classic mistake is a test with several "when" steps, or one whose "then" checks many unrelated things. When it fails, you don't know which behaviour broke. Keep one action per test, and split the rest into separate tests with their own setup. Set up only what the test needs, using a [test data builder](/t/test-data-builder) where objects are complicated, and avoid anything that changes between runs, as covered in [deterministic tests](/t/deterministic-tests).
