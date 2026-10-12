---
title: "Test Data Builder / Factory"
summary: "Helpers that create valid test objects with sensible defaults."
levels: { backend: mid-level, frontend: mid-level, data-engineer: mid-level , data-scientist: mid-level }
aliases: ["test factory", "object mother", "builder pattern for tests"]
prereqs: ["given-when-then"]
related: ["given-when-then", "fake", "test-database", "deterministic-tests"]
---

A test data builder is a helper that creates valid objects for tests, with sensible defaults. A test states only the fields it cares about, and the builder fills in the rest with values that make the object valid. The same idea is called a factory in some libraries.

```python
from dataclasses import dataclass, replace

@dataclass(frozen=True)
class Order:
    total: int = 50
    express: bool = False
    zone: str = "local"

def make_order(**overrides):
    return replace(Order(), **overrides)

def test_express_orders_cost_more():
    order = make_order(express=True, total=120)
    assert order.express and order.total == 120
```

The test reads as "an express order worth 120", with no noise about other fields. When the object gains a required field, you update the builder in one place rather than every test.

The trade-off is hidden defaults. A reader has to look at the builder to know what a test is really using, and a default that makes the object quietly valid may hide a case the test should cover. Builders also add code to maintain.

The classic mistake is letting defaults carry meaning. If a test depends on the default zone being `local`, set it explicitly, so a change to the default doesn't break an unrelated test in a confusing way. Keep defaults neutral and valid, and state anything the test depends on. For tests that need real persisted data, see [test databases](/t/test-database).
