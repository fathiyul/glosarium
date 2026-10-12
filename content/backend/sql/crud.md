---
title: "CRUD"
summary: "Create, Read, Update, Delete: the four basic data operations."
levels: { backend: junior, frontend: junior, data-engineer: junior , data-scientist: junior }
aliases: ["create read update delete"]
prereqs: ["relational-database"]
related: ["sql-sublanguages", "http-methods", "transaction", "relational-database"]
---

CRUD stands for Create, Read, Update and Delete. These four operations cover most of what an application does with stored data. In SQL, they map to `INSERT`, `SELECT`, `UPDATE` and `DELETE`:

```sql
INSERT INTO books (title) VALUES ('Dune');             -- Create
SELECT id, title FROM books WHERE id = 1;              -- Read
UPDATE books SET title = 'Dune Messiah' WHERE id = 1;  -- Update
DELETE FROM books WHERE id = 1;                        -- Delete
```

Web APIs often map the same operations onto [HTTP methods](/t/http-methods), typically `POST` for create, `GET` for read, `PUT` or `PATCH` for update, and `DELETE` for delete.

The classic mistake is an `UPDATE` or `DELETE` without a `WHERE` clause. It applies to every row in the table, not just the one you meant. Before running one by hand, write the `WHERE` first and run a `SELECT` with the same condition to check which rows it matches. When several changes must succeed together, wrap them in a [transaction](/t/transaction) so you can roll back if one fails.
