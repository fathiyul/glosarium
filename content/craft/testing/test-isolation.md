---
title: "Test Isolation"
summary: "Tests that don't depend on each other or on shared state."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["isolated tests", "independent tests", "test independence"]
prereqs: ["unit-test"]
related: ["flaky-test", "test-fixture", "test-database", "deterministic-tests", "global-variable"]
---

Test isolation means each test runs on its own: it creates its own data, doesn't depend on other tests, and leaves no state behind. You should be able to run any test alone, in any order, or in parallel, and get the same result.

## What breaks it

- **Shared mutable state**: a global variable, a module-level cache, a singleton ([global variables](/t/global-variable)).
- **Shared database rows or files** left behind by an earlier test.
- **Order dependence**: test B passes only because test A ran first and created a user.
- **Real external systems**: a shared staging service, a real email account.
- **Time and randomness** that vary between runs ([deterministic tests](/t/deterministic-tests)).
- **Environment variables or config** changed by one test and not restored.

## How it shows up

- A test **passes alone and fails in the suite**, or the other way round.
- Failures that change when tests run in parallel or in a different order.
- "It only fails on CI" ([flaky tests](/t/flaky-test)).

## How to get it

- **Create what you need inside each test** (or a per-test [fixture](/t/test-fixture)), and clean it up.
- **Wrap each database test in a transaction** you roll back, or truncate tables afterwards ([test database](/t/test-database)).
- **Use unique names and IDs** (random suffixes) where tests share a resource.
- **Reset global state** in setup and teardown, and restore changed settings.
- **Replace external services with fakes** in unit tests ([test doubles](/t/test-double)).
- **Use temporary directories** and ports chosen by the OS.
- **Run tests in random order** now and then to expose hidden dependencies.

Isolated tests are easier to debug, can run in parallel (faster), and don't produce phantom failures. It's one of the biggest factors in trusting a test suite.
