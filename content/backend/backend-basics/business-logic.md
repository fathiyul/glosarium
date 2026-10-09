---
title: "Business Logic"
summary: "The rules that make your product what it is."
levels: { backend: junior, frontend: junior }
prereqs: ["backend"]
related: ["backend", "mvc", "request-handler", "request-lifecycle"]
---

Business logic is the set of rules that make your product work. A discount applies only to orders over a set amount. An account locks after too many failed logins. A refund can't be larger than the amount paid. The code that enforces these rules is the business logic.

```python
def apply_discount(order):
    # Business rule: orders of 100 or more get 10 off
    if order.total >= 100 and not order.has_discount:
        order.total -= 10
        order.has_discount = True
```

Keep these rules in one place, separate from the code that receives requests and draws screens. Then you can test a rule directly, without starting a web server or a browser. Name functions after the business concept (`apply_discount`), not after the screen they happen to be used on.

The frontend can show the rule to the user, such as "Add $20 more for free shipping", but the server has to enforce it. The classic mistake is writing the same rule twice, once in the UI and once in the API. The two copies drift apart, and users see one price on screen and get charged another. See [MVC](/t/mvc) for how the code is usually split.
