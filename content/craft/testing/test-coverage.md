---
title: "Test Coverage"
summary: "The share of code executed by tests, and why 100% isn't the goal."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["code coverage", "coverage", "line coverage", "branch coverage"]
prereqs: ["unit-test", "test-runner"]
related: ["mutation-testing", "unit-test", "regression-test", "over-mocking"]
core: [backend, data-engineer]
---

**Test coverage** is the percentage of your code that runs while your tests run. A coverage
tool marks which lines (or branches) were executed and which never were.

```sh
pytest --cov=myapp --cov-report=term-missing
# myapp/orders.py   85%   missing: 42-47, 61
```

The report is useful in one direction: **uncovered code is definitely untested.** Lines 42-47
above are never run by any test, so a bug there would go unnoticed.

## Why 100% isn't the goal

The reverse isn't true: *covered code isn't necessarily well tested.* A test can run a line
without checking anything about its result:

```python
def test_total():
    calculate_total(order)      # runs the code, asserts nothing: still counts as covered
```

Chasing a number leads to useless tests written just to light up lines, and it distracts from
tests that matter. When a measure becomes a target, people optimize the measure.

## Line vs branch coverage

- **Line coverage**: was this line executed?
- **Branch coverage**: was each side of every `if` taken? It catches the case where only the
  "true" path is ever tested.

## Using it well

- Look at **what's uncovered**, especially important logic like payments or permissions.
- Use it to find gaps, not as proof of quality. A low number (say, under 50%) is a signal;
  a high one is not a guarantee.
- A common team practice is "don't let coverage drop on a PR", not "must hit 100%".
- To check that your tests would actually catch bugs, see
  [mutation testing](/t/mutation-testing).
