---
title: "Eager vs Lazy Loading"
summary: "Loading related data upfront vs on first access."
levels: { backend: mid-level, data-engineer: mid-level }
aliases: ["eager vs lazy loading", "eager loading", "lazy loading"]
prereqs: ["orm-vs-raw-sql", "database"]
related: ["unbounded-result-sets", "orm", "connection-pooling"]
---

When you load an object with relationships — an order with its customer, a post with its comments — you choose *when* the related data is fetched. **Lazy loading** waits until you access the relationship; **eager loading** fetches it in the same query as the parent.

```text
lazy:  orders = get_orders(); order.customer   # a query per order
eager: get_orders().join(customer)             # one query with the join
```

Lazy is convenient (you only fetch what you touch) and keeps the initial query simple. Eager avoids extra round trips but fetches data you may not use. The right choice depends on access patterns.

The classic mistake is the **N+1 query problem**: you load 100 orders (1 query), then access each order's customer in a loop (100 more queries). 101 queries where 1 would do. It's the most common ORM performance trap, and it's often invisible until production volume.

```text
for o in orders: print(o.customer.name)   # N+1: one query per order
```

The classic mistakes:

- Lazy-loading inside a loop. The N+1. Fix it by eager-loading the relationship (`JOIN`/`include`/`select_related`) so it comes with the parent.
- Eager-loading everything. Fetching every relationship "just in case" makes queries huge and slow, especially when a relation has many rows (see [unbounded result sets](/t/unbounded-result-sets)). Load what you need.
- Lazy loading after the session closes. In many ORMs, a lazy load outside an open session/transaction throws or triggers a surprise query. Know the boundary.
- Not seeing the generated queries. Both modes are hidden behind method calls; enable query logging to see what's actually issued.
- Using lazy to avoid designing access patterns. If you can't predict which relationships a page needs, the model may be too fine-grained. Eager loading should be a deliberate choice per use case.

**How to choose:** lazy for rarely-touched relationships accessed ad hoc; eager for the relationships a specific endpoint always needs. Watch query counts (spot N+1) and keep an eye on total rows fetched. The goal is the fewest, smallest queries that satisfy the request — see [ORM vs raw SQL](/t/orm-vs-raw-sql).
