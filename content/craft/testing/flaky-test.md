---
title: "Flaky Test"
summary: "A test that passes and fails without any code change."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["flaky tests", "flakiness", "intermittent test failure", "non-deterministic test"]
prereqs: ["unit-test", "continuous-integration"]
related: ["deterministic-tests", "test-isolation", "end-to-end-test", "race-condition", "continuous-integration"]
---

A flaky test is a test that sometimes passes and sometimes fails with no change to the code. They erode trust: people rerun the build, ignore red results, and real failures get lost among the false ones.

## Usual causes

| Cause | Example |
|---|---|
| **Timing and async** | a fixed `sleep(1)` that's sometimes too short, or a race between the test and the code |
| **Shared state** | tests that depend on each other's data or run order ([test isolation](/t/test-isolation)) |
| **Time and randomness** | tests using the real clock, "today", or random values |
| **External services** | real network calls, third-party APIs, slow databases |
| **Environment differences** | works on a laptop, fails on a slower CI machine, different time zone |
| **Concurrency** | parallel tests fighting over a port, a file or a database row |
| **Test data** | order of results from a query without `ORDER BY` |
| **UI tests** | elements not ready, animations, async loading |

## Fixing them

- **Wait for conditions, not for time**: poll for the element or event instead of sleeping.
- **Control the clock and randomness**: inject a fake time and a fixed seed ([deterministic tests](/t/deterministic-tests)).
- **Isolate**: each test creates and cleans its own data, and doesn't rely on order.
- **Replace flaky dependencies** with fakes in unit tests, and keep a few real ones in integration tests ([test doubles](/t/test-double)).
- **Make results ordered** where order matters.
- **Reproduce it**: rerun the test in a loop, or in parallel, to make it fail on demand.

## Handling them in the meantime

- **Don't just retry until green.** It hides the problem.
- **Track and quarantine**: tag known flaky tests, fix or delete them soon, and measure how many exist.
- **Treat a flaky test as a bug**, either in the test or in the code. Sometimes it has found a real race condition.

A test you can't trust is worse than no test. See [end-to-end tests](/t/end-to-end-test), which are especially prone.
