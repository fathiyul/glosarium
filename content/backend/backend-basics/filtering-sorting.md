---
title: "Filtering and Sorting"
summary: "Letting clients narrow down and order results."
levels: { backend: junior, frontend: junior }
prereqs: ["http-request"]
related: ["api-design", "url-as-state", "pagination", "query-string"]
also: [api-design]
---

Filtering narrows results ("only shoes under $50"), and sorting orders them ("newest first"). Clients usually ask for these through [query parameters](/t/query-string), and the server applies them before it sends anything back:

```
GET /products?category=shoes&max_price=50&sort=-price&page=2
```

A leading minus for descending order is a common convention in APIs, not a universal rule, so check what your API documents.

The backend has to be strict here. Only allow the fields you have chosen to expose for sorting and filtering, and reject anything else. You can't use placeholders for column names, so the usual approach is a fixed list:

```python
ALLOWED_SORT = {"price": "price", "name": "name", "created": "created_at"}

column = ALLOWED_SORT.get(sort_key)
if column is None:
    raise ValueError("unsupported sort field")

# Column name comes from the fixed list above; the value is a placeholder
cursor.execute(
    "SELECT * FROM products WHERE category = %s ORDER BY " + column,
    (category,),
)
```

On the frontend, keep the filters in the URL so a shared link or a page reload keeps the same results (see [URL as state](/t/url-as-state)).

The classic mistake is building the query by joining raw user input into the SQL string. That opens the door to [SQL injection](/t/sql-injection). Pair filtering with [pagination](/t/pagination) too, so a broad filter can't return the whole table at once.
