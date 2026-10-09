---
title: "Testing Pyramid"
summary: "Many unit tests, fewer integration tests, few end-to-end tests."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["test pyramid", "testing triangle", "test automation pyramid", "ice cream cone anti-pattern"]
prereqs: ["unit-test", "integration-test", "end-to-end-test"]
related: ["testing-trophy", "unit-test", "integration-test", "end-to-end-test", "flaky-test", "test-in-production"]
core: [backend, frontend]
---

The **testing pyramid** is a guideline for how many tests of each kind to have: **many fast unit tests at the base, fewer integration tests in the middle, and a few
slow end-to-end tests at the top.**

```
        ▲  few
       /E2E\        slow, expensive, realistic
      /─────\
     / integ \      moderate
    /─────────\
   /   unit    \    fast, cheap, precise
  /─────────────\  many
```

| Layer | Speed | Cost to maintain | Tells you |
|---|---|---|---|
| **[Unit](/t/unit-test)** | Milliseconds | Low | Exactly which function is broken |
| **[Integration](/t/integration-test)** | Seconds | Medium | The parts work together (database, APIs) |
| **[End-to-end](/t/end-to-end-test)** | Many seconds to minutes | High, and flaky | The real user flows work |

## Why the shape

Tests higher up are **slower, more fragile and harder to diagnose**, while ones lower down are quick and precise. A suite that is mostly E2E takes an hour to run, fails randomly and
makes it hard to find the cause of a failure. So **push each check as low as it can go** while still testing what you care about: logic in unit tests, connections in integration tests,
only the critical journeys end to end.

## The anti-pattern: the ice cream cone

The inverted shape: lots of manual and E2E tests, few unit tests. It's slow, flaky and expensive. Teams often end up there when code is hard to unit test (tightly coupled, no
seams).

## It's a heuristic, not a law

- Some teams prefer a **trophy** shape with more integration tests, because they give better confidence per test, especially in frontend and service-heavy code
  ([testing trophy](/t/testing-trophy)).
- What matters is the principle: **fast and reliable feedback, with confidence where it counts.** Use the mix that gives you that.
- The right proportions depend on the system. A data transformation pipeline, a UI and a library differ.

## Practical advice

- When you add a test, ask: *what's the lowest level that could catch this bug?*
- A bug found at a high level should usually get a regression test at a lower level ([regression tests](/t/regression-test)).
- Watch the suite's speed and flakiness, and treat them as quality metrics ([flaky tests](/t/flaky-test)).
- Tests aren't the only safety net: monitoring and gradual rollouts catch what tests can't ([testing in production](/t/test-in-production)).
