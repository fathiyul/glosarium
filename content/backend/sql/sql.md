---
title: "SQL"
summary: "The language for querying relational databases."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-analyst: junior , data-scientist: mid-level }
aliases: ["Structured Query Language", "SQL language", "SQL queries", "sequel"]
prereqs: ["relational-database"]
related: ["select-query", "sql-sublanguages", "common-databases", "crud", "relational-model", "database"]
core: [backend, data-engineer, data-scientist]
---

**SQL** (Structured Query Language) is the standard language for working with relational databases. You use it to read
data, change it, and define the tables themselves. It has been around for decades, and it's one of the most useful
skills for anyone who works with data.

```sql
SELECT name, COUNT(*) AS orders
FROM customers c
JOIN orders o ON o.customer_id = c.id
WHERE o.status = 'paid'
GROUP BY name
ORDER BY orders DESC
LIMIT 10;
```

SQL is **declarative**: you describe *what* result you want, not *how* to compute it. The database's query planner
decides how, such as which indexes to use and in what order to join ([query plan](/t/query-plan)).

## The families of statements

| Group | Does | Examples |
|---|---|---|
| **DQL** (queries) | Read | `SELECT` |
| **DML** (manipulation) | Change rows | `INSERT`, `UPDATE`, `DELETE` |
| **DDL** (definition) | Change structure | `CREATE TABLE`, `ALTER TABLE`, `DROP` |
| **DCL / TCL** | Permissions and transactions | `GRANT`, `COMMIT`, `ROLLBACK` |

(See [SQL sub-languages](/t/sql-sublanguages).)

## One standard, many dialects

SQL is standardized, but each database (PostgreSQL, MySQL, SQL Server, Oracle, SQLite, BigQuery, Snowflake...) adds its
own functions, syntax and quirks: `LIMIT` vs `TOP`, date functions, string concatenation, `UPSERT` syntax. The core
(`SELECT`, `JOIN`, `GROUP BY`, `WHERE`) carries across. Look up the specifics for yours ([common databases](/t/common-databases)).

## Why it matters

- It's how most applications persist their data, so **backend developers** use it daily, often through an
  [ORM](/t/orm) that writes it for them. Knowing it makes the ORM easier to reason about.
- **Data engineers and analysts** use it as their main tool.
- Frontend developers benefit when they understand what the API's data model is.

## Where to start

Learn in this order: [SELECT / WHERE / ORDER BY](/t/select-query), [JOIN](/t/join),
[GROUP BY](/t/group-by), [NULL behavior](/t/null-in-sql), [subqueries](/t/subquery) and [CTEs](/t/cte), then
[window functions](/t/window-function) and indexes. Practice on a real database, since reading about queries only goes so far.
