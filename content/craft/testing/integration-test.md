---
title: "Integration Test"
summary: "A test of several components working together."
levels: { backend: junior, frontend: junior }
aliases: ["integration testing", "integration tests"]
prereqs: ["unit-test"]
related: ["unit-test", "end-to-end-test", "test-database", "api-testing", "testcontainers", "testing-pyramid"]
core: [backend]
---

An integration test checks that **several pieces work together**: your code and the
database, two modules, or your service and a queue. A [unit test](/t/unit-test) checks one
piece in isolation; an integration test checks the connections between them.

Many bugs live in those connections: a wrong column name, a missing migration, a query that
works on paper but returns the wrong rows, a serialization mismatch.

```python
def test_repository_saves_and_loads_user(db_session):
    repo = UserRepository(db_session)          # real repository, real (test) database

    repo.save(User(email="ana@example.com"))
    loaded = repo.find_by_email("ana@example.com")

    assert loaded is not None
    assert loaded.email == "ana@example.com"
```

A unit test with a mocked database couldn't have caught a broken SQL query here. This one can.

## Practical points

- Use a real but disposable dependency: a [test database](/t/test-database), or a container
  started by [Testcontainers](/t/testcontainers).
- Keep tests **independent**: set up your own data, and clean up (or roll back a transaction)
  afterwards.
- They're slower than unit tests, so write fewer, aimed at boundaries: database access,
  external APIs, message handling. The [testing pyramid](/t/testing-pyramid) suggests many
  unit tests, fewer integration tests, and fewer still end-to-end ones.
- Don't mock the thing you're integrating with, or you're back to a unit test.

[API tests](/t/api-testing) are a common form: they cover routing, validation and the
database in one go.
