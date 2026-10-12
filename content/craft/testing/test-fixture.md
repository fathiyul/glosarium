---
title: "Test Fixture"
summary: "Setup data or state that tests rely on."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["fixture", "test fixtures", "pytest fixture", "setUp"]
prereqs: ["unit-test", "arrange-act-assert"]
related: ["test-case-suite", "test-isolation", "test-database", "test-data-builder", "arrange-act-assert"]
---

A test fixture is the setup that a test needs before it can run: data, objects, a database, a temporary file, a fake service. It also covers the cleanup afterwards. Fixtures keep the "arrange" part of tests out of every test body.

```python
import pytest

@pytest.fixture
def cart():
    c = Cart()
    c.add(Item("kettle", 30))
    return c                          # the test receives it by name

def test_total(cart):
    assert cart.total() == 30

@pytest.fixture
def db():
    conn = create_test_database()
    yield conn                        # the test runs here
    conn.close()                      # cleanup after the test
```

```js
let cart;
beforeEach(() => { cart = new Cart(); });     // runs before each test
afterEach(() => { cleanup(); });
```

## Why use them

- **No repeated setup** copy-pasted across tests.
- **Cleanup is guaranteed**, even when a test fails.
- **Clear scope**: per test, per file, or once per run.

## Scope matters

- **Per-test fixtures** are fresh every time, so tests can't affect each other. This is the safe default ([test isolation](/t/test-isolation)).
- **Shared (per-module or per-session) fixtures** are faster for expensive setups like a database container, but need care so tests don't leave dirty state, for example by rolling back a transaction after each test.

## Cautions

- **Hidden dependencies.** A fixture with a lot of data makes a test hard to understand. Keep what the test depends on visible, and create only what's needed.
- **Over-sharing.** A giant shared fixture that everything uses becomes fragile.
- **Order dependence**: a test shouldn't rely on data a previous test created.
- **Realistic but minimal**: use builders or factories for objects with many fields ([test data builders](/t/test-data-builder)).
- **Test databases** need resetting between tests ([test database](/t/test-database)).
