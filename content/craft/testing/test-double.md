---
title: "Test Double"
summary: "Any stand-in for a real dependency in tests."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level }
aliases: ["test doubles", "mocks stubs fakes", "stub vs mock", "dummy stub spy mock fake"]
prereqs: ["unit-test", "mock"]
related: ["mock", "stub-double", "fake", "spy", "over-mocking", "dependency-injection"]
core: [backend]
---

A **test double** is any stand-in for a real dependency used during testing, like a stunt double in a film. It lets you test a piece of code without the slow, unpredictable or
side-effect-prone real thing (a payment API, a clock, a database, an email service). The term covers several kinds, often loosely called "mocks":

| Kind | What it does | Example |
|---|---|---|
| **Dummy** | Fills a parameter and is never actually used | `None` passed where an argument is required |
| **[Stub](/t/stub-double)** | Returns **canned answers** | A payment gateway that always returns "approved" |
| **[Spy](/t/spy)** | A stub that also **records how it was called** | Counts calls to `send_email` |
| **[Mock](/t/mock)** | Pre-programmed with **expectations** that it verifies | "Expect `charge(500)` to be called once" |
| **[Fake](/t/fake)** | A **working simplified implementation** | An in-memory repository instead of a database |

```python
class StubGateway:                       # stub: fixed response
    def charge(self, amount): return {"status": "approved"}

class FakeUserRepo:                      # fake: real behavior, simple storage
    def __init__(self): self.users = {}
    def save(self, u): self.users[u.id] = u
    def find(self, uid): return self.users.get(uid)

def test_checkout_approves_order():
    service = Checkout(gateway=StubGateway(), users=FakeUserRepo())
    assert service.pay(order).status == "paid"
```

## Choosing

- Use a **stub** when you only need a controlled input ("what if the API fails?").
- Use a **fake** when behavior matters and the real thing is heavy.
- Use a **mock or spy** when the *interaction* is the behavior you're verifying (an email was sent).

## Guidelines

- To use doubles, code needs seams where dependencies can be swapped. That's a reason to pass dependencies in ([dependency injection](/t/dependency-injection)).
- **Double the boundaries** (network, time, randomness, third parties), not your own internal logic.
- **Overuse makes tests brittle and meaningless**: tests that mirror the implementation break on every refactor, and can pass while production fails
  ([over-mocking](/t/over-mocking)).
- Keep some tests that use the real dependency ([integration tests](/t/integration-test)).
- A double can drift from the real thing's behavior. Check them against each other (for example with contract tests).
