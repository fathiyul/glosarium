---
title: "Test Databases"
summary: "Using a real, isolated database in tests and resetting it between runs."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["test DB", "test database"]
prereqs: ["fake"]
related: ["fake", "testcontainers", "integration-test", "deterministic-tests"]
---

A test database is a real database used only by tests, kept separate from development and production data. Tests write rows and query them, so they exercise the same SQL and constraints the application will use in production.

A common pattern gives each test a clean slate, either by wrapping it in a transaction that is rolled back at the end, or by truncating the tables between tests:

```python
import sqlite3

def test_saves_and_loads_user():
    conn = sqlite3.connect(":memory:")       # a fresh database for this test
    conn.execute("CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT NOT NULL)")
    conn.execute("INSERT INTO users (id, name) VALUES (1, 'Ada')")
    row = conn.execute("SELECT name FROM users WHERE id = 1").fetchone()
    assert row == ("Ada",)
```

The trade-off is realism against speed and setup. An in-memory SQLite database is fast and simple, but it's not the same engine as the production database, so SQL that works there can fail on the real one. A shared test database is closer to production, but tests can interfere with each other if they don't reset it, and running it needs infrastructure. [Testcontainers](/t/testcontainers) gives a real engine that starts per test run.

The classic mistake is sharing one database across tests without resetting it, so results depend on which test ran first. That's a source of flaky failures. Isolate each test's data, and keep the reset step reliable. Test the parts of the schema that matter, such as [constraints](/t/constraint), against the real engine rather than a stand-in.
