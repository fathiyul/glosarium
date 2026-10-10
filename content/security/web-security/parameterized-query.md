---
title: "Parameterized Query"
summary: "Passing values separately from SQL so they can't change its meaning."
levels: { backend: junior , data-analyst: mid-level }
aliases: ["prepared statement", "bind variables", "query parameters", "parametrized query"]
prereqs: ["sql-injection"]
related: ["sql-injection", "prepared-statement", "orm", "orm-vs-raw-sql", "input-sanitization"]
---

A parameterized query sends the SQL text and the values separately. The database parses the SQL first, then plugs the values in as pure data, so a value can never change the meaning of the query. It is the main defence against [SQL injection](/t/sql-injection).

```python
name = request.args["name"]   # attacker sends:  x' OR '1'='1

# Wrong: the input becomes part of the SQL
cur.execute(f"SELECT * FROM users WHERE name = '{name}'")

# Right: the value is passed separately
cur.execute("SELECT * FROM users WHERE name = %s", (name,))
```

In the wrong version, the attacker's text turns the condition into one that matches every row. In the right version, the database looks for a user whose name is literally `x' OR '1'='1`, and finds none.

The placeholder syntax depends on the driver: `%s`, `?`, `:name` or `$1` are all common. Check your library's docs. Closely related is the [prepared statement](/t/prepared-statement), where the database also caches the parsed query.

## Limits worth knowing

- **Only values can be parameters.** Table names, column names and `ORDER BY` directions can't. If those come from users, map them through a fixed allow-list in your code.
- **Placeholders are not string formatting.** If you find yourself building the SQL with f-strings and then passing parameters, the first step is still unsafe.
- **ORMs** use parameters for normal queries, but raw SQL escape hatches are as dangerous as before. See [ORM vs raw SQL](/t/orm-vs-raw-sql).

Trying to clean the input instead ([sanitization](/t/input-sanitization)) is fragile. Parameters remove the problem rather than filtering it.
