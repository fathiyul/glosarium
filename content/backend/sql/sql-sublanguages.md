---
title: "DDL, DML, DCL and DQL"
summary: "SQL's categories: defining structure, changing data, granting access, querying."
levels: { backend: junior, data-engineer: junior , data-analyst: junior }
aliases: ["DDL", "DML", "DCL", "DQL"]
prereqs: ["sql"]
related: ["crud", "schema", "database-client", "transaction"]
---

SQL statements are often grouped into four categories, each for a different job:

- **DDL (Data Definition Language):** changes structure. `CREATE TABLE`, `ALTER TABLE`, `DROP TABLE`.
- **DML (Data Manipulation Language):** changes data. `INSERT`, `UPDATE`, `DELETE`.
- **DCL (Data Control Language):** controls access. `GRANT` and `REVOKE`.
- **DQL (Data Query Language):** reads data. `SELECT`.

```sql
CREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT NOT NULL);   -- DDL
INSERT INTO books (id, title) VALUES (1, 'Dune');                   -- DML
GRANT SELECT ON books TO reporting_user;                            -- DCL
SELECT title FROM books;                                            -- DQL
```

Some sources group `SELECT` under DML, so don't be surprised by either grouping. The categories are a way to talk about what a statement does.

The classic mistake is running a DDL statement casually. Changing a table's structure can affect every query and application that uses it. Whether a DDL statement can be rolled back depends on the database, so check before running one, and prefer a [migration](/t/schema-migration) you can review and reproduce. The [CRUD](/t/crud) operations are the everyday part of this work.
