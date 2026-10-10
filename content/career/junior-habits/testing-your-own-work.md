---
title: "Testing Your Own Work"
summary: "Checking that your change works before calling it done."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-analyst: junior }
aliases: ["self-testing", "test your own changes", "verifying your change", "manual testing before review", "checking your work"]
prereqs: ["unit-test", "self-review"]
related: ["self-review", "unit-test", "manual-testing", "reproduce-bug", "definition-of-done", "code-review"]
core: [backend, frontend, data-engineer]
---

Before you say "done" or request review, **check that your change actually works**. It sounds obvious, and a surprising number of broken pull requests fail on
the first thing a reviewer tries.

## A simple routine

1. **Run it for real.** Start the app and use the feature as a user would, not just the happy path.
2. **Try the unhappy paths**: empty input, wrong input, very large input, double clicks ([double submission](/t/double-submit)), no network, a user without permission.
3. **Check the edges**: first and last items, zero, one, many, special characters, long text, other time zones, mobile.
4. **Reproduce the original bug, then confirm it's gone** ([reproducing a bug](/t/reproduce-bug)). If you can't see it fail first, you can't know you fixed it.
5. **Run the automated tests**, all of them, not just yours, and add new tests for what you changed ([unit tests](/t/unit-test), [regression tests](/t/regression-test)).
6. **Check what you might have broken** nearby: other pages, callers of the function, the same code in another place.
7. **Read your diff** ([self-review](/t/self-review)).
8. **Test in an environment close to production** if you can ([environments](/t/environments)), since "works on my machine" isn't the bar.

```
Checklist before opening the PR
[ ] Happy path works in the browser
[ ] Error states shown correctly
[ ] Tests added/updated; full suite passes
[ ] Bug reproduced before, gone after
[ ] No leftover debug code
```

## Habits

- **Don't assume.** "It should work" isn't the same as "I saw it work."
- **Write down what you tested** in the PR description, so the reviewer knows what's covered, and what you didn't test.
- **Don't treat reviewers or QA as your test suite.** They catch what you missed, and they shouldn't be the first to run it.
- **Test the thing, not a mock of it**, at least once. Passing unit tests with mocks can hide a broken integration
  ([integration tests](/t/integration-test)).
- **Automate what you do twice.** A manual check you repeat should become a test.

It's part of being done ([definition of done](/t/definition-of-done)). Learning to test your own work well is one of the fastest ways to earn trust as a junior.
