---
title: "Software Testing"
summary: "Checking code behaves as intended, automatically and repeatably."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["testing", "automated testing", "QA", "test automation"]
prereqs: ["function"]
related: ["unit-test", "integration-test", "end-to-end-test", "regression-test", "tdd", "testing-pyramid"]
---

Software testing means checking that code behaves as intended, and tests are programs that do the checking automatically and repeatably. Instead of trying the app by hand each time, you write checks once, and run them whenever the code changes.

```python
def test_total_includes_tax():
    assert total(price=100, tax=0.2) == 120
```

Run the suite, and it tells you which behaviors still work and which broke.

## Why test

- **Catch bugs early**, before users do.
- **Change code with confidence.** If the tests pass after a refactor, you probably didn't break anything.
- **Document behavior**: tests show how code is supposed to be used.
- **Prevent regressions**: a bug fixed once stays fixed ([regression tests](/t/regression-test)).
- **Speed**: a suite runs in seconds, while manual checks take hours.

## Kinds of tests

| Level | Checks |
|---|---|
| [Unit](/t/unit-test) | one small piece in isolation |
| [Integration](/t/integration-test) | pieces working together (code and database) |
| [End-to-end](/t/end-to-end-test) | a whole user flow through the real interface |
| Non-functional | performance, security, accessibility |

A healthy suite has many fast unit tests and fewer, slower high-level ones ([testing pyramid](/t/testing-pyramid)).

## What makes tests good

- **Fast and reliable.** Slow or flaky tests get skipped ([flaky tests](/t/flaky-test)).
- **Independent**, run in any order.
- **Clear about what they test**, with names that describe the behavior.
- **Focused on behavior**, so refactoring doesn't break them.
- **Run automatically** on every change in CI ([continuous integration](/t/continuous-integration)).

## Things to remember

- **Tests can only show bugs, never prove their absence.**
- **Coverage isn't quality** ([test coverage](/t/test-coverage)).
- **Test the risky and important parts first**: money, permissions, data loss.
- **Testing isn't a separate phase.** Write tests as you build ([TDD](/t/tdd)).
