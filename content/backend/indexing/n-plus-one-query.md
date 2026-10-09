---
title: "N+1 Query Problem"
summary: "One query for a list, then one more query for every item in it."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["N+1", "N+1 problem", "N+1 queries", "n plus one"]
prereqs: ["orm", "join"]
related: ["orm", "eager-vs-lazy-loading", "graphql-n-plus-one", "db-index", "slow-query-log"]
core: [backend]
also: [backend-basics, performance]
---

The **N+1 query problem** is when code runs **one query to fetch a list**, then **one more query for each item** in it, so
`N + 1` queries where one or two would do.

```python
orders = Order.objects.all()            # 1 query: 100 orders
for order in orders:
    print(order.customer.name)          # +1 query per order: 100 more
# 101 queries in total
```

Each query is fast, but the round trips add up: 100 orders at 2 ms each is 200 ms, and 10,000 orders is 20 seconds. It
often goes unnoticed in development with ten rows, and then hits production with real data. ORMs make it easy to cause,
because accessing `order.customer` looks like a harmless attribute read but triggers a query
([lazy loading](/t/eager-vs-lazy-loading)).

## Fixes

Fetch what you need up front, in a constant number of queries:

```python
# Django: join in one query
Order.objects.select_related("customer")

# Django: second query with IN (...), for many-to-many or reverse relations
Order.objects.prefetch_related("items")
```

(SQLAlchemy has `joinedload` / `selectinload`; other ORMs have similar options such as `include` or `eager`.)

By hand, it's a [join](/t/join), or two queries:

```sql
SELECT * FROM orders;
SELECT * FROM customers WHERE id IN (3, 7, 9, ...);    -- one batched query, then match up in code
```

## Finding it

- **Count the queries** a request makes: turn on query logging or use your framework's debug tools, and check
  whether the count grows with the number of rows.
- A [slow query log](/t/slow-query-log) full of near-identical queries is the signature.
- Many frameworks have plugins that warn about N+1 patterns in tests.

The same pattern appears outside ORMs: a loop that calls an API or a cache once per item, or in GraphQL resolvers
([GraphQL N+1](/t/graphql-n-plus-one)).

Don't over-correct by loading everything eagerly everywhere. Fetch what the code path actually needs.
