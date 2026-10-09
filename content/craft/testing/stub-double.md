---
title: "Stub"
summary: "A test double that returns canned answers."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["stub", "test stub", "stubbing"]
prereqs: ["test-double", "unit-test"]
related: ["test-double", "mock", "fake", "spy", "dependency-injection"]
---

A stub is a test double that returns canned answers. It stands in for a dependency so your test can control what the code under test receives, without calling the real thing.

```python
class StubExchangeRates:
    def rate(self, currency):
        return 1.5                      # always the same answer

def test_price_in_euro():
    service = PriceService(rates=StubExchangeRates())
    assert service.price_in("EUR", 100) == 150
```

```python
from unittest.mock import Mock
rates = Mock()
rates.rate.return_value = 1.5          # a stub made with a mocking library
```

## What it's for

- **Fixed inputs**: a time, an exchange rate, a feature flag.
- **Forcing situations that are hard to create**: a payment gateway that returns "declined", a network that times out.

```python
class DecliningGateway:
    def charge(self, amount):
        raise CardDeclined()
```

- **Speed and isolation**: no network, no database.

## Stub vs mock

A stub only **supplies** values. A [mock](/t/mock) also **checks how it was called** ("send_email was called once with these arguments"). If you only need the code to receive some data, use a stub, and assert on the result. See [test doubles](/t/test-double) for the whole family.

## Tips

- **Keep stubs dumb.** If a stub needs logic, you're approaching a [fake](/t/fake).
- **Stub at boundaries** (clocks, network, services), not your own internal code.
- **The code has to allow it**: pass dependencies in ([dependency injection](/t/dependency-injection)).
- **Don't over-stub.** If everything is stubbed, the test only proves the stubs work ([over-mocking](/t/over-mocking)).
- A stub can drift from the real behavior, so keep some integration tests against the real thing.
