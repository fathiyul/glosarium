---
title: "Relational Database"
summary: "Data stored in tables with rows, columns and relationships."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["RDBMS", "SQL database"]
prereqs: ["database"]
related: ["database", "schema", "relationship-types", "constraint", "transaction"]
---

A relational database stores data in tables. Each table has columns that describe what it holds, and each row is one record. Tables are linked by keys, so a row in `orders` can point at a row in `customers`. You query the data with SQL.

```
customers                    orders
+----+---------+             +----+-------------+
| id | name    |             | id | customer_id |
+----+---------+             +----+-------------+
| 1  | Ada     | <---------- | 10 | 1           |
+----+---------+             +----+-------------+
```

Relational databases also provide [constraints](/t/constraint) to enforce rules on the data, and [transactions](/t/transaction) so a group of changes either all happens or none of it does. Those two features are a large part of why relational databases are the usual default for applications that store important records.

The classic mistake is designing tables the way you'd lay out a spreadsheet, with repeated columns such as `item1`, `item2` and `item3`, or with no keys at all. The database can't help you with that data. Model each kind of thing as its own table, link them with keys, and let the database enforce the rules. The [schema](/t/schema) is where that design lives.
