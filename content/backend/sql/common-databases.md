---
title: "PostgreSQL, MySQL and SQLite"
summary: "The common relational databases and where each one fits."
levels: { backend: junior, frontend: junior, data-engineer: junior }
aliases: ["Postgres", "MySQL", "SQLite"]
prereqs: ["relational-database"]
related: ["relational-database", "database", "database-client", "schema"]
---

PostgreSQL, MySQL and SQLite are three widely used relational databases. They all use SQL and tables, but they run differently:

- **PostgreSQL** is a full database server with a large feature set. It's a common default for web applications and data work.
- **MySQL** is another full database server, widely used in web applications, and available in several distributions.
- **SQLite** is an embedded database. The whole database lives in a single file that a program opens directly, with no separate server. It's convenient for local apps, prototypes and tests.

SQLite is not designed for many separate machines writing to one shared file over a network. If several servers need to write at the same time, use a database server.

The classic mistake is choosing a database by popularity alone, or moving a small local app to a server database before it needs one. Pick based on what the application needs: how many people write at once, where it runs, and which features it relies on. Keep your SQL to standard forms where you can, so a later move is less painful. A [database client](/t/database-client) lets you connect to any of them to explore tables and run queries.
