---
title: "Over-Mocking"
summary: "Mocking so much that tests check implementation instead of behavior."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["mock overuse", "over-stubbing"]
prereqs: ["mock"]
related: ["mock", "stub-double", "fake", "integration-test", "test-double"]
---

Over-mocking is replacing so many collaborators with [test doubles](/t/test-double) that the test ends up describing the code's internal wiring rather than its behaviour. The test passes when the code calls the right methods in the right order, not when it produces the right result.

```python
def test_checkout_calls_services():
    repo = Mock()
    gateway = Mock()
    mailer = Mock()
    checkout(order, repo, gateway, mailer)

    repo.find.assert_called_once()
    gateway.charge.assert_called_once()
    mailer.send.assert_called_once()
```

If someone refactors `checkout` to batch the lookups, this test fails, even though the customer is charged correctly. Meanwhile, a bug that charges the wrong amount still passes, because the mocks don't check the amount.

The trade-off is isolation against meaning. Doubles make a unit test fast and independent of other code, which is valuable. But each double also encodes an assumption about how the collaborator behaves, and the more of them there are, the more the test proves only that those assumptions are consistent with the code.

The classic mistake is mocking your own internal classes just because they're easy to replace. Double the real boundaries, such as the network, the clock and third-party services, and let your own logic run for real. Where a test checks outcomes, a [fake](/t/fake) often reads better than a row of mocks. Keep [integration tests](/t/integration-test) that use the real collaborators, so the wiring is tested too.
