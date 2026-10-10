---
title: "Table, Row, Column"
summary: "The basic structure of relational data."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["table", "row", "column"]
prereqs: ["relational-database"]
related: ["relational-database", "schema", "sql-data-types", "junction-table"]
---

A relational database organizes data into three basic parts:

- A **table** holds one kind of thing, such as employees or orders.
- A **column** is one attribute of that thing, with a [data type](/t/sql-data-types). In an `employees` table, `name` and `hired_on` are columns.
- A **row** is one record: one employee, one order.

```
employees
+----+-----------+------------+
| id | name      | hired_on   |   <- columns
+----+-----------+------------+
| 1  | Ada       | 2024-03-01 |   <- a row
| 2  | Grace     | 2023-11-15 |
+----+-----------+------------+
```

The value where a row and column meet is a single cell. Each cell should hold one value. Keeping that rule means you can filter, sort and join on any column.

The classic mistake is putting several values in one cell, such as `skills = 'sql,python,go'`, or mixing different kinds of thing in one table, such as customers and their invoices together. The first makes it hard to search for one skill. The second repeats customer details on every invoice. Put each kind of thing in its own table, and connect them with keys. The [schema](/t/schema) describes how the tables fit together.
