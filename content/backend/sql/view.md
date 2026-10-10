---
title: "View"
summary: "A saved query that acts like a table."
levels: { backend: mid-level, data-engineer: junior , data-analyst: junior }
aliases: ["SQL view", "database view"]
prereqs: ["crud"]
related: ["table-row-column", "schema", "sql-sublanguages", "self-join"]
---

A view is a saved query with a name. You query it as if it were a table, and the database runs the underlying query each time you do.

```sql
CREATE VIEW active_customers AS
SELECT id, name, email
FROM customers
WHERE last_login_at >= '2026-01-01';

SELECT name FROM active_customers WHERE email LIKE '%@example.com';
```

Views help when the same complicated join or filter is needed in many places. They also give you one place to change the logic, and they can hide columns that some users shouldn't see. A view doesn't store data of its own. It shows whatever the underlying tables contain right now.

Whether you can write through a view, with `INSERT` or `UPDATE`, depends on the database and on how complicated the view is. Don't assume it.

The classic mistake is treating a view as free. Each query against it runs the full underlying query again, and views built on other views can become slow to understand and to run. Some databases, such as PostgreSQL, also offer materialized views, which store the results and need refreshing. Those are a different tool, with their own trade-offs. For the basic structure a view sits on top of, see [table, row, column](/t/table-row-column).
