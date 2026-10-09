---
title: "Test Case and Test Suite"
summary: "A single scenario being checked, and a group of them run together."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["test case", "test suite", "test cases"]
prereqs: ["unit-test"]
related: ["test-runner", "test-fixture", "arrange-act-assert", "software-testing", "test-isolation"]
---

A test case is a single scenario being checked: one situation, one expected outcome. A test suite is a group of test cases run together.

```python
# test_cart.py: a suite of related cases
def test_empty_cart_total_is_zero():            # test case
    assert Cart().total() == 0

def test_adding_an_item_increases_total():      # test case
    cart = Cart()
    cart.add(Item(price=10))
    assert cart.total() == 10

def test_negative_quantity_is_rejected():       # test case
    with pytest.raises(ValueError):
        Cart().add(Item(price=10), qty=-1)
```

Each case has a clear name that states the situation and the expectation, and a pass or fail result.

## How suites are organized

Suites usually mirror the code: a file or class per module, folders per area, plus separate groups by kind (unit, integration, end-to-end) or speed (a fast "smoke" suite and a slower "full" one) ([smoke tests](/t/smoke-test)).

```sh
pytest                          # run everything
pytest tests/test_cart.py       # one file
pytest -k "negative"            # cases whose name matches
```

([test runners](/t/test-runner))

## Writing good cases

- **One scenario per case**, so a failure points to one problem.
- **A descriptive name**: `test_expired_coupon_is_rejected` tells you what broke without reading the code.
- **Independent**: no case relies on another having run first ([test isolation](/t/test-isolation)).
- **Cover edges**: empty, one, many, invalid, boundary.
- **Share setup** with fixtures, not copy-paste ([test fixtures](/t/test-fixture)).

## Keeping a suite healthy

- Run it often, in CI, and keep it fast.
- Fix or remove flaky cases.
- Delete obsolete ones.
- Treat test code like production code: readable and maintained.
