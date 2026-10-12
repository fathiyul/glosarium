---
title: "Database Client / GUI"
summary: "Tools like psql, DBeaver or TablePlus for exploring databases."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-analyst: junior , data-scientist: mid-level }
aliases: ["SQL client", "database GUI"]
prereqs: ["database"]
related: ["database", "sql-sublanguages", "schema", "crud"]
---

A database client is a tool you use to connect to a database, look at its tables, and run queries. Some are command-line programs, such as `psql` for PostgreSQL. Others are graphical applications, such as DBeaver or TablePlus, that show tables and results in a visual interface.

Whatever tool you pick, the workflow is the same:

1. Connect with the host, database name, user and password (or a connection string).
2. Browse the [schema](/t/schema) to see tables, columns and constraints.
3. Run queries, and check the results before changing anything.

```sql
-- Look before you change anything
SELECT COUNT(*) FROM orders WHERE status = 'cancelled';
```

The classic mistake is running write queries against a production database from a client you set up for exploring. Some clients commit each statement automatically, so a mistaken `DELETE` is applied immediately. Use a read-only account for browsing, use a separate development database for experiments, and wrap risky changes in a transaction where your client supports it. Keep the connection details out of shared files and screenshots.
