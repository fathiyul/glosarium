---
title: "Mock"
summary: "A test double that verifies how it was called."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["mock object", "mocking", "mocks", "test mock"]
prereqs: ["unit-test"]
related: ["test-double", "stub-double", "fake", "spy", "over-mocking"]
core: [backend, frontend, data-engineer]
---

A **mock** is a fake stand-in for a real dependency (an email sender, a payment client)
that also **records how it was used**, so the test can verify it. It's one kind of
[test double](/t/test-double). People often say "mock" for any fake, but the precise
meaning is about checking *calls*.

```python
from unittest.mock import Mock

def test_sends_welcome_email():
    mailer = Mock()
    register_user("ana@example.com", mailer=mailer)

    mailer.send.assert_called_once_with("ana@example.com", "Welcome!")
```

The test didn't send a real email. It checked that the code *would have* sent exactly one,
with the right arguments.

## Why use them

- The real thing is **slow, costly or has side effects**: email, payments, network.
- You want to **force a situation**, such as the payment provider returning an error.
- You want to check an interaction that has no visible result.

## The trade-off

Mocks tie your test to *how* the code works, not just *what* it does. Too many make tests
brittle: refactor the internals and tests fail, even though nothing is broken (see
[over-mocking](/t/over-mocking)). They can also drift from the real thing, so a test passes
against a mock while production fails.

## Guidelines

- Mock at **boundaries** (external services), not your own internal classes.
- Prefer checking **results** (return values, stored data) over checking calls when you can.
- Use a [stub](/t/stub-double) when you only need canned answers, and a [fake](/t/fake)
  (like an in-memory repository) when behavior matters.
- Always have *some* tests against the real dependency
  ([integration tests](/t/integration-test)).
