---
title: "Test Runner / Test Framework"
summary: "Tools like pytest, JUnit, Jest or Vitest that find, run and report tests."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["test framework", "testing framework", "pytest", "JUnit", "Jest", "Vitest"]
prereqs: ["unit-test"]
related: ["test-case-suite", "unit-test", "test-coverage", "test-fixture", "tdd"]
core: [backend, frontend, data-engineer]
---

A **test runner** (or test framework) is the tool that finds your tests, runs them, and
reports which passed or failed. Some test libraries bundle assertions, setup helpers and a
runner; others split them.

| Language | Common choices |
|---|---|
| Python | pytest, unittest |
| JavaScript / TypeScript | Jest, Vitest, Mocha, Node's built-in `node:test` |
| Java | JUnit, TestNG |
| Go | the built-in `go test` |
| Ruby | RSpec, Minitest |

```python
# test_cart.py: pytest finds files and functions named test_*
def test_empty_cart_total_is_zero():
    assert Cart().total() == 0
```

```sh
pytest                    # run everything
pytest tests/test_cart.py # one file
pytest -k "empty"         # tests whose name matches
pytest -x                 # stop at the first failure
```

## What a runner gives you

- **Discovery**: finds tests by naming convention, so you don't list them by hand.
- **Isolation**: a failing test doesn't stop the others.
- **Reporting**: which tests failed, with the assertion and a diff of expected vs actual.
- **Setup and teardown** helpers ([fixtures](/t/test-fixture)).
- **Extras**: running tests in parallel, watching files, coverage
  ([test coverage](/t/test-coverage)), filtering by name or tag.

## Tips

- Learn your runner's commands for running a single test and for stopping on the first failure.
  You'll use them constantly while debugging.
- Run the full suite before you push; CI will run it again.
- Pick the runner your project already uses. Consistency beats preference.
