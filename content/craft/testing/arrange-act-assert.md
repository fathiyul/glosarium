---
title: "Arrange, Act, Assert"
summary: "The standard three-part structure of a test."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["AAA", "AAA pattern", "given when then"]
prereqs: ["unit-test"]
related: ["unit-test", "given-when-then", "test-fixture", "test-double", "bdd"]
---

Arrange, Act, Assert is the standard three-part structure for a test. Keeping to it makes tests easy to read.

1. **Arrange**: set up what the test needs (objects, data, fakes).
2. **Act**: do the one thing you're testing.
3. **Assert**: check the result.

```python
def test_discount_applies_to_orders_over_100():
    # Arrange
    order = Order(items=[Item(price=120)])
    coupon = Coupon(percent=10)

    # Act
    total = order.apply(coupon).total()

    # Assert
    assert total == 108
```

Blank lines between the sections (or comments, if the team likes them) make the structure obvious.

## Why it helps

- **Readable**: anyone can see what's being set up, what's tested and what's expected.
- **Focused**: one Act per test, so a failure points at one behavior.
- **Easy to spot smells**: a huge Arrange suggests the code has too many dependencies. Several Acts mean the test is doing too much.

## Habits

- **One behavior per test**, with a name that says it: `test_expired_coupon_is_rejected`.
- **Put only relevant details in Arrange.** Use helpers or builders for the rest ([test fixtures](/t/test-fixture)).
- **Don't put logic in tests** (loops, conditionals). If a test needs an `if`, it's hard to trust.
- **Assert on results**, not on how the code got there.
- **Keep Act simple**, usually one call.

`Given / When / Then` is the same shape in behavior-driven style ([given-when-then](/t/given-when-then), [BDD](/t/bdd)).
