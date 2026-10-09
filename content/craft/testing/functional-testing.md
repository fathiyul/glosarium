---
title: "Functional Testing"
summary: "Testing that features do what the requirements say, from the outside."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["functional tests", "black-box testing", "requirements testing"]
prereqs: ["software-testing"]
related: ["acceptance-test", "end-to-end-test", "integration-test", "unit-test", "api-testing"]
---

Functional testing checks that the software does what the requirements say, by looking at it from the outside: give it input through its interface, and check the output or behavior. It asks "does this feature work?", not "how is it written?".

```python
def test_applying_a_valid_coupon_reduces_the_total(client):
    cart = client.post("/cart", json={"items": [{"sku": "A1", "qty": 2}]})
    res = client.post("/cart/coupon", json={"code": "SAVE10"})
    assert res.status_code == 200
    assert res.json()["total"] == 90        # the behavior the requirement describes
```

It's often called black-box testing, because the test treats the system as a box: it knows the inputs and expected outputs, not the internal code.

## Where it sits

| Kind | Looks at |
|---|---|
| [Unit tests](/t/unit-test) | one small piece of code, inside |
| [Integration tests](/t/integration-test) | several parts working together |
| **Functional tests** | a feature or user-visible behavior, against requirements |
| [End-to-end tests](/t/end-to-end-test) | whole flows through the real interface |

The labels overlap. An [API test](/t/api-testing) that checks a requirement is a functional test, and so is a browser test of a signup flow. Functional tests differ from non-functional ones (performance, security, usability), which test how well it works.

## Writing good ones

- **Derive them from requirements** or acceptance criteria ([acceptance tests](/t/acceptance-test)). Each criterion becomes a test.
- **Cover the happy path and the failures**: invalid input, missing permissions, empty states.
- **Test behavior, not implementation**, so they survive refactoring.
- **Keep them independent and repeatable**, each setting up its own data ([test isolation](/t/test-isolation)).
- **Mind the cost.** They're slower than unit tests, so put detail in unit tests and use functional tests for the important behaviors ([testing pyramid](/t/testing-pyramid)).
