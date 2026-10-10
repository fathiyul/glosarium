---
title: "Transaction Script"
summary: "Organizing business logic as one procedure per request."
levels: { backend: mid-level }
aliases: ["transaction script pattern", "procedural business logic"]
prereqs: ["design-pattern"]
related: ["active-record-pattern", "repository-pattern", "domain-model-pattern", "business-logic"]
---

Transaction script is an approach to business logic where each request is handled by one procedure. The procedure does the whole job in a straight line: reads the input, checks the rules, updates the data, and returns the result. The logic lives in plain functions, and the data is kept in simple records.

```python
def place_order(db, customer_id, items):
    customer = db.find_customer(customer_id)
    if customer is None:
        raise ValueError("unknown customer")

    total = sum(item.price * item.qty for item in items)
    if customer.credit_limit < total:
        raise ValueError("over credit limit")

    order_id = db.insert_order(customer_id, total)
    db.insert_order_lines(order_id, items)
    db.decrease_stock(items)
    return order_id
```

Anyone can read the function from top to bottom and see exactly what happens when an order is placed.

The trade-off is that the logic for one kind of action is written once per action, and rules that apply to many actions tend to get copied into each one. As the rules grow, the procedures can drift apart. The pattern suits applications where most work is simple: forms, lookups and straightforward updates.

The classic mistake is copying a rule into several procedures and then changing only some of them. A rule such as the credit limit should live in one function, which each procedure calls. When the logic becomes intricate and shared, a [domain model](/t/domain-model-pattern) that holds the rules close to the data is usually the better structure.
