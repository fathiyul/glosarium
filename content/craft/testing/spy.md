---
title: "Spy"
summary: "A test double that records calls to a real or fake function."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["test spy", "spy object"]
prereqs: ["stub-double"]
related: ["stub-double", "mock", "test-double", "fake"]
---

A spy is a test double that records how it was called, and otherwise lets the call through or replies with a canned answer. You inspect the record after the code has run. A [stub](/t/stub-double) supplies values, and a spy additionally keeps a log of the calls, so you can check them.

```python
from unittest import mock

class Mailer:
    def send(self, to, body):
        raise RuntimeError("the real mailer must not run in tests")

def register_user(email, mailer):
    mailer.send(email, "Welcome!")

mailer = Mailer()
with mock.patch.object(mailer, "send") as spy:
    spy.side_effect = lambda to, body: None   # replace the real behaviour
    register_user("ana@example.com", mailer=mailer)

spy.assert_called_once_with("ana@example.com", "Welcome!")
```

The spy checks the call after the code has run, which keeps the setup separate from the assertion. That's the difference from a [mock](/t/mock), which is set up with expectations ahead of time and verifies them as part of the call.

The trade-off is that a spy couples the test to how the code calls its collaborator. Renaming a method or changing the argument order breaks the assertion, even when behaviour is unchanged. Use a spy when the call itself is the outcome you care about, such as "an email was sent once". When the result matters, check the result instead, as covered in the [test double](/t/test-double) guidelines.

The classic mistake is spying on everything to feel thorough. Each spy is an assertion on implementation detail, and a suite full of them breaks on every refactor. Spy at real boundaries, such as an external service, and check outcomes elsewhere. See [over-mocking](/t/over-mocking) for the pattern to avoid.
